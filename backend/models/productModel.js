import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
});

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
        type: Boolean,
        required: true
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
    images: {
        type: [productImageSchema],
        validate: {
            validator: function (val) {
                return val.length <= 4;  // Updated the limit to 12 as per multer configuration
            },
            message: props => `${props.path} exceeds the limit of 12`
        }
    }
});

export default mongoose.model("Product", productSchema);
