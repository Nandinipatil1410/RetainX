import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://retainx-f90n.onrender.com"}})


# Load the trained model
model = joblib.load('churn_model.pkl')

# Load encoders or column order if needed
categorical_columns = [
    'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService',
    'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup',
    'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
    'Contract', 'PaperlessBilling', 'PaymentMethod'
]

# Define full expected feature list in the trained model (order matters)
expected_features = [
    'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure',
    'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity',
    'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV',
    'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod',
    'MonthlyCharges', 'TotalCharges'
]

# You can load any LabelEncoders or preprocessors here if you used them
encoder = joblib.load("encoders.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        data = request.get_json()
        print("🔵 Received data:", data)

        if not data:
            print("🔴 No data received or not JSON")
            return jsonify({'error': 'No data received'}), 400

        df = pd.DataFrame([data])

        # Convert numeric columns explicitly
        numeric_cols = ['MonthlyCharges', 'TotalCharges', 'SeniorCitizen', 'tenure']
        for col in numeric_cols:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        # Drop missing values
        df = df.dropna()

        # Encode categorical variables
        df_encoded = pd.get_dummies(df)

        # Align with model columns
        model_columns = joblib.load('model_columns.pkl')
        df_encoded = df_encoded.reindex(columns=model_columns, fill_value=0)

        prediction = model.predict(df_encoded)
        prediction_proba = model.predict_proba(df_encoded)

        return jsonify({
            'prediction': prediction.tolist()[0],
            'probability': prediction_proba.tolist()[0]
        })

    except Exception as e:
        print("Error in /predict:", e)  # Print error for debugging
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("🚀 Starting Flask app...")
    app.run(debug=True)
