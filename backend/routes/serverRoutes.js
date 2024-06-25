const express= require("express");
const router= express.Router();

const getAllProducts=require("../controllers/servercontroller");

router.get('/allProducts', getAllProducts.getAllProducts);


module.exports=router;