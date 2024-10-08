import React, { useReducer } from "react";
import { useSearch } from "../Context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "./SearchInput.css";
const SearchInput = ({ state, dispatch }) => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `https://techheaven-backend.onrender.com/api/v1/products/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/products");

            dispatch({ type: "SEARCH_PRODUCTS", payload: data })
        } catch (error) {
            console.log(error);
        }
    };
    return (


        <form onSubmit={handleSubmit}>
            <div class="search-box">
                <input type="text" class="search-box-input" placeholder="What are you looking for ?"
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    value={values.keyword} />
                <button class="search-box-btn">
                    <i class="search-box-icon material-icons"><FaSearch className="search-box-i" /></i>
                </button>
            </div>
        </form>
    );
};

export default SearchInput;