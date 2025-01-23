import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

def train_model():
    df = pd.read_csv('food_safety_training_data.csv')
    
    feature_columns = ['cooking_method', 'container_type', 'ingredients', 
                      'cooking_temperature', 'cooking_duration', 
                      'storage_temperature', 'humidity']
    
    # Properly create DataFrame copy
    X = df[feature_columns].reset_index(drop=True)
    y = df['safe_hours'].reset_index(drop=True)
    
    encoders = {}
    for col in ['cooking_method', 'container_type', 'ingredients']:
        encoders[col] = LabelEncoder()
        unique_values = np.append(X[col].unique(), ['unknown'])
        encoders[col].fit(unique_values)
        X.loc[:, col] = encoders[col].transform(X[col].values)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    model = GradientBoostingRegressor(
        n_estimators=200,
        learning_rate=0.05,
        max_depth=3,
        min_samples_split=5,
        random_state=42
    )
    
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    metrics = {
        'R2 Score': r2_score(y_test, y_pred),
        'MAE': mean_absolute_error(y_test, y_pred),
        'RMSE': np.sqrt(mean_squared_error(y_test, y_pred)),
        'Cross Val Score': np.mean(cross_val_score(model, X_train_scaled, y_train, cv=5))
    }
    
    importance = pd.DataFrame({
        'feature': feature_columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nModel Metrics:")
    for metric, value in metrics.items():
        print(f"{metric}: {value:.3f}")
        
    print("\nFeature Importance:")
    print(importance)
    
    joblib.dump({
        'model': model,
        'scaler': scaler,
        'encoders': encoders,
        'feature_columns': feature_columns,
        'known_ingredients': list(encoders['ingredients'].classes_),
        'known_cooking_methods': list(encoders['cooking_method'].classes_),
        'known_container_types': list(encoders['container_type'].classes_)
    }, 'food_safety_model.joblib')
    
    return model, scaler, encoders

if __name__ == "__main__":
    model, scaler, encoders = train_model()