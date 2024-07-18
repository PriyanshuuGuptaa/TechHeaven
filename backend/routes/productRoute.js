import express, { Router } from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import { ProductController, UpdateProductController, allProducts, deleteProductController, getAllImages, productPhotoController, searchProductController, singleProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
import multer from "multer";
import bodyParser from "body-parser";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// Middleware to parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse application/json
router.use(bodyParser.json());



router.post("/create-product", requiresSignIn, isAdmin, formidable(), upload.array("images", 4), ProductController);
router.delete("/delete-product/:pid", requiresSignIn, isAdmin, deleteProductController);
router.get("/all-products", allProducts, allProducts);
router.get("/single-product/:pid", singleProductController);
router.get("/:pid/images", getAllImages)
router.post('/:pid/images', productPhotoController);
router.put("/update-product/:id", UpdateProductController);
router.get("/search/:keyword", searchProductController);

export default router;