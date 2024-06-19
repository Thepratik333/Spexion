import express from "express";
import { Post } from "../models/post.model.js";
import fs from 'fs'

const router = express.Router();

export const createPost = async (req, res) => {
  const user = req.user;
  const image = req.file ? req.file.filename : null;
  const { title, content, author } = req.body;
  console.log(title, content, author);

  try {
    if (!title || !content || !author) {
      return res.status(400).json({ success: false, message: "Please fill all the fields." });
    }

    const createPost = await Post.create({
      title,
      content,
      author,
      addedBy: user._id,
      image, 
    });

    return res.status(200).json({ success: true, message: "Post created successfully", createPost });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const Posts = await Post.find({});
    return res
      .status(200)
      .json({ success: true, message: "Post created successfully", Posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  const id = req.params.id;

  try {
    const singlePost = await Post.findById(id);
    if (!singlePost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Post fetched successfully", singlePost });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const AllUserPost = async (req, res) => {
  const id = req.user._id
// console.log(id);
  try {
    const allUserPost = await Post.find({addedBy:id});
    if (!allUserPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Post fetched successfully", allUserPost });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if(image && post.image) {
      // Deleting the old image file
      fs.unlink(`public/uploads/${post.image}`, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
    };

    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;
    if (image) post.image = image;

    await post.save();

    return res.status(200).json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deletePost = await Post.findById(id)
    if (!deletePost) {
      return res
      .status(404)
      .json({ success: false, message: "Post not found" });
    }
    await deletePost.deleteOne()
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully", deletePost });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default router;
