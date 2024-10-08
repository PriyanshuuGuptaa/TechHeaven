import categoryModel from "../models/categoryModel.js";
import fs from "fs";




export const createCategoryController = async (req, res) => {

    try {
        const { categoryName } = req.fields;
        const { categoryImage } = req.files;
        if (!categoryName) {
            return res.status(401).send({
                success: false,
                message: "Category name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({ categoryName });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
        }

        const category = new categoryModel({ categoryName });
        if (categoryImage) {
            category.categoryImage.data = fs.readFileSync(categoryImage.path);
            category.categoryImage.contentType = categoryImage.type;
        }
        await category.save();
        res.status(201).send({
            success: true,
            message: "Category created",
            category
        })
    } catch (error) {

        res.status(400).send({
            success: false,
            message: "Error in category",
            error
        })
    }


}

export const getCategoryImage = async (req, res) => {
    try {
        const categoryImage = await categoryModel.findById(req.params.id).select("categoryImage");
        if (categoryImage && categoryImage.categoryImage.data) {
            const imageBuffer = categoryImage.categoryImage.data;
            const base64Image = imageBuffer.toString('base64');
            const imageUrl = `data:${categoryImage.categoryImage.contentType};base64,${base64Image}`;
            return res.status(200).json({ success: true, url: imageUrl });
        } else {
            return res.status(404).send({ success: false, message: "Image not found" });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};


export const updateCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { id } = req.params;

        const newCategory = await categoryModel.findByIdAndUpdate(
            id,
            { categoryName },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category updated successfuly",
            newCategory
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in updating category",
            error
        })
    }
}

// get all categories

export const allCategories = async (req, res) => {
    try {
        const allCategories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All categories fetched",
            allCategories
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in fetching all categories"
        })

    }
}

//single category

export const singleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const singleCategory = await categoryModel.findOne({ id });
        res.status(200).send({
            success: true,
            message: "Single category fetched",
            singleCategory
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in fetching a single category"
        })

    }
}

//delete category

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Deleted successfuly",
            deleteCategory
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in deleting category"
        })

    }
}