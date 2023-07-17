import mongoose, { model, mongo } from "mongoose";

// First Create a Schema
const Post = new mongoose.Schema({
    name:{type:String,
    required:true},
    prompt:{type: String, required:true},
    photo:{type:String,required:true},
});

// Create a Model
const PostSchema = mongoose.model('Post',Post);

export default PostSchema; 

