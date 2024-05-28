import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import { deleteArticle, updateArticle } from "../store/ArticleSlice";

const ArticleBox = ({ title, description, category, slug }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedArticle, setEditedArticle] = useState({ title, description, category });

  const handleChange = (e) => {
    setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateArticle({ slug, ...editedArticle })); 
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteArticle(slug)); 
  };

  return (
    <div className="bg-white shadow-md rounded-lg mt-4 overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
            <p className="text-gray-600 text-sm mt-2">Category: {category}</p>
          </div>
          <div className="flex">
            <button onClick={() => setShowModal(true)} className="text-gray-600 hover:text-gray-800" title="Edit">
              <HiOutlinePencilAlt className="w-6 h-6" />
            </button>
            <button onClick={handleDelete} className="text-gray-600 hover:text-gray-800" title="Delete">
              <HiTrash className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" id="title" name="title" value={editedArticle.title} onChange={handleChange} className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" value={editedArticle.description} onChange={handleChange} className="form-textarea rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" rows="4"></textarea>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input id="category" name="category" value={editedArticle.category} onChange={handleChange} className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]" />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save Changes
                  </button>
                  <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleBox;
