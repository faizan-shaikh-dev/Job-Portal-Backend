import mongoose from "mongoose";



const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connection successfull');
        
    } catch (error) {
        console.error('DataBase Connection error');
        process.exit(1);
        
    }
}

export default connectDB;