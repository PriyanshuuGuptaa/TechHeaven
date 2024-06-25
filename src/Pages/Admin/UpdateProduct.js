import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./Dashboard.css";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    const { id } = useParams();
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

    const navigate = useNavigate();
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


    useEffect(() => {
        //fetching all products
        const fetchProducts = async () => {
            try {
                const { res } = await axios.get(`http://localhost:8080/api/v1/products/all-products`);
                console.log(res);

            } catch (error) {
                toast.error("Not able to fetch information of the product")
            }
        }
    }, [id])


    // const createProductHandler = async (e) => {
    //     e.preventDefault();
    //     console.log(e)
    //     const formData = new FormData();
    //     formData.append('title', title);
    //     formData.append('description', description);
    //     formData.append('price', price);
    //     formData.append('quantity', quantity);
    //     formData.append('image', image);
    //     formData.append('category', selectedCategoryName);
    //     formData.append('shipping', shipping);
    //     formData.append('rating', rating);
    //     console.log(description, price, quantity, image, selectedCategory, shipping, rating)
    //     try {
    //         const { data } = await axios.post(
    //             `http://localhost:8080/api/v1/products/update-product/${e.id}`,
    //             formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         if (data?.success) {
    //             toast.success("Product Created Successfully");
    //             navigate("/dashboard/admin/create-product");
    //         } else {
    //             toast.error(data?.message);
    //         }
    //     } catch (error) {
    //         console.error("Error creating product:", error.response ? error.response.data : error.message);
    //         console.log(error)
    //         toast.error("Error in creating product");
    //     }
    // };

    return (
        <div>
            <h1>ADMIN DASHBOARD</h1>
            <div className='admin-dashboard-container'>
                <div className='admin-menu'>
                    <div className='admin-menu-items'>
                        <Link to="/dashboard/admin/create-category">Create Category</Link>
                    </div>
                    <div className='admin-menu-items'>
                        <Link to="/dashboard/admin/create-product">Create Product</Link>
                    </div>
                    <div className='admin-menu-items'>
                        <Link to="/dashboard/admin/products">Products</Link>
                    </div>
                    <div className='admin-menu-items'>
                        <Link to="/dashboard/admin/users">Users</Link>
                    </div>
                </div>

                <div className='admin-details'>
                    <h3>Create product</h3>
                    <div>
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? "demo-customized-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? true : undefined}
                            variant="outlined"
                            disableElevation
                            onClick={handleClick}
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

                    <div>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div>
                        {image && (
                            <img src={URL.createObjectURL(image)} height={"200px"} alt="Product" />
                        )}
                    </div>
                    <form >
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
                        <label>
                            Shipping:
                            <input
                                type='checkbox'
                                checked={shipping}
                                onChange={(e) => setShipping(e.target.checked)}
                            />
                        </label>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
