import fs from "fs";
import productModel from '../models/productModel.js';
import slugify from "slugify";
import mongoose from "mongoose";
export const ProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, rating, shipping, quantity, category, slug, discount, featuredProduct } = req.fields;
        const { image } = req.files;

        switch (true) {
            case !title:
                return res.status(500).send({ message: "Error in creating title" });
                break;
            case !description:
                return res.status(500).send({ message: "Error in creating description" });
                break;
            case !price:
                return res.status(500).send({ message: "Error in creating price" });
                break;
            case !rating:
                return res.status(500).send({ message: "Error in creating rating" });
                break;
            case !shipping:
                return res.status(500).send({ message: "Error in creating shipping address" });
                break;
            case !quantity:
                return res.status(500).send({ message: "Error in creating quantity" });
                break;
            case !category:
                return res.status(500).send({ message: "Error in creating category" });
                break;
            case !discount:
                return res.status(500).send({ message: "Error in creating discouunt" });
                break;
            case !featuredProduct:
                return res.status(500).send({ message: "Error in featuring product" });
                break;

            case image && image.size > 1000000:
                return res.status(500).send({ message: "image required should be less than 1mb" })
            default:
                break;
        }
        const products = new productModel({ ...req.fields, slug: slugify(title) });
        if (image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }
        await products.save()
        res.status(200).send({
            success: true,
            message: "Product successfuly created",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        })
    }
}

//fetching all products
export const allProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).send({
            success: true,
            message: "Displayed all products",
            allProducts
        })


    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Error in fetching all products",
            error
        })
    }
}
//fetching single product
export const singleProductController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

//delete product

export const deleteProductController = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.params.pid).select("-image");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

//get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("image");
        if (product.image.data) {
            res.set("Content-type", product.image.contentType);
            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting image",
            error,
        });
    }
};

//update product 
export const UpdateProductController = async (req, res) => {
    try {
        const { title, description, price, rating, quantity, discount, featuredProduct } = req.body;
        const { id } = req.params;

        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid product ID"
            });
        }

        // Construct the updated fields object
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (price) updatedFields.price = price;
        if (rating) updatedFields.rating = rating;
        if (quantity) updatedFields.quantity = quantity;
        if (discount) updatedFields.discount = quantity;
        if (featuredProduct) updatedFields.featuredProduct = featuredProduct;


        // Find and update the product
        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error,
        });
    }
}


//searching product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel
            .find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-image");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};