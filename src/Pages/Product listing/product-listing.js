import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./product-listing.css";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import SkeletonProductCard from "../../Components/SkeletonLoaderCard";
import CategoryImage from "../../Components/CategoryImage";



const ProductListing = ({ state, dispatch }) => {
  const needWishListBtn = true;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(70000); // Initialize with a default max value
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [isChecked, setisChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  console.log(state.categories, "cate")
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
      setLoading(false);
    }

  }, [state.products]);

  const clearAllFilters = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS", payload: state.products });
    setSelectedCategory("");
    setSelectedRating(0);
    setPriceRange(70000);
    setisChecked(false);
  }

  const filterByCategory = (e) => {
    const category = e;
    if (category) {
      const filteredByCategory = state.products.filter(product => product.category === category);
      dispatch({ type: "SET_CATEGORY", payload: filteredByCategory });
    }
    setSelectedCategory(category);
  };

  const filterByPrice = (event, newValue) => {
    setPriceRange(newValue);
    const filteredByCategory = state.filteredByCategory.filter(product => product.price <= newValue);
    dispatch({ type: "SET_PRICE", payload: filteredByCategory })
  };



  const toggleRatingFilter = (rating) => {
    if (selectedRating === rating) {
      dispatch({ type: "SET_RATING", payload: state.filteredByCategory }); // Reset rating filter
      setSelectedRating(0);
    } else {
      const filteredProducts = state.filteredByCategory.filter(product => product.rating >= rating);
      dispatch({ type: "SET_RATING", payload: filteredProducts });
      setSelectedRating(rating);
    }
  };

  const toggleDiscountFilter = (discount) => {
    if (selectedDiscount === discount) {
      dispatch({ type: "SET_DISCOUNT", payload: state.filteredByCategory }); // Reset discount filter
      setSelectedDiscount(0);
    } else {
      const filteredProducts = state.filteredByCategory.filter(product => product.discount >= discount);
      dispatch({ type: "SET_DISCOUNT", payload: filteredProducts });
      setSelectedDiscount(discount);
    }
  }

  const handlePrevious = () => {
    if (currentIndex >= 1) {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : state.categories.length - 1));
    }


  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < state.categories.length - 1 ? prevIndex + 1 : 0));
  };



  return (

    <div className="product-listing-page">
      <div className="carousel-container">
        <button className="carousel-button left" onClick={handlePrevious}>&#8249;</button>
        <div className="carousel-wrapper">
          <div
            className="carousel-inner"
            style={{
              transform: `translateX(${-currentIndex * 100}%)`,
              gridTemplateColumns: `repeat(${state.categories.length}, 1fr)`
            }}
          >
            {state.categories.map((category, index) => (
              <div key={index} className="carousel-item">
                <div className="category-image-div">
                  <CategoryImage categoryId={category._id} id="categoryimg" />
                </div>

                <h3 className="carousel-title" onClick={() => { filterByCategory(category.categoryName) }}>{category.categoryName}</h3>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button right" onClick={handleNext}>&#8250;</button>
      </div>
      <div className="product-listing-container">
        <div className="filters">
          <div className="filter-heading">
            <Stack spacing={2} direction="row">
              <Button variant="text" size="small" onClick={clearAllFilters} >Clear All</Button>
            </Stack>
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
            <FormLabel sx={{ color: "black" }}>
              <h3>Filter by Ratings</h3>
            </FormLabel>

            <FormControl>

              {[4, 3, 2, 1].map((rating) => (
                <FormControlLabel value={rating} control={<Checkbox checked={selectedRating === rating} onChange={() => toggleRatingFilter(rating)} />} label={`${rating} or above`} />
              ))}
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

              >
                {[10, 20, 30, 40, 50].map((dis) => (
                  <FormControlLabel value={dis} control={<Checkbox checked={selectedDiscount === dis} onChange={() => toggleDiscountFilter(dis)} />} label={`${dis}% or more`} />
                ))}
              </RadioGroup>
            </FormControl>

          </div>
        </div>
        <div className="products" >
          {loading ? ((Array.from({ length: 6 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          )))) : (state.filteredProducts.map((product) =>
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
          ))}
        </div>
      </div>

    </div>
  )
};

export default ProductListing;
