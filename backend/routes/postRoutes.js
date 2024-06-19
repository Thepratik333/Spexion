import express from 'express'
import { AllUserPost, createPost, deletePost, getPosts, getSinglePost, updatePost } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post("/create", verifyToken, upload.single("image") ,createPost)
router.get("/get-posts",getPosts)
router.get("/all-post",verifyToken,AllUserPost)
router.get("/get-post/:id", verifyToken, getSinglePost);
router.put("/update-post/:id",upload.single("image"),verifyToken,updatePost)
router.delete("/delete-Post/:id",verifyToken,deletePost)


export default router