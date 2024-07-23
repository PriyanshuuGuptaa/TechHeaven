import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
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
app.use(express.static(path.join(__dirname, "build")));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoute);
// rest api


app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build/index.html"));
})

//PORT
// run listen
app.listen(process.env.BACKEND_PORT, () => {
    console.log(`server running on ${process.env.BACKEND_PORT}`.bgCyan.white);

})
