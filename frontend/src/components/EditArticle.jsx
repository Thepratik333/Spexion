import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

const EditArticleModal = ({ article }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedArticle, setEditedArticle] = useState({ ...article });

  const categories = ["Food", "Educations", "Businessmen", "Positions"];

  const handleChange = (e) => {
    setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated article:", editedArticle);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="text-blue-600 hover:text-blue-900">
        <HiOutlinePencilAlt className="h-5 w-5" aria-hidden="true" />
      </button>
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
                      <input type="text" id="title" name="title" value={editedArticle.title} onChange={handleChange} className="form-input rounded-md shadow-sm block w-full" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" value={editedArticle.description} onChange={handleChange} className="form-textarea rounded-md shadow-sm block w-full" rows="4"></textarea>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" name="category" value={editedArticle.category} onChange={handleChange} className="form-select rounded-md shadow-sm block w-full">
                      <option value="" disabled>Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
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
    </>
  );
};

export default EditArticleModal;
