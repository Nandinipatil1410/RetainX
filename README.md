# RetainX - Customer Churn Prediction Web Application

**RetainX** is a full-stack web application designed to predict customer churn using a trained machine learning model. The application allows users to input customer information through a frontend form and returns a prediction on whether the customer is likely to churn, along with a probability score.

## Overview

* **Frontend**: Built with React.js to create a user-friendly interface.
* **Backend**: Developed using Flask to handle requests and serve model predictions.
* **Machine Learning**: Model trained in Google Colab using Random Forest Classifier, with SMOTE applied to address class imbalance.
* **Prediction Output**: Binary classification (Churn / No Churn) and the associated probability.

## Machine Learning Pipeline

The ML model was developed using the Kaggale Telco Customer Churn dataset, and the workflow included:

* Data cleaning and preprocessing

  * Removal of customer ID column
  * Handling missing values in `TotalCharges`
  * Label encoding of categorical features
* Handling class imbalance using SMOTE
* Model training with multiple algorithms:

  * Decision Tree
  * Random Forest
  * XGBoost
* Random Forest was selected based on cross-validation accuracy (\~84%)
* Final model performance on test data:

  * Accuracy: \~78%
  * F1-score for churn class: \~0.58

Artifacts saved:

* `customer_churn_model.pkl`: Trained model
* `encoders.pkl`: Label encoders used during training for categorical feature consistency

## Technology Stack

* Frontend: React.js
* Backend: Flask (Python)
* Model Training: scikit-learn, XGBoost

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/RetainX.git
cd RetainX
```

### 2. Backend Setup (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

The React application will run at `http://localhost:3000` and Flask API at `http://localhost:5000`.

---

## API Usage

### Sample Input (JSON)

```json
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 1,
  "PhoneService": "No",
  "MultipleLines": "No phone service",
  "InternetService": "DSL",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "No",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 29.85,
  "TotalCharges": 29.85
}
```

### Sample Output

```json
{
  "prediction": "Churn",
  "probability": 0.73
}
```

## Future Enhancements

* Hyperparameter tuning for improved performance
* Model interpretability using SHAP or LIME
* Better UI/UX enhancements in the frontend
* Docker support for containerization
* Integration with cloud-based deployment (AWS or Heroku)
* User authentication and dashboard features

## Acknowledgements

* [Telco Customer Churn Dataset - Kaggle](https://www.kaggle.com/blastchar/telco-customer-churn)
* Python ecosystem libraries: scikit-learn, XGBoost, pandas, Flask, React

