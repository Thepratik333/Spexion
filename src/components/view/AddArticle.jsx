import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState({ title: "", content: "", author: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate()

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", article.title);
      formData.append("content", article.content);
      formData.append("author", article.author);
      if (image) {
        formData.append("image", image); 
      }
  
      const response = await axios.post("http://localhost:5001/api/v1/posts/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      setArticle({ title: "", content: "", author: "" });
      setImage(null);
      setImagePreview("");

      navigate("/")
  
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="container mx-auto my-8 px-4 max-w-lg">
      <h3 className="text-3xl font-bold mb-6 text-center">Add an Article</h3>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" placeholder="Enter title" />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea id="content" name="content" value={article.content} onChange={handleChange} className="form-textarea rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" placeholder="Enter content"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
          <input type="text" id="author" name="author" value={article.author} onChange={handleChange} className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" placeholder="Enter author" />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" />
        </div>
        {imagePreview && (
          <div className="mb-6">
            <img src={imagePreview} alt="Preview" name="photo" className="w-full h-auto rounded-md shadow-sm" />
          </div>
        )}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={!article.title || !article.content || !article.author}>Add Article</button>
        </div>
      </form>
    </div>
  );
}

export default Article;
