import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        data: Buffer,
        contentType: String
    }

}, { timestamps: true });

export default mongoose.model("category", categorySchema);