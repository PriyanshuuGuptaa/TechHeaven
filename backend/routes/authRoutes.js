import express from "express";
import { registerController, loginController, testController, forgotPasswordController, cartitemController, getAllCartItems, incrementCartItemQuantity, decrementCartItemQuantity, deleteCartItemController, wishListController, getAllWishListItems, deleteWishListItemController } from "../controllers/authController.js";
import { requiresSignIn, isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST 
router.post("/register", registerController);
router.post("/login", loginController);

//test
router.get("/test", requiresSignIn, testController);

//protected route auth
router.get("/user-auth", requiresSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
//protected route auth
router.get("/admin-auth", requiresSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})
//FORGOT PASSWORD
router.post("/forgotPassword", forgotPasswordController)

//POST CART-ITEMSy
router.post("/add-to-cart", requiresSignIn, cartitemController);
router.get("/cart-items", requiresSignIn, getAllCartItems);
// Route for incrementing cart item quantity
router.post("/increment-cart-item", incrementCartItemQuantity);

// Route for decrementing cart item quantity
router.post("/decrement-cart-item", decrementCartItemQuantity);
//Route for deleting cart item
router.post('/remove-cart-item', deleteCartItemController);
router.delete('/remove-cart-item', requiresSignIn, deleteCartItemController);

//POST WISHLIST
router.post("/add-to-wishlist", requiresSignIn, wishListController);
router.get("/wish-list-items", requiresSignIn, getAllWishListItems);
router.delete('/remove-wish-list-item', requiresSignIn, deleteWishListItemController);




export default router;