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
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();

//database config
connectDB();

// rest object 
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use import.meta.url to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, "build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoute);

// Handle all other routes by serving the index.html file
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build/index.html"));
})

//PORT
const PORT = process.env.BACKEND_PORT || 5000;

// run listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgCyan.white);
});
