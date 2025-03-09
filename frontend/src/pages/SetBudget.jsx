import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateBudgetApi } from "../services/Api"; // ✅ Import API function

const SetBudget = () => {
  const { budget, updateBudget } = useAuth(); // Get budget from context
  const [newBudget, setNewBudget] = useState(budget || ""); // Initialize with existing budget
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await updateBudgetApi(newBudget);  // ✅ Save to backend
      updateBudget(newBudget);  // ✅ Update context state
    } catch (error) {
      setError("Failed to update budget. Try again.");
      console.error("❌ Budget update failed:", error);
    }
  };

  return (
    <div className="budget-container">
      <h2>Set Your Monthly Budget</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Enter budget amount"
          required
        />
        <button type="submit" className="btn btn-success">Save Budget</button>
      </form>
    </div>
  );
};

export default SetBudget;
