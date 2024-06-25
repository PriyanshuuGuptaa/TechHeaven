import React, { createContext, useContext, useEffect, useReducer } from "react";
import ProductReducer from "../Reducers/productReducer";

const ProductContext = createContext(null);

export const useProduct = () => useContext(ProductContext);
const initialstate = {
  products: [],
  filteredproducts: [],
  cart: [],
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialstate);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:4001/api/products");
        if (!response.ok) {
          throw new Error("couldnot fetch products");
        }
        const data = await response.json();
        dispatch({ type: "PRODUCTS_FETCHED", payload: data });
        console.log(data);
      } catch (error) { }
    }
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

const fetchProducts = () => {
  // https://fakestoreapi.com/products
  const fakestore = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
  }
}