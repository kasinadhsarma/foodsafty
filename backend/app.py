from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from datetime import datetime
import os
import psycopg2
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://foodsafty.vercel.app", "http://localhost:3000"]}})

# Database connection
def get_db_connection():
    db_url = os.getenv('DB_URL')
    db_password = os.getenv('DB_PASSWORD')
    try:
        conn = psycopg2.connect(
            dbname='verceldb',
            user='default',
            password=db_password,
            host='ep-quiet-wind-a1sw4akl.us-east-1.postgres.vercel-storage.com',
            port='5432',
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Load model artifacts using absolute path
import os
model_path = os.path.join(os.path.dirname(__file__), 'food_safety_model.joblib')
model_artifacts = joblib.load(model_path)
model = model_artifacts['model']
scaler = model_artifacts['scaler']
encoders = model_artifacts['encoders']
feature_columns = model_artifacts['feature_columns']

def handle_unknown_value(value, category, encoder):
    try:
        return encoder.transform([value])[0]
    except:
        return encoder.transform(['unknown'])[0]

def preprocess_input(data):
    features_dict = {}
    for col in feature_columns:
        if col in ['cooking_method', 'container_type', 'ingredients']:
            features_dict[col] = handle_unknown_value(data[col], col, encoders[col])
        else:
            features_dict[col] = float(data[col])
    # Create a DataFrame with named features
    features_df = pd.DataFrame([features_dict])
    return features_df[feature_columns]  # Ensure columns are in the correct order

def save_prediction(prediction_data, input_data):
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO predictions (
                ingredients, cooking_method, cooking_temperature, cooking_duration,
                storage_temperature, humidity, container_type, safe_hours, risk_level
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            input_data['ingredients'],
            input_data['cooking_method'],
            input_data['cooking_temperature'],
            input_data['cooking_duration'],
            input_data['storage_temperature'],
            input_data['humidity'],
            input_data['container_type'],
            prediction_data['safeHours'],
            prediction_data['riskLevel']
        ))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error saving prediction: {e}")
        return False
    finally:
        cur.close()
        conn.close()

def verify_token():
    auth_token = os.getenv('AUTH_TOKEN')
    if not auth_token:
        return False
    
    token = request.headers.get('Authorization')
    if not token:
        return False
    
    return token == f"Bearer {auth_token}"

@app.route('/predict', methods=['POST'])
def predict():
    if not verify_token():
        return jsonify({'error': 'Unauthorized'}), 401
    try:
        data = request.json
        
        # Map and validate input
        input_data = {
            'cooking_method': data['cookingMethod'].lower(),
            'container_type': data['containerType'].lower(),
            'ingredients': data['ingredients'].lower(),
            'cooking_temperature': float(data['cookingTemperature']),
            'cooking_duration': float(data['cookingDuration']),
            'storage_temperature': float(data['storageTemperature']),
            'humidity': float(data['humidity'])
        }
        
        # Validate numerical ranges
        validations = {
            'cooking_temperature': (0, 300),
            'storage_temperature': (-20, 40),
            'humidity': (0, 100),
            'cooking_duration': (0, 480)
        }
        
        for field, (min_val, max_val) in validations.items():
            value = input_data[field]
            if not (min_val <= value <= max_val):
                return jsonify({
                    'error': f'{field.replace("_", " ").title()} must be between {min_val} and {max_val}'
                }), 400
        
        features = preprocess_input(input_data)
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        safe_hours = round(prediction, 1)
        
        response = {
            'safeHours': safe_hours,
            'riskLevel': 'high' if safe_hours < 48 else 'medium' if safe_hours < 72 else 'low',
            'storageTips': get_storage_tips(input_data),
            'timestamp': datetime.now().isoformat(),
            'storageTemp': input_data['storage_temperature'],
            'humidity': input_data['humidity'],
            'containerType': input_data['container_type']
        }
        
        # Save prediction to database
        save_prediction(response, input_data)
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_storage_tips(data):
    tips = []
    if data['storage_temperature'] > 5:
        tips.append("Lower storage temperature to 5°C or below")
    if data['humidity'] > 60:
        tips.append("Reduce humidity to 60% or below")
    if data['container_type'] == 'plastic':
        tips.append("Consider using an airtight container")
    return tips or ["Maintain current storage conditions"]

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_version': '1.0',
        'supported_methods': list(model_artifacts['known_cooking_methods']),
        'supported_containers': list(model_artifacts['known_container_types'])
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
