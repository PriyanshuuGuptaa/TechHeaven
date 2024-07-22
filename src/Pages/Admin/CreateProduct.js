import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, ButtonGroup } from '@mui/material';

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rating, setRating] = useState("");
    const [shipping, setShipping] = useState(false);
    const [featuredProduct, setFeaturedProduct] = useState(false);
    const [discount, setDiscount] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/category/allCategories");
                setCategories(response.data.allCategories);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        getAllCategories();
    }, []);

    const createProductHandler = async (e) => {
        e.preventDefault();
        console.log(e)

        if (!title || !description || !price || !quantity || !rating || !discount || !selectedCategory) {
            toast.error("Please fill all the fields");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('rating', rating);
        formData.append('discount', discount);
        formData.append('shipping', shipping);
        formData.append('featuredProduct', featuredProduct);
        formData.append('category', selectedCategory);

        images.forEach((image, index) => {
            formData.append('images', image);
        });
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/products/create-product",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Product created:', response.data);

            if (response.data.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(response.data?.message);
            }
        } catch (error) {
            console.error("Error creating product:", error.response ? error.response.data : error.message);
            toast.error("Error in creating product");
        }
    };

    const uploadImage = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    return (
        <div className='admin-dashboard-container'>
            <h1>ADMIN DASHBOARD</h1>
            <div>
                <div className='admin-menu'>
                    <ButtonGroup size="large" aria-label="Large button group">
                        <Button>
                            <Link to="/dashboard/admin/create-category" style={{ textDecoration: "none", color: 'black' }}>Create Category</Link>
                        </Button>
                        <Button>
                            <Link to="/dashboard/admin/create-product" style={{ textDecoration: "none", color: 'black' }}>Create Product</Link>
                        </Button>
                        <Button>
                            <Link to="/dashboard/admin/products" style={{ textDecoration: "none", color: 'black' }}>Products</Link>
                        </Button>
                        <Button>
                            <Link to="/dashboard/admin/users" style={{ textDecoration: "none", color: 'black' }}>Users</Link>
                        </Button>
                    </ButtonGroup>
                </div>

                <div className='create-product-details'>
                    <form onSubmit={createProductHandler} encType="multipart/form-data">
                        <div>
                            <label htmlFor="category">Select a category:</label>
                            <select id="category" value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); console.log(e.target.value) }}>
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>

                        <div className='product-images'>
                            <label>Upload images:</label>
                            <input type="file" multiple onChange={uploadImage} />
                            {images.map((img, index) => {
                                <img
                                    key={index}
                                    src={URL.createObjectURL(img)}
                                    alt={img.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
                                />
                            })}
                        </div>

                        <input
                            type='text'
                            placeholder='Enter name of product'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter description of product'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter price of product'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter quantity of product'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter rating of product'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter discount of product'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                        <label>
                            Shipping:
                            <input
                                type='checkbox'
                                checked={shipping}
                                onChange={(e) => setShipping(e.target.checked)}
                            />
                        </label>
                        <label>
                            Featured Product:
                            <input
                                type='checkbox'
                                checked={featuredProduct}
                                onChange={(e) => setFeaturedProduct(e.target.checked)}
                            />
                        </label>
                        <button type='submit'>SUBMIT</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default CreateProduct;
