import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/authContext'
import "./Dashboard.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [updatedName, setupdatedName] = useState("");
    const [id, setId] = useState("");

    const buttons = [
        <Button key="one" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/admin/create-category" style={{ textDecoration: "none", color: 'black' }} >Create Category</Link>
        </Button>,
        <Button key="two" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/admin/create-product" style={{ textDecoration: "none", color: 'black' }}>Create Product</Link>
        </Button>,
        <Button key="three" sx={{ borderColor: 'black' }}>

            <Link to="/dashboard/admin/products" style={{ textDecoration: "none", color: 'black' }}>Products</Link>
        </Button>,
        <Button key="four" sx={{ borderColor: 'black' }}>
            <Link to="/dashboard/admin/users" style={{ textDecoration: "none", color: 'black' }}>Users</Link>
        </Button>

    ];

    const getAllCategories = async () => {
        const category = await axios.get("http://localhost:8080/api/v1/category/allCategories");
        setCategories(category.data.allCategories);
        console.log(category.data);
        console.log(categories)
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    //create category
    const handleNewCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:8080/api/v1/category/create-category`, { categoryName });
            if (data?.success) {
                toast.success(`${categoryName} is created`)
                getAllCategories();

            }

        } catch (error) {
            console.log("no")
        }


    }

    //delete category
    const deleteCategory = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/category/deleteCategory/${id}`);
            if (data.success) {
                toast.success("category deleted");
                getAllCategories();
            }
            else {
                toast.error(data.messsage);
            }
        } catch (error) {
            toast.error("Error in deleting")
            console.log(error)
        }

    }

    //update category 
    const updateCategory = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${id}`, { categoryName: updatedName });
            if (data.success) {
                toast.success("category updated ");
                getAllCategories();
                handleClose();
            }
        } catch (error) {
            toast.error("Error in updating")
            console.log(error)
        }
    }
    return (
        <div>
            <h1>ADMIN DASHBOARD</h1>
            <div className='admin-dashboard-container'>
                <div className='admin-menu'>
                    <ButtonGroup size="large" aria-label="Large button group"  >
                        {buttons}
                    </ButtonGroup>

                </div>
                <div className='create-category-details'>
                    <h3>CREATE CATEGORY</h3>
                    <div className='new-category'>
                        <form onSubmit={handleNewCategorySubmit}>
                            <Box sx={{ width: 500, maxWidth: '100%', margin: 2 }}>
                                <TextField fullWidth label="Enter New Category" id="fullWidth" onChange={(e) => { setCategoryName(e.target.value) }} />
                            </Box>

                            <Button variant='contained' size="small" type='submit' sx={{ height: 55 }}>Submit</Button>
                        </form>
                    </div>
                    <div className='category-table'>


                        <table>

                            {categories.map((e) => {
                                return <>
                                    <tr>
                                        <td key={e._id}>{e.categoryName} </td>
                                        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ marginLeft: 3 }}>
                                            <td><Button variant="contained" aria-label="Basic button group" onClick={() => {
                                                setOpen(true);
                                                setId(e._id);
                                            }}>Edit</Button></td>
                                            <td><Button variant="contained" aria-label="Basic button group" onClick={() => { deleteCategory(e._id) }}>delete</Button>
                                            </td>

                                        </ButtonGroup>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <form onSubmit={updateCategory}>
                                                <Box sx={style}>
                                                    <TextField fullWidth label="Enter New Category" id="fullWidth" onChange={(e) => { setupdatedName(e.target.value) }} />
                                                    <Button variant='contained' size="small" type='submit'>Submit</Button>

                                                </Box>
                                            </form>
                                        </Modal>

                                    </tr>

                                </>
                            })}
                        </table>
                    </div>


                </div>
            </div>
        </div>)
}

export default CreateCategory