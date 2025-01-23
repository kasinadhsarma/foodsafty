import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class FoodSafetyDataGenerator:
    def __init__(self):
        self.cooking_methods = ['fried', 'boiled', 'baked', 'grilled', 'steamed', 'roasted', 'stir_fried']
        self.container_types = ['plastic', 'glass', 'metal', 'ceramic', 'vacuum_sealed']
        self.ingredients_base = {
            'proteins': ['chicken', 'beef', 'pork', 'fish', 'tofu', 'eggs', 'lamb'],
            'carbs': ['rice', 'potatoes', 'pasta', 'noodles', 'bread', 'quinoa'],
            'vegetables': ['broccoli', 'carrots', 'spinach', 'peppers', 'mushrooms', 'onions']
        }
        
    def generate_ingredient_combinations(self, n_samples):
        combinations = []
        for _ in range(n_samples):
            protein = np.random.choice(self.ingredients_base['proteins'])
            carb = np.random.choice(self.ingredients_base['carbs'])
            veg = np.random.choice(self.ingredients_base['vegetables'])
            combo = f"{protein},{carb},{veg}"
            combinations.append(combo)
        return combinations

    def calculate_base_safety_hours(self, row):
        base_hours = 72  # Default base hours
        
        # Temperature impact
        temp_factor = 1.0
        if row['storage_temperature'] <= 4:
            temp_factor = 1.2
        elif row['storage_temperature'] > 7:
            temp_factor = 0.7
        
        # Humidity impact
        humidity_factor = 1.0
        if row['humidity'] < 40:
            humidity_factor = 1.1
        elif row['humidity'] > 60:
            humidity_factor = 0.8
        
        # Container type impact
        container_factors = {
            'plastic': 0.9,
            'glass': 1.0,
            'metal': 0.95,
            'ceramic': 0.85,
            'vacuum_sealed': 1.2
        }
        
        # Cooking method impact
        cooking_method_factors = {
            'fried': 0.9,
            'boiled': 1.0,
            'baked': 0.95,
            'grilled': 0.85,
            'steamed': 1.1,
            'roasted': 0.9,
            'stir_fried': 0.85
        }
        
        # Calculate final hours
        hours = (base_hours 
                * temp_factor 
                * humidity_factor 
                * container_factors[row['container_type']]
                * cooking_method_factors[row['cooking_method']])
        
        # Add some random variation (±10%)
        variation = np.random.uniform(0.9, 1.1)
        return round(hours * variation, 1)

    def generate_extended_dataset(self, n_samples=1000):
        data = {
            'ingredients': self.generate_ingredient_combinations(n_samples),
            'cooking_method': np.random.choice(self.cooking_methods, n_samples),
            'cooking_temperature': np.random.uniform(60, 250, n_samples),
            'cooking_duration': np.random.uniform(10, 180, n_samples),
            'storage_temperature': np.random.uniform(2, 10, n_samples),
            'humidity': np.random.uniform(30, 80, n_samples),
            'container_type': np.random.choice(self.container_types, n_samples),
            'preparation_date': [
                (datetime.now() - timedelta(days=np.random.randint(0, 30))).strftime('%Y-%m-%d')
                for _ in range(n_samples)
            ]
        }
        
        df = pd.DataFrame(data)
        
        # Calculate safe hours
        df['safe_hours'] = df.apply(self.calculate_base_safety_hours, axis=1)
        
        # Add derived features
        df['risk_level'] = df['safe_hours'].apply(
            lambda x: 'high' if x < 48 else 'medium' if x < 72 else 'low'
        )
        
        df['recommended_max_temp'] = df.apply(
            lambda row: min(row['storage_temperature'] + 2, 8), axis=1
        )
        
        df['storage_tips'] = df.apply(
            lambda row: self.generate_storage_tips(row), axis=1
        )
        
        return df
    
    def generate_storage_tips(self, row):
        tips = []
        if row['storage_temperature'] > 5:
            tips.append("Reduce storage temperature")
        if row['humidity'] > 60:
            tips.append("Control humidity")
        if row['container_type'] == 'plastic':
            tips.append("Consider airtight container")
        return "; ".join(tips) if tips else "Standard storage adequate"

    def save_datasets(self, n_samples=1000):
        # Generate main dataset
        df = self.generate_extended_dataset(n_samples)
        
        # Save main training data
        df.to_csv('food_safety_training_data.csv', index=False)
        
        # Create and save additional specialized datasets
        self.save_supplementary_datasets(df)
        
        return df
    
    def save_supplementary_datasets(self, df):
        # Prediction results
        results = df[['safe_hours', 'risk_level', 'storage_tips']]
        results.to_csv('prediction_results.csv', index=False)
        
        # Storage conditions analysis
        storage_analysis = df.groupby('container_type').agg({
            'safe_hours': ['mean', 'std'],
            'storage_temperature': 'mean',
            'humidity': 'mean'
        }).round(2)
        storage_analysis.to_csv('storage_analysis.csv')
        
        # Risk distribution
        risk_dist = df.groupby(['risk_level', 'container_type']).size().unstack()
        risk_dist.to_csv('risk_distribution.csv')

if __name__ == "__main__":
    generator = FoodSafetyDataGenerator()
    df = generator.save_datasets(2000)
    print("Generated datasets with shape:", df.shape)
    print("\nSample of training data:")
    print(df.head())