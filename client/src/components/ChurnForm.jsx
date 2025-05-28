import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChurnForm.css";

function ChurnForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    gender: "Male",
    SeniorCitizen: 0,
    Partner: "Yes",
    Dependents: "No",
    tenure: 5,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "DSL",
    OnlineSecurity: "No",
    OnlineBackup: "Yes",
    DeviceProtection: "Yes",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Bank transfer (automatic)",
    MonthlyCharges: 56.95,
    TotalCharges: 188.95,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Options
  const genderOptions = ["Male", "Female"];
  const yesNoOptions = ["Yes", "No"];
  const seniorCitizenOptions = [0, 1];
  const multipleLinesOptions = ["No phone service", "No", "Yes"];
  const internetServiceOptions = ["DSL", "Fiber optic", "No"];
  const contractOptions = ["Month-to-month", "One year", "Two year"];
  const paymentOptions = [
    "Bank transfer (automatic)",
    "Credit card (automatic)",
    "Electronic check",
    "Mailed check",
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === "number") val = Number(value);
    if (name === "SeniorCitizen") val = Number(val);
    setFormData({ ...formData, [name]: val });
  };

  const validateForm = () => {
    if (formData.tenure < 0) {
      setError("Tenure cannot be negative.");
      return false;
    }
    if (formData.MonthlyCharges < 0) {
      setError("Monthly Charges cannot be negative.");
      return false;
    }
    if (formData.TotalCharges < 0) {
      setError("Total Charges cannot be negative.");
      return false;
    }
    setError(null);
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  console.log("Form submitted", formData);

  try {
    const response = await axios.post(
      "https://your-backend-url.onrender.com/predict",  // ✅ Use correct deployed URL
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("API response:", response.data);
    setResult(response.data);
  } catch (err) {
    console.error("Error calling API:", err);
    setError("Prediction failed. Please try again.");
  }
};


  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const resultRef = useRef(null);

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  // Calculate progress width
  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="form-container">
      <h2>Fill in customer details to see who’s likely to stay or go.</h2>

      <div className="progress-bar">
        <div className="progress-bar__progress" style={{ width: `${progressWidth}%` }}></div>
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`progress-step ${i + 1 <= step ? "active" : ""}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step fade-in">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              {genderOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <label>Senior Citizen:</label>
            <select
              name="SeniorCitizen"
              value={formData.SeniorCitizen}
              onChange={handleChange}
            >
              {seniorCitizenOptions.map((opt) => (
                <option key={opt} value={opt}>{opt === 1 ? "Yes" : "No"}</option>
              ))}
            </select>

            <label>Partner:</label>
            <select name="Partner" value={formData.Partner} onChange={handleChange}>
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Dependents:</label>
            <select
              name="Dependents"
              value={formData.Dependents}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="form-step fade-in">
            <label>Tenure (months):</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              min="0"
            />

            <label>Phone Service:</label>
            <select
              name="PhoneService"
              value={formData.PhoneService}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Multiple Lines:</label>
            <select
              name="MultipleLines"
              value={formData.MultipleLines}
              onChange={handleChange}
            >
              {multipleLinesOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Internet Service:</label>
            <select
              name="InternetService"
              value={formData.InternetService}
              onChange={handleChange}
            >
              {internetServiceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="form-step fade-in">
            <label>Online Security:</label>
            <select
              name="OnlineSecurity"
              value={formData.OnlineSecurity}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Online Backup:</label>
            <select
              name="OnlineBackup"
              value={formData.OnlineBackup}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Device Protection:</label>
            <select
              name="DeviceProtection"
              value={formData.DeviceProtection}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Tech Support:</label>
            <select
              name="TechSupport"
              value={formData.TechSupport}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        {step === 4 && (
          <div className="form-step fade-in">
            <label>Streaming TV:</label>
            <select
              name="StreamingTV"
              value={formData.StreamingTV}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Streaming Movies:</label>
            <select
              name="StreamingMovies"
              value={formData.StreamingMovies}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Contract:</label>
            <select
              name="Contract"
              value={formData.Contract}
              onChange={handleChange}
            >
              {contractOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Paperless Billing:</label>
            <select
              name="PaperlessBilling"
              value={formData.PaperlessBilling}
              onChange={handleChange}
            >
              {yesNoOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Payment Method:</label>
            <select
              name="PaymentMethod"
              value={formData.PaymentMethod}
              onChange={handleChange}
            >
              {paymentOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label>Monthly Charges:</label>
            <input
              type="number"
              name="MonthlyCharges"
              value={formData.MonthlyCharges}
              onChange={handleChange}
              step="0.01"
              min="0"
            />

            <label>Total Charges:</label>
            <input
              type="number"
              name="TotalCharges"
              value={formData.TotalCharges}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>
        )}

        <div className="navigation-buttons">
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}
          {step < totalSteps && (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          )}
          {step === totalSteps && <button type="submit">Predict</button>}
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result" ref={resultRef}>
          <h3>Prediction: {result.prediction === 1 ? "Churn" : "No Churn"}</h3>
          <p>Probability: {(result.probability[1] * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default ChurnForm;