import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import "./Dashboard.css";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonGroup from '@mui/material/ButtonGroup';


const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("Select a category");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rating, setRating] = useState("");
    const [shipping, setShipping] = useState(false);
    const [featuredProduct, setFeaturedProduct] = useState(false);
    const [discount, setDiscount] = useState("");
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



    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            {...props}
        />
    ))(({ theme }) => ({
        "& .MuiPaper-root": {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
            boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
                padding: "4px 0",
            },
            "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                "&:active": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    }));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const getAllCategories = async () => {
        try {
            const category = await axios.get("http://localhost:8080/api/v1/category/allCategories");
            setCategories(category.data.allCategories);
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const createProductHandler = async (e) => {
        e.preventDefault();

        if (!image || !title || !description || !price || !quantity || !rating || !discount || !featuredProduct || selectedCategory === "Select a category") {
            toast.error("Please fill all the fields");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('image', image);
        formData.append('category', selectedCategoryName);
        formData.append('shipping', shipping);
        formData.append('rating', rating);
        formData.append('discount', discount);
        formData.append('featuredProduct', featuredProduct);



        try {
            const { data } = await axios.post(
                "http://localhost:8080/api/v1/products/create-product",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data?.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/create-product");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error("Error creating product:", error.response ? error.response.data : error.message);
            toast.error("Error in creating product");
        }
    };

    return (
        <div className='admin-dashboard-container'>
            <h1>ADMIN DASHBOARD</h1>
            <div >
                <div className='admin-menu'>
                    <ButtonGroup size="large" aria-label="Large button group" >
                        {buttons}
                    </ButtonGroup>

                </div>

                <div className='create-product-details'>
                    <h3>CREATE PRODUCT</h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        < Button
                            id="demo-customized-button"
                            aria-controls={open ? "demo-customized-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? true : undefined}
                            variant="outlined"
                            disableElevation
                            onClick={handleClick}
                            className='select-category-btn'
                            sx={{ margin: '20px' }}
                        >
                            {selectedCategoryName}
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => { setAnchorEl(null); }}
                        >
                            {categories.map((e) => (
                                <MenuItem
                                    onClick={() => {
                                        setAnchorEl(null);
                                        setSelectedCategory(e._id);
                                        setSelectedCategoryName(e.categoryName);
                                    }}
                                    disableRipple
                                    key={e._id}
                                >
                                    {e.categoryName}
                                </MenuItem>
                            ))}
                        </StyledMenu>
                    </div>

                    <div className='select-image'>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image && (
                            <img src={URL.createObjectURL(image)} height={"200px"} alt="Product" />
                        )}
                    </div>
                    <form onSubmit={createProductHandler}>
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
                            Do you want to feature this product?
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
