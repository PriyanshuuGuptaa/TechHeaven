import express from "express";
import { requiresSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { allCategories, createCategoryController, deleteCategory, getCategoryImage, singleCategory, updateCategoryController } from "../controllers/categoryController.js";
import formidable from "express-formidable";
const router = express.Router();

router.post("/create-category", requiresSignIn, isAdmin, formidable(), createCategoryController);
router.get("/category-image/:id", getCategoryImage);
router.put("/update-category/:id", requiresSignIn, isAdmin, updateCategoryController);
router.get("/allCategories", allCategories);
router.get("/singleCategory/:id", singleCategory);
router.delete("/deleteCategory/:id", deleteCategory);
export default router;