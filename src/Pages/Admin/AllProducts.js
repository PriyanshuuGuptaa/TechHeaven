import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Dashboard.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from '../../Components/ProductCard';
import { Button, ButtonGroup } from '@mui/material';
const AllProducts = () => {
    const navigate = useNavigate();
    const buttons = [
        <Button key="one" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/admin/create-category" style={{ textDecoration: "none", color: 'black' }} >Create Category</Link>
        </Button>,
        <Button key="two" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/admin/create-product" style={{ textDecoration: "none", color: 'black' }}>Create Product</Link>
        </Button>,
        <Button key="three" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/admin/products" style={{ textDecoration: "none", color: 'black' }}>Products</Link>
        </Button>,
        <Button key="four" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/admin/users" style={{ textDecoration: "none", color: 'black' }}>Users</Link>
        </Button>
    ];

    const [allProducts, setAllProducts] = useState([]);
    const [image, setImage] = useState();
    const disableWishListBtn = true;
    const getAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/products/all-products");
            if (res.data.success) {
                setAllProducts(res.data.allProducts);
            }
            else {
                toast.error("no")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // deleting product

    const deleteProductHandler = async (id) => {
        try {
            console.log(id)
            const res = await axios.delete(`http://localhost:8080/api/v1/products/delete-product/${id}`);
            if (res.data.success) {
                setAllProducts(prevProducts => prevProducts.filter(product => product._id !== id));

                toast.success("Product deleted successfully");
            }
            else {
                toast.error("Error in deleting product")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //update product
    const updateProductHandler = (id) => {
        navigate("/dashboard/admin/update-product/:id");
    }


    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div>
            <h1>ADMIN DASHBOARD</h1>
            <div className='admin-dashboard-container'>
                <div className='admin-menu'>
                    <ButtonGroup size="large" aria-label="Large button group" >
                        {buttons}
                    </ButtonGroup>

                </div>

                <div className='all-products'>
                    <h3>ALL PRODUCTS</h3>
                    <div className='all-products-details'>

                        {allProducts.map((product) => (
                            <div className="product-card-div">
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    img={`http://localhost:8080/api/v1/products/product-photo/${product._id}`}
                                    category={product.category}
                                    title={product.title}
                                    price={product.price}
                                    discount={product.discount}
                                    rating={product.rating}
                                    discountedPrice={(product.price - (((product.price) * (10)) / 100))}
                                    disableWishListBtn={disableWishListBtn}
                                />
                                <div className='delete-btn'>
                                    <button onClick={() => { deleteProductHandler(product._id) }} >Delete</button>
                                </div>
                                <div className='update-btn'>
                                    <button onClick={() => { updateProductHandler(product._id) }}>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div >)
}
export default AllProducts