// server/controllers/dataController.js
const products = require("../models/products");

const getAllProducts = async (req, res) => {
    try {
        const data = await products.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts
};
