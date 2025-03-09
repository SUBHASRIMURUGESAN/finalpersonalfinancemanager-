import axios from "axios";
import { API_BASE_URL } from "../utils/Constants";

// ✅ Create Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure API_BASE_URL = http://localhost:5000/api
  withCredentials: false, // Allows cookies & sessions
  headers: { "Content-Type": "application/json" },
});

// 🔹 Attach Authorization Token (if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Debugging: Check if API_BASE_URL is read from .env
console.log("🔹 API BASE URL:", API_BASE_URL);

// 🟢 Authentication APIs
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData); // ✅ Correct route
    return response.data;
  } catch (error) {
    console.error("❌ Error Registering User:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData); // ✅ Corrected route
    localStorage.setItem("token", response.data.token); // ✅ Store token on login
    return response.data;
  } catch (error) {
    console.error("❌ Error Logging In:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("token"); // ✅ Remove token on logout
    return response.data;
  } catch (error) {
    console.error("❌ Error Logging Out:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Check if user is logged in
export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/auth/status");
    return response.data; // Returns user session info if logged in
  }  catch (error) {
    return { loggedIn: false };
  }
};

// 🟢 Expense APIs
export const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    console.error("❌ Error Adding Expense:", error.response?.data || error.message);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await api.get("/expenses");
    return response.data;
  } catch (error) {
    console.error("❌ Error Fetching Expenses:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error Deleting Expense:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Budget API
export const updateBudgetApi = async (budget) => {
  try {
    const response = await api.post("/budget", { budget });
    return response.data;
  } catch (error) {
    console.error("❌ Error Updating Budget:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
