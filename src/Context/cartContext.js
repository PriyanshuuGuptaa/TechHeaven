import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const data = localStorage.getItem("cart");
        const email = localStorage.getItem("email");
        if (data) {
            const parseData = JSON.parse(data);
            setCart([])
        }
    }, []);
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hook 
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };