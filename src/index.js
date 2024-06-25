import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import { CartProvider } from "./Context/cartContext";
import { WishListProvider } from "./Context/wishListContext";
import { SearchProvider } from "./Context/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <SearchProvider>
      <WishListProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </WishListProvider>
    </SearchProvider>
  </AuthProvider>
);
