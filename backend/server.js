import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

// configure environment variables
dotenv.config();

// connect to the database
connectDB();

// initialize express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoute);

// root route
app.get("/", (req, res) => {
    res.send("Hello from Backend!");
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API route not found",
    });
});

// general error handler
app.use((err, req, res, next) => {
    console.error(err.stack);  // log the error for debugging purposes
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server",
        error: err.message,
    });
});

// define the port
const PORT = process.env.BACKEND_PORT || 5000;

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
});
