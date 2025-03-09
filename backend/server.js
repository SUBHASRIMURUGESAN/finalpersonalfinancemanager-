import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ✅ Configure CORS properly
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both
    credentials: true,
  })
);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Handle form data

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes); // ✅ Ensure frontend uses /api/auth
app.use("/api/expenses", expenseRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
