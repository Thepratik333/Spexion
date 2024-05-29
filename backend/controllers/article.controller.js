import express from 'express'
import { Article } from '../models/article.model.js'

const router = express.Router()

router.post("/create", async(req,res)=>{
    const {title, description, category} = req.body;
    const slug = Date.now()
    try {
        if(!title || !description || !category){
            return res.status(400).json({success: false, message: "Please fill all the fields."})
        }
        const article = await Article.create({
            title, description, category, slug
        })
        return res.status(200).json({success: true, message: "article created successfully", article})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
})

router.get("/get-articles", async(req,res)=>{
    try {
        const articles = await Article.find({})
        return res.status(200).json({success: true, message: "article created successfully", articles})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
})

router.post("/update-article/:slug", async(req,res)=>{
    const slug = req.params.slug
    const {title, description, category} = req.body;
    try {
       
        const article = await Article.findOne({slug})
        
        if(title) article.title = title
        if(description) article.description = description
        if(category) article.category = category
        await article.save()

        return res.status(200).json({success: true, message: "article updated successfully", article})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
})

router.delete("/delete-article/:slug", async(req,res)=>{
    const slug = req.params.slug
    try {
        const articles = await Article.findOneAndDelete({slug})
        return res.status(200).json({success: true, message: "article deleted successfully", articles})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
})

router.get("/search", async (req, res) => {
  const { search, startDate, endDate, sort } = req.query;

  let query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption.createdAt = 1; 
  } else if (sort === "dsc") {
    sortOption.createdAt = -1; 
  }

  try {
    const articles = await Article.find(query)
      .sort(sortOption)
      .select('title description category slug createdAt'); 

    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router