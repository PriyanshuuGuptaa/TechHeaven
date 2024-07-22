import express from "express";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";
import { ProductController, UpdateProductController, allProducts, deleteProductController, getAllImages, getImageById, searchProductController, singleProductController } from "../controllers/productController.js";
import multer from "multer";
import bodyParser from "body-parser";

const storage = multer.diskStorage({

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });
const router = express.Router();

// Middleware to parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse application/json
router.use(bodyParser.json());

// Route for creating a product
router.post("/create-product", requiresSignIn, isAdmin, upload.array("images", 4), (req, res) => {
    ProductController(req, res);
});

// Other routes
router.delete("/delete-product/:pid", requiresSignIn, isAdmin, deleteProductController);
router.get("/all-products", allProducts);
router.get("/single-product/:pid", singleProductController);
router.get("/:pid/images", getAllImages);
router.get("/:pid/images/:imageId", getImageById);
router.put("/update-product/:id", UpdateProductController);
router.get("/search/:keyword", searchProductController);

export default router;
