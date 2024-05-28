import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "../store/ArticleSlice";
import axios from "axios";

function Article() {
  const dispatch = useDispatch();
  const [article, setArticle] = useState({ title: "", description: "", category: "" });

  const categories = ["Food", "Educations", "Businessmen", "Positions"];

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/v1/article/create", {
        title: article.title,
        description: article.description,
        category: article.category
      });

      console.log(response);
      dispatch(addArticle(response.data.article));

      setArticle({ title: "", description: "", category: "" });

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-8 px-4 max-w-lg">
      <h3 className="text-3xl font-bold mb-6 text-center">Add an Article</h3>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input type="text" id="title" name="title" value={article.title} onChange={handleChange} className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" placeholder="Enter title" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea id="description" name="description" value={article.description} onChange={handleChange} className="form-textarea rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" placeholder="Enter description"></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select id="category" name="category" value={article.category} onChange={handleChange} className="form-select rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]">
            <option value="" disabled>Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={!article.title || !article.description || !article.category}>Add Article</button>
        </div>
      </form>
    </div>
  );
}

export default Article;
