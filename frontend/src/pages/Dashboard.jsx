import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import authentication context
import { getExpenses } from "../services/Api"; // ✅ Ensure correct API import
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, expenses, addExpense } = useAuth(); // Access user & functions
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const [error, setError] = useState(null); // Error state for handling errors

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch expenses only if user is logged in
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        if (data.length > 0) {
          data.forEach((expense) => addExpense(expense)); // Add to global state
        }
      } catch (error) {
        console.error("❌ Error fetching expenses:", error);
        setError("Failed to fetch expenses. Please try again later.");
      } finally {
        setLoading(false); // ✅ Ensure loading state is updated
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [user, addExpense]);

  // ✅ Show loading spinner until expenses load
  if (loading) {
    return <p>Loading Dashboard...</p>;
  }

  // Show error message if there is an error
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}! 👋</h1>
      <p>Your personal finance tracker</p>

      <div className="dashboard-options">
        <button className="btn btn-info mx-2 my-2" onClick={() => navigate("/expenses")}>
          Track Expenses
        </button>
        <button className="btn btn-warning mx-2 my-2" onClick={() => navigate("/set-budget")}>
          Set Budget
        </button>
        <button className="btn btn-success mx-2 my-2" onClick={() => navigate("/reports")}>
          View Reports
        </button>
      </div>

      <h3>Your Recent Expenses</h3>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense._id}>
              {expense.category}: ${expense.amount}
            </li>
          ))
        ) : (
          <p>No expenses recorded.</p>
        )}
      </ul>

      <button className="btn btn-danger mt-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
