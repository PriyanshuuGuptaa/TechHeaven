import fs from "fs";
import productModel from '../models/productModel.js';
import slugify from "slugify";
import mongoose from "mongoose";

export const ProductController = async (req, res) => {
    try {
        console.log(req);
        const { title, description, price, rating, shipping, quantity, category, slug, discount, featuredProduct } = req.fields;

        switch (true) {
            case !title:
                return res.status(500).send({ message: "Error in creating title" });
            case !description:
                return res.status(500).send({ message: "Error in creating description" });
            case !price:
                return res.status(500).send({ message: "Error in creating price" });
            case !rating:
                return res.status(500).send({ message: "Error in creating rating" });
            case !shipping:
                return res.status(500).send({ message: "Error in creating shipping address" });
            case !quantity:
                return res.status(500).send({ message: "Error in creating quantity" });
            case !category:
                return res.status(500).send({ message: "Error in creating category" });
            case !discount:
                return res.status(500).send({ message: "Error in creating discount" });
            case !featuredProduct:
                return res.status(500).send({ message: "Error in featuring product" });
            default:
                break;
        }

        const images = req.files.map(file => ({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer
        }));

        const newProduct = new productModel({
            title,
            description,
            price,
            rating,
            shipping,
            quantity,
            category,
            discount,
            featuredProduct,
            slug: slugify(title),
            images
        });

        await newProduct.save();
        res.status(201).send({ success: true, message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        });
    } finally {
        await client.close();
    }
};

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

//upload photo


export const productPhotoController = async (req, res) => {
    uploadImages(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ success: false, message: "Error while uploading images", err });
        }

        try {
            // Find the product by ID
            const product = await productModel.findById(req.params.pid);

            if (!product) {
                return res.status(404).send({ success: false, message: "Product not found" });
            }

            // Iterate over each file and add it to the product's image array
            req.files.forEach((file) => {
                const newImage = {
                    image: {
                        data: file.buffer, // Buffer containing the image data
                        contentType: file.mimetype // Image MIME type
                    }
                };
                product.image.push(newImage);
            });

            // Save the product document
            await product.save();

            res.status(200).send({
                success: true,
                message: "Images uploaded successfully",
                image: product.image
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error while saving images",
                error,
            });
        }
    });
};
//get photo

export const getAllImages = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('image');
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }
        console.log(product)

        res.status(200).send({ success: true, images: product.image });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error while fetching images", error });
    }
}

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
            products: updatedProduct
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