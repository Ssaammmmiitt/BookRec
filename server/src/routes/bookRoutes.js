import express from "express";
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/auth.middleware.js";
import book from "../models/Book.js";

const router = express.Router();

//create new book
router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image)
      return res.status(400).json({ message: "Please provide all the fields" });

    //upload image:
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    //save to db
    const newBook = new book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();
    res.status(201).json({ newBook });
  } catch (error) {
    console.log(error, "Error creating book");
    return res.status(500).json({ message: error.message });
  }
});

//get all books
router.get("/", protectRoute, async (req, res) => {
  try {
    //pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;

    const books = await book
      .find()
      .sort({ createdAt: -1 }) //descending order
      .skip(skip)
      .limit(limit)
      .populate("user", "username profilePic");

    const totalBooks = await book.countDocuments();
    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error getting books", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

// get recommended books by the user
router.get("/user", protectRoute, async (req, res)=>{
      try{
         const books = await book.find({user:req.user._id}).sort({createdAt:-1});
         res.status(200).json(books);
      }
      catch(error){
         console.log("Error getting books",error);
         return res.status(500).json({message:"Internal Server error"});
      }
})

//delete endpoint
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    //find book
    const bookFound = await book.findById(req.params.id);
    if (!bookFound) return res.status(404).json({ message: "Book not found" });

    //check if user is the owner of the book
    if (bookFound.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    //delete image from cloudinary
    if (bookFound.image && bookFound.image.includes("cloudinary")) {
      try {
        const imagePublicId = bookFound.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imagePublicId);
      } catch (deleteError) {
        console.log("Error deleting image", deleteError);
      }
    }
    await bookFound.deleteOne();

    return res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    console.log("Error deleting book", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});
export default router;
