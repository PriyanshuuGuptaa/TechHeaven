// api/products.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "../backend/config/db.js";
import productRoute from "../backend/routes/productRoute.js";

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

// Setup product routes
app.use("/api/v1/products", productRoute);

// Export the app as a serverless function
export default app;
