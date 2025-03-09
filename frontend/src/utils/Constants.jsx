import React from "react";

// ✅ Use environment variable from Vite (.env file)
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; 
export const API_BASE_URL = "http://localhost:5000/api";

const Constants = () => {
  return (
    <div>
      <h3>API Base URL:</h3>
      <p>{API_BASE_URL}</p>
    </div>
  );
};

export default Constants;
