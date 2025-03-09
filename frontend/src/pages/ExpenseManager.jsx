import React, { useState, useEffect } from "react";
import { addExpense, getExpenses } from "../services/Api"; // ✅ Import API calls

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]); // ✅ Store fetched expenses
  const [expense, setExpense] = useState({ category: "", amount: "" });
  const [error, setError] = useState("");

  // ✅ Fetch expenses from backend when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Error fetching expenses. Try again.");
      }
    };
    fetchExpenses();
  }, []);

  // ✅ Save expense to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense.category || !expense.amount) return;

    try {
      const newExpense = await addExpense({ 
        ...expense, 
        amount: Number(expense.amount) 
      });

      // ✅ Update UI with new expense
      setExpenses([...expenses, newExpense]);
      setExpense({ category: "", amount: "" });
    } catch (err) {
      setError("Error adding expense. Try again.");
    }
  };

  return (
    <div className="expense-container">
      <h2>Track Your Expenses</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          placeholder="Category"
          required
        />
        <input 
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          placeholder="Amount"
          required
        />
        <button type="submit" className="btn btn-success">Add Expense</button>
      </form>

      <h3>Expense List</h3>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((exp, index) => (
            <li key={index}>{exp.category}: ₹{exp.amount}</li>
          ))
        ) : (
          <p>No expenses yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ExpenseManager;
