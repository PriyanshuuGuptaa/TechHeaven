import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({

    image: {
        data: Buffer,
        contentType: String,
    }
})

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
    },
    image: [productImageSchema]
})
export default mongoose.model("product", productSchema);