import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected to db`.bgMagenta.white);
    } catch (error) {
        console.log(`error in mongodb ${error}`);
    }
}

export default connectDB;