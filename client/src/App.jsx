import React from "react";
import ChurnForm from "./components/ChurnForm";
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1 className="heading">RetainX</h1>
      <h2 className="tagline">Know who stays. Empower who might leave</h2>
      <ChurnForm />
    </div>
  );
}

export default App;
