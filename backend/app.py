from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from datetime import datetime

import os
from os.path import join, dirname

app = Flask(__name__)
CORS(app)

# Add API prefix handling
app.config['APPLICATION_ROOT'] = '/api'
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
    features = []
    for col in feature_columns:
        if col in ['cooking_method', 'container_type', 'ingredients']:
            val = handle_unknown_value(data[col], col, encoders[col])
            features.append(val)
        else:
            features.append(float(data[col]))
    return np.array(features).reshape(1, -1)

@app.route('/api/predict', methods=['POST'])
def predict():
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

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_version': '1.0',
        'supported_methods': list(model_artifacts['known_cooking_methods']),
        'supported_containers': list(model_artifacts['known_container_types'])
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
