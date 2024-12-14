import mongoose from "mongoose"
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectToDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }
    catch(error){
        console.log(error)
    }
}

export default connectToDatabase;