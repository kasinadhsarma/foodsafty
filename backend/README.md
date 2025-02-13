# Food Safety API Architecture

## Service Split

Due to Vercel's serverless function size limitations (250MB), the application has been split into two parts:

1. **API Service (Vercel)** - `/backend/api`
   - Lightweight Flask application
   - Handles basic health checks and service information
   - Deployed on Vercel
   - Endpoints:
     - `/api/health` - Service health status
     - `/api/info` - Service information and ML endpoint details

2. **ML Service (Original)** - `/backend`
   - Contains the ML model and prediction functionality
   - Should be deployed on a platform that supports larger applications (e.g., Render, DigitalOcean, Heroku)
   - Original endpoints:
     - `/predict` - Food safety predictions
     - `/health` - ML service health check

## Deployment Instructions

### API Service (Vercel)
- The lightweight API service is automatically deployed through Vercel
- Uses Python 3.12 runtime
- Minimal dependencies for fast cold starts

### ML Service
Deploy the original Flask application (`backend/app.py`) to a platform that supports larger applications:

1. Create an account on your chosen platform (Render recommended)
2. Create a new Web Service
3. Point to the backend directory
4. Use the following build command:
   ```bash
   pip install -r requirements.txt
   ```
5. Start command:
   ```bash
   gunicorn app:app
   ```

## Environment Variables

After deploying the ML service, update the ML endpoint URLs in `backend/api/index.py` to point to your deployed ML service.

## Frontend Integration

Update the frontend API calls to use:
- Vercel endpoint for service information
- ML service endpoint for predictions

This split architecture ensures optimal performance while maintaining full functionality.
