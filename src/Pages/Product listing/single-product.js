import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../../Context/cartContext';
import { useAuth } from '../../Context/authContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import './single-product.css';
import { Buffer } from 'buffer';
import ProductImages from '../../Components/ProductImage';

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [singleProduct, setSingleProduct] = useState({});
    const { state, dispatch } = useAuth(); // Assuming you have a context for auth
    const [images, setImages] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);

    const changeImg = (index) => {
        setImgIndex(index);
    };

    useEffect(() => {
        getProductInfo();
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/products/${id}/images`);
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [id]);

    const getProductInfo = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/products/single-product/${id}`);
            setSingleProduct(res.data.product);
        } catch (error) {
            console.error("Error fetching product info:", error);
            toast.error("Failed to fetch product details.");
        }
    };

    const handleCart = async (product) => {
        try {
            const token = localStorage.getItem("token");
            const formattedToken = `${token}`; // Ensure proper format
            const cartItem = { productId: product._id, quantity: 1 };
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/add-to-cart",
                { token, cartItems: [cartItem] },
                { headers: { Authorization: formattedToken } }
            );

            if (response.data.success) {
                const updatedCart = [...cart];
                const existingCartItem = updatedCart.find(item => item.productId === product._id);

                if (existingCartItem) {
                    toast.error('Item is already in the cart.');
                    return;
                }

                updatedCart.push({ productId: product._id, quantity: 1 });
                setCart(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                toast.success("Product added to cart.");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("Failed to add product to cart.");
        }
    };

    const exitSingleProduct = () => {
        navigate("/products");
    };

    let productRating = singleProduct.rating;

    return (
        <div className='single-product-container'>
            <button id='exit-btn' onClick={exitSingleProduct}><ArrowBackIcon /></button>
            <div className='single-product-image'>
                <div className="img-container">
                    <div className="other-images">
                        {[0, 1, 2, 3].map((index) => (
                            <div
                                key={index}
                                onClick={() => changeImg(index)}
                                className="other-product-image"
                            >
                                <ProductImages productId={id} index={index} />
                            </div>
                        ))}
                    </div>
                    <div
                        className="main-product-image"
                    ><ProductImages productId={id} index={imgIndex} />
                    </div>

                </div>
                <div className='buttons'>
                    <button onClick={() => handleCart(singleProduct)} id='addtocart'>Add to cart</button>
                    <button id='buynow'>Buy Now</button>
                </div>
            </div>
            <div className='single-product-details'>
                <p id='category'>{singleProduct.category}</p>
                <p id='title'><b>{singleProduct.title}</b></p>
                <p id='rating'>
                    {Array.from({ length: productRating }, (_, i) => (
                        <StarIcon key={i} sx={{ color: 'orange' }} />
                    ))}
                </p>
                <div className='discountandprice'>
                    <p id='discountedPrice'>₹{(singleProduct.price - (singleProduct.price * (singleProduct.discount / 100))).toFixed(2)}</p>
                    <p id='actualPrice'>₹{singleProduct.price}</p>
                    <p id='discount'>{singleProduct.discount}% Off</p>
                </div>
                <p id="product-description">{singleProduct.description}</p>
            </div>
            <div className='description'></div>
        </div>
    );
};

export default SingleProduct;
