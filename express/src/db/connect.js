import mongoose from 'mongoose';
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connection established");
    }catch(err){
        console.log("failed to connect to db", err.message);
    }
}
export default connectDb;