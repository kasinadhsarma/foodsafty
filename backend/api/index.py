from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'ML API is hosted separately. Please use the ML endpoint for predictions.',
        'ml_endpoint': 'https://foodsafety-ml.onrender.com'  # You'll need to update this with your actual ML API endpoint
    })

@app.route('/api/info', methods=['GET'])
def info():
    return jsonify({
        'service': 'Food Safety API',
        'version': '1.0',
        'ml_status': 'Service split due to serverless constraints',
        'ml_endpoint': 'https://foodsafety-ml.onrender.com/predict'  # You'll need to update this with your actual ML API endpoint
    })

if __name__ == '__main__':
    app.run()
