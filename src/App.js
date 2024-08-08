import React, { useEffect, useReducer } from "react";
import Navbars from "./Components/Navabars";
import Routs from "./Routs";
import Footer from "./Components/Footer.js";
import ProductReducer from "./Reducers/productReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const initialstate = {
  products: [],
  categories: [],
  filteredByCategory: [],
  cartQty: 0,
  totalprice: 0,
  totaldiscount: 0
};

function App() {
  const [state, dispatch] = useReducer(ProductReducer, initialstate);


  // Fetch categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}//api/v1/category/allCategories`);
      dispatch({ type: 'ALL_CATEGORIES', payload: response.data.allCategories });
      initialstate.categories = response.data.allCategories;
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/products/all-products`);
      dispatch({ type: 'ALL_PRODUCTS', payload: response.data.allProducts });

    } catch (error) {
      toast.error("Failed to fetch all products");
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []); // Empty array means this effect runs only once, like componentDidMount

  return (
    <div className="App">
      <Navbars state={state} dispatch={dispatch} />
      <Routs state={state} dispatch={dispatch} />
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // can be 'light', 'dark', or 'colored'
      />
      <Footer />
    </div>
  );
}

export default App;
