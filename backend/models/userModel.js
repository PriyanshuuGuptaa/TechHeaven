import mongoose from "mongoose";
import products from "./productModel.js";

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const wishListItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    answer: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    cartItems: [cartItemSchema],
    wishListItems: [wishListItemSchema]

}, { timestamps: true });


export default mongoose.model("users", userSchema);