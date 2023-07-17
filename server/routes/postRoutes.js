import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import Post from '../mongodb/models/post.js'
// We will be using Cloudinary to store images
dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//GET ALL POSTS
router.route('/').get(async (req, res) => {
    try
    {
        // Retreiving all the posts
        const posts = await Post.find({});

        res.status(200).json({success:true,data:posts})
    }
    catch (error)
    {
        res.status(500).json({success:false,message:error})
    }

})

// CREATE A POST
router.route('/').post(async (req, res) => {
    // This method is used in real life application, we could have just stored the images url in 
    // base64 format but it works only for small number of images. As we scale, we 
    // have to provide storage to all those images

    try {
        const { name, prompt, photo } = req.body; //taking required data from frontend
        // uploading the photo to cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        // Creating a new post using the data to be stored in database

        
            const newPost = await Post.create({
                name,
                prompt,
                photo: photoUrl.url,
            });

            console.log(newPost)

            const post = await newPost.save();
       
        res.status(201).json({ success: true, data: newPost }) // sending Post to the frontend

    }
    catch (error) {
        res.status(500).json({ success: false, message: 'dikkat aa rhi ' })
    }



})


export default router;