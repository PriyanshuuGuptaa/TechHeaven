import express, { Router } from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import { ProductController, UpdateProductController, allProducts, deleteProductController, getAllImages, productPhotoController, searchProductController, singleProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post("/create-product", requiresSignIn, isAdmin, formidable(), ProductController);
router.delete("/delete-product/:pid", requiresSignIn, isAdmin, deleteProductController);
router.get("/all-products", allProducts, allProducts);
router.get("/single-product/:pid", singleProductController);
router.get("/:pid/images", getAllImages)
router.post('/:pid/images', productPhotoController);
router.put("/update-product/:id", UpdateProductController);
router.get("/search/:keyword", searchProductController);

export default router;