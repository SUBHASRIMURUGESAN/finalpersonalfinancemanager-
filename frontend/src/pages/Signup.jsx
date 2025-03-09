import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Api";
import "../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔹 Sending signup request to API:", formData);
      
      const response = await registerUser(formData);

      if (response) {
        alert("Signup successful! Please log in.");
        navigate("/login"); // ✅ Redirect after successful signup
      }
    } catch (err) {
      console.error("❌ Signup Error:", err);
      setError(err?.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate('/login')} className="link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
