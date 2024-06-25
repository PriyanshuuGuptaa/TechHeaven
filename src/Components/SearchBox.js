import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SearchBox = ({ state, dispatch }) => {
    console.log();


    const searchHandler = (e) => {
        console.log(e);


    }
    return (
        <form>
            <input
                type="searchbox"
                placeholder="  Enter the product"
                autoComplete="off"
                onChange={(e) => searchHandler(e.target.value)}
            ></input>
            <Link to="/products">
                <button ><IoSearchSharp /></button>
            </Link>
        </form>
    )
}

export default SearchBox;