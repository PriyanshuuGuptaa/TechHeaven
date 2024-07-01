import React, { useReducer } from "react";
import { useSearch } from "../Context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ state, dispatch }) => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(values.keyword)
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/products/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            console.log(data)
            navigate("/products");

            dispatch({ type: "SEARCH_PRODUCTS", payload: data })
            console.log(state.filteredProducts)
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit" >
                    <SearchIcon />
                </button>
            </form>
        </div>
    );
};

export default SearchInput;