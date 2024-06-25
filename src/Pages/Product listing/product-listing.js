import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./product-listing.css";
import { Link, useNavigate } from "react-router-dom";


const ProductListing = ({ state, dispatch }) => {
  const needWishListBtn = true;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(70000); // Initialize with a default max value
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    // Calculate min and max prices from products
    if (state.products && state.products.length > 0) {
      const prices = state.products.map(product => product.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange(70000); // Initialize the slider to max price
    }
  }, [state.products]);
  const clearAllFilters = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS", payload: state.products });
    setSelectedCategory("");
    setSelectedRating(0);
    setPriceRange(70000);
  }

  const filterByCategory = (e) => {
    const category = e.target.value;
    const filteredProducts = state.products.filter(product => product.category === category);
    dispatch({ type: "SET_CATEGORY", payload: filteredProducts });
    setSelectedCategory(category);
  };
  const filterByPrice = (event, newValue) => {
    setPriceRange(newValue);
    const filteredProducts = state.products.filter(product => product.price <= newValue);
    dispatch({ type: "SET_PRICE", payload: filteredProducts })
  };

  const filterByRating = (e) => {
    const rating = e.target.value; setSelectedRating(rating);
    const filteredProducts = state.products.filter(product => product.rating >= rating);
    dispatch({ type: "SET_RATING", payload: filteredProducts });
  };

  const filterByDiscount = (e) => {
    const discount = e.target.value;
    setSelectedDiscount(discount);
    const filteredProducts = state.products.filter(product => product.discount >= discount);
    dispatch({ type: "SET_DISCOUNT", payload: filteredProducts })
  }



  return (
    <div className="product-listing-container">
      <div className="filters">
        <div className="filter-heading">
          <h2>Filters</h2>
          <Stack spacing={2} direction="row">
            <Button variant="text" size="small" onClick={clearAllFilters} >Clear All</Button>
          </Stack>
        </div>
        <div className="filter-by-category">
          <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "black" }}>
            <h3>Filter by Category</h3>
          </FormLabel>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={filterByCategory}
              value={selectedCategory}
            >
              {state.categories.map((category) => (
                <FormControlLabel value={category.categoryName} control={<Radio />} label={`${category.categoryName}`} />
              ))}
            </RadioGroup>
          </FormControl>

        </div>
        <div className="filter-by-price">
          <h3>Filter by Price</h3>
          <Box sx={{ width: 300 }}>
            <Slider
              size="small"
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={10000} // Adjust the step value as needed
              aria-label="Price range"
              valueLabelDisplay="auto"
              onChange={filterByPrice} // Attach the handler here
            />

          </Box>
        </div>
        <div className="filter-by-rating">
          <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "black" }}>
            <h3>Filter by Ratings</h3>
          </FormLabel>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={0}
              name="radio-buttons-group"
              onChange={filterByRating}
              value={selectedRating}
            >
              {[4, 3, 2, 1].map((rating) => (
                <FormControlLabel value={rating} control={<Radio />} label={`${rating} or above`} />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="filter-by-discount">
          <FormLabel id="demo-radio-buttons-group-label" sx={{ color: "black" }}>
            <h3>Filter by discount</h3>
          </FormLabel>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={filterByDiscount}
            >
              {[10, 20, 30, 40, 50].map((dis) => (
                <FormControlLabel value={dis} control={<Radio />} label={`${dis}% or more`} />
              ))}
            </RadioGroup>
          </FormControl>

        </div>
      </div>
      <div className="products" >
        {state.filteredProducts.map((product) =>
          <div className="product-card-div"  >
            <div>

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
                needWishListBtn={needWishListBtn}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
