import React from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useAuth } from "../context/AuthContext";
import "../styles/ViewReports.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4560"];

const ViewReports = () => {
  const { expenses, budget } = useAuth();

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const isOverBudget = totalExpenses > budget;

  return (
    <div className="report-container">
      <h2>Expense Report</h2>

      <div className="report-summary">
        <p><strong>Total Budget:</strong> ₹{budget}</p>
        <p><strong>Total Expenses:</strong> ₹{totalExpenses}</p>
        <p className={isOverBudget ? "over-budget" : "under-budget"}>
          <strong>Remaining Balance:</strong> ₹{remainingBudget}
        </p>
        {isOverBudget && <p className="warning-text">⚠️ You have exceeded your budget!</p>}
      </div>

      <div className="chart-section">
        {/* Bar Chart */}
        <div className="chart-box">
          <h3>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenses}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-box">
          <h3>Expense Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={expenses} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                {expenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;
