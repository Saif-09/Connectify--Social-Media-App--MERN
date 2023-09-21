import mongoose from "mongoose";
import dotenv from "dotenv";

const dbConnection  = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology : true ,
        });
        console.log("Db Connected")
        
    } catch (error) {
        console.log("Error in connecting DB"+error)
    }
}

export default dbConnection;