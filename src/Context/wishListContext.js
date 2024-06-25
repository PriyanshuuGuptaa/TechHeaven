import { createContext, useContext, useEffect, useState } from "react";

const WishListContext = createContext();

const WishListProvider = ({ children }) => {
    const [wishList, setWishList] = useState([]);


    useEffect(() => {
        const data = localStorage.getItem("wishlist");
        const email = localStorage.getItem("email");
        if (data) {
            const parseData = JSON.parse(data);
            setWishList([parseData])
        }
    }, []);
    return (
        <WishListContext.Provider value={[wishList, setWishList]}>
            {children}
        </WishListContext.Provider>
    )
}

//custom hook 
const useWishList = () => useContext(WishListContext);

export { useWishList, WishListProvider };