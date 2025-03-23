import express from 'express';
import cloudinary from '../lib/cloudinary';
import book from '../models/Book.js';


const router = express.Router();

//create new book
router.post('/',protectRoute, async (req, res) => {
   try {
        const {title,caption,rating,image} = req.body;
        if(!title || !caption || !rating || !image) return res.status(400).json({message:"Please provide all the fields"});

      //upload image:
      const uploadResponse= await cloudinary.uploader.upload(image);
      const imageUrl= uploadResponse.secure_url;

      //save to db
      const newBook = new book({
         title,
         caption,
         rating,
         image:imageUrl,
         // user: req.user_id,
      });

      await newBook.save();
      res.status(201).json({newBook});

   } catch (error) {
      console.log(error,"Error creating book");
     return res.status(500).json({message: error.message});
   } 
});

export default router;
