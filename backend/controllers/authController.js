import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import productModel from "../models/productModel.js";

export const registerController = async (req, res) => {
    try {
        const { username, email, password, number, address, answer, role } = req.body
        //validation
        if (!username) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "email is required" })
        }
        if (!number) {
            return res.send({ message: "phone number is required" })
        }
        if (!password) {
            return res.send({ message: "password is required" })
        }
        if (!address) {
            return res.send({ message: "address is required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is required" })
        }
        if (!role) {
            return res.send({ message: "Role is required" })
        }

        //check user 
        const exisitinguser = await userModel.findOne({ email })

        //existing user 
        if (exisitinguser) {
            return res.send(200).send({
                success: false,
                message: "Already registered, please login"
            })
        }


        const user = new userModel({ username, email, password, number, address, answer, role }).save();
        console.log(user);
        res.status(201).send({
            success: true,
            message: "user registered successfuly",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: "Error in registeration",
                error
            }
        )
    }
};

// login controller
export const loginController = async (req, res) => {
    const tok = process.env.JWT_SECRET_TOKEN;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        //check user

        const user = await userModel.findOne({ email }).exec();
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        const match = await userModel.findOne({ password });
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Password in not registered"
            })
        }

        //token
        const token = await jwt.sign({ _id: user._id }, tok, {
            expiresIn: "7d",
        });
        console.log(token);
        return res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }


}
//test
export const testController = (req, res) => {
    res.send("protected route");
}

//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({
                message: "Email is required"
            })
        }
        if (!answer) {
            res.status(400).send({
                message: "Answer is required"
            })
        }
        if (!newPassword) {
            res.status(400).send({
                message: "New Password is required"
            })
        }
        //check
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            })
        }
        await userModel.findOneAndUpdate(user.email, { password: newPassword });
        res.status(200).send({
            success: true,
            message: "Password changed successfuly"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error

        })
    }

};
// Function to verify JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    } catch (error) {
        return null;
    }
};

//cart-item controller
export const cartitemController = async (req, res) => {
    try {
        const { token, cartItems } = req.body;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token. Please log in again."
            });
        }

        const userId = decodedToken._id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Iterate through the cart items sent in the request
        for (const item of cartItems) {
            const product = await productModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found.`
                });
            }

            // Check if the product is already in the user's cart
            const existingCartItem = user.cartItems.find(cartItem => cartItem.productId.toString() === item.productId);

            if (existingCartItem) {
                // If exists, return an error
                return res.status(400).json({
                    success: false,
                    message: `Product with ID ${item.productId} is already in the cart.`
                });
            } else {
                // Otherwise, add new item
                user.cartItems.push({ productId: item.productId, quantity: item.quantity });
            }
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({
            success: true,
            message: "Cart items saved successfully",
            cartItems: user.cartItems
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};

// Get all cart items for a user
export const getAllCartItems = async (req, res) => {
    try {
        // Extract token from the authorization header
        const token = req.headers.authorization; // Remove 'Bearer ' prefix if present
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify the token
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        const userId = decodedToken._id;

        // Find user and populate cart items
        const user = await userModel.findById(userId).populate({
            path: 'cartItems.productId',
            model: 'Product' // Ensure the correct model name is used here
        });

        // Debug log to check user data
        console.log('Fetched user:', user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            cartItems: user.cartItems
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Increment quantity
export const incrementCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartItem = user.cartItems.find(item => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        cartItem.quantity += 1;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Quantity increased",
            cartItems: user.cartItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error incrementing quantity", error });
    }
};

// Decrement quantity
export const decrementCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find the cart item
        const cartItem = user.cartItems.find(item => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        // Decrement the quantity
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            user.cartItems = user.cartItems.filter(item => item.productId.toString() !== productId);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Quantity decreased",
            cartItems: user.cartItems
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error decrementing quantity", error });
    }
};

//deleting cart item 
export const deleteCartItemController = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the cart item index with the given productId
        const itemIndex = user.cartItems.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        // Remove the item from the cart
        user.cartItems.splice(itemIndex, 1);

        // Save the updated user document
        await user.save();

        return res.status(200).json({ success: true, message: 'Item removed from cart', cartItems: user.cartItems });
    } catch (error) {
        console.error('Error removing cart item:', error);
        return res.status(500).json({ success: false, message: 'Failed to remove item from cart', error });
    }
};


export const wishListController = async (req, res) => {
    try {
        const { token, wishListItems } = req.body;

        // Verify token and get user ID
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token. Please log in again."
            });
        }

        const userId = decodedToken._id;

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        for (const item of wishListItems) {
            const product = await productModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found.`
                });
            }

            const existingWishListItem = user.wishListItems.find(
                wishlistItem => wishlistItem.productId.toString() === item.productId
            );

            if (existingWishListItem) {
                // If item exists, remove it from the wishlist
                user.wishListItems = user.wishListItems.filter(
                    wishlistItem => wishlistItem.productId.toString() !== item.productId
                );
            } else {
                // Otherwise, add it to the wishlist
                user.wishListItems.push({ productId: item.productId });
            }
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({
            success: true,
            message: "Wishlist updated successfully",
            wishListItems: user.wishListItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};

export const getAllWishListItems = async (req, res) => {
    try {
        // Extract token from the authorization header
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify the token
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        const userId = decodedToken._id;

        // Find user and populate cart items
        const user = await userModel.findById(userId).populate({
            path: 'wishListItems.productId',
            model: 'Product'
        });



        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Wish List items fetched successfully",
            wishListItems: user.wishListItems
        });
    } catch (error) {
        console.error('Error fetching wish list items:', error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const deleteWishListItemController = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the wish list item index with the given productId
        const itemIndex = user.wishListItems.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Product not found in wish list' });
        }

        // Remove the item from the wish list
        user.wishListItems.splice(itemIndex, 1);

        // Save the updated user document
        await user.save();

        return res.status(200).json({ success: true, message: 'Item removed from wish list', wishListItems: user.wishListItems });
    } catch (error) {
        console.error('Error removing wishlist item:', error);
        return res.status(500).json({ success: false, message: 'Failed to remove item from wish list', error });
    }
};