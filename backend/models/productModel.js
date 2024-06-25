import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: String,
        ref: "category",
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean
    },
    rating: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    featuredProduct: {
        type: Boolean,
        required: true
    }
})
export default mongoose.model("product", productSchema);