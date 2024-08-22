c// api/auth.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup auth routes
app.use("/api/v1/auth", authRoutes);

// Export the app as a serverless function
export default app;
