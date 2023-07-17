import mongoose, { mongo } from "mongoose";

const connectDB =(url)=>{
    mongoose.set('strictQuery',true); // useful for search query in mongodb
    
    mongoose.connect(url)
    .then(console.log('MongoDB connected'))
    .catch((err) => console.log(err));
}

export default connectDB;