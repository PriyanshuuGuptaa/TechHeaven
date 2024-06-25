import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Landing page/Home";
import Cart from "./Pages/Cart/Cart";
import ProductListing from './Pages/Product listing/product-listing';
import Register from './Pages/Login page/register';
import Login from './Pages/Login page/login';
import ForgotPassword from './Pages/Login page/forgot-password';
import AdminRoute from './Components/private route/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserDashboard from './Pages/User/userDashboard.js';
import UserRoute from './Components/private route/UserRoute';
import CreateCategory from './Pages/Admin/CreateCategory.js';
import CreateProduct from './Pages/Admin/CreateProduct.js';
import Users from './Pages/Admin/users';
import Profile from './Pages/User/Profile.js';
import Orders from './Pages/User/Orders.js';
import AllProducts from './Pages/Admin/AllProducts.js';
import UpdateProduct from './Pages/Admin/UpdateProduct.js';
import SingleProduct from './Pages/Product listing/single-product.js';
import Wishlist from './Pages/Wishlist/Wishlist';

const Routs = ({ state, dispatch }) => {

    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home state={state} dispatch={dispatch} />}></Route>
                <Route exact path="/Cart" element={<Cart state={state} dispatch={dispatch} />}></Route>
                <Route exact path="/products" element={<ProductListing state={state} dispatch={dispatch} />} ></Route>
                <Route exact path="/Wishlist" element={<Wishlist />}></Route>
                <Route exact path="/register" element={<Register />}></Route>
                <Route exact path="/login" element={<Login />}></Route>

                <Route path='/dashboard' element={<UserRoute />}>
                    <Route exact path="user" element={<UserDashboard />}></Route>
                </Route>
                <Route path='/dashboard' element={<AdminRoute />}>
                    <Route exact path="admin" element={<AdminDashboard />}></Route>
                </Route>
                <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
                <Route exact path="/dashboard/admin/create-category" element={<CreateCategory />}></Route>
                <Route exact path="/dashboard/admin/create-product" element={<CreateProduct />}></Route>
                <Route exact path="/dashboard/admin/products" element={<AllProducts />}></Route>
                <Route exact path="/dashboard/admin/update-product/:id" element={<UpdateProduct />}></Route>
                <Route exact path="/dashboard/admin/users" element={<Users />}></Route>
                <Route exact path="/dashboard/user/profile" element={<Profile />}></Route>
                <Route exact path="/dashboard/user/orders" element={<Orders />}></Route>
                <Route exact path="/single-product/:id" element={<SingleProduct state={state} dispatch={dispatch} />}></Route>
                <Route exact path="/wish-list/:id" element={<Wishlist state={state} dispatch={dispatch} />}></Route>




            </Routes>
        </div>
    );
}

export default Routs;
