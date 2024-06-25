import categoryModel from "../models/categoryModel.js";



export const createCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body;
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

        const category = await new categoryModel({ categoryName }).save();
        res.status(201).send({
            success: true,
            message: "Category created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in category",
            error
        })
    }

}

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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in deleting category"
        })

    }
}