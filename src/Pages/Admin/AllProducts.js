import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Dashboard.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from '../../Components/ProductCard';
import { Button, ButtonGroup } from '@mui/material';
import ProductImages from '../../Components/ProductImage';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/products/all-products`);
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
            const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/products/delete-product/${id}`);
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
        <div className='admin-dashboard-container'>
            <h1>ADMIN DASHBOARD</h1>
            <div className='admin-menu'>
                <ButtonGroup size="large" aria-label="Large button group" >
                    {buttons}
                </ButtonGroup>

            </div>

            <div className='all-products'>
                <h3>ALL PRODUCTS</h3>
                <div className='all-products-details'>
                    {allProducts.map((product) => (
                        <div className="card-div">
                            <button
                                onClick={() => deleteProductHandler(product._id)}
                                id='all-product-delete-btn'
                            >
                                <DeleteIcon />
                            </button>

                            <div className="card-container">
                                <div className="card-img">
                                    <ProductImages productId={product._id} index={0} />
                                </div>
                                <div className="card-details">
                                    <div className="card-title">
                                        <p>{product.title}</p>
                                    </div>
                                    <div className="card-price">
                                        <p id="discountedprice">₹ {(product.price - ((product.price * product.discount) / 100))}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div >)
}
export default AllProducts