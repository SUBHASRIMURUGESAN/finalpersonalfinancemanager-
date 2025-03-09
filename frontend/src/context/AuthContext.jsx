import { createContext, useState, useContext, useEffect } from "react";
import { checkAuthStatus, logoutUser } from "../services/Api"; // API Calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ Added to prevent flickering on reload

  // ✅ Load user from localStorage on page reload
  useEffect(() => {
    const fetchAuthStatus = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false); // Stop loading if no token
        return;
      }

      try {
        const response = await checkAuthStatus();
        if (response?.user) {
          setUser(response.user);
        } else {
          logout(); // If token is invalid, log out
        }
      } catch (error) {
        console.error("❌ Auth check failed:", error);
      } finally {
        setLoading(false); // Stop loading after request
      }
    };

    fetchAuthStatus();
  }, []);

  // 🔹 Login function: Save token & user
  const login = (userData) => {
    localStorage.setItem("authToken", userData.token);
    setUser(userData.user);
  };

  // 🔹 Logout function: Clear token & reset state
  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("authToken");
      setUser(null);
      setExpenses([]);
      setBudget(0);
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  // ✅ Add expense to state
  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  // ✅ Update budget
  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, expenses, addExpense, budget, updateBudget, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
