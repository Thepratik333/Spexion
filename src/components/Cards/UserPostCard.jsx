import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const UserPostCard = ({ image, title, description, author, postId, fetchPosts }) => {
    const [showModal, setShowModal] = useState(false);
    const [editedArticle, setEditedArticle] = useState({
        title,
        description,
        author
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const src = `http://localhost:5001/uploads/${image}`;

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/v1/posts/delete-post/${postId}`, {
                withCredentials: true
            });
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.set('title', editedArticle.title);
            formData.set('description', editedArticle.description);
            formData.set('author', editedArticle.author);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            await axios.put(`http://localhost:5001/api/v1/posts/update-post/${postId}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowModal(false);
            fetchPosts();
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedArticle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={src} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Edit Post"
                        >
                            <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Delete Post"
                        >
                            <FaTrash className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{description}</p>
                <p className="text-gray-500 text-sm">Written by {author}</p>
            </div>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={editedArticle.title}
                                            onChange={handleChange}
                                            className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={editedArticle.description}
                                        onChange={handleChange}
                                        className="form-textarea rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={editedArticle.author}
                                        onChange={handleChange}
                                        className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                                    />
                                </div>
                                {imagePreview && (
                                    <div className="mt-4">
                                        <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-md shadow-sm" />
                                    </div>
                                )}
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
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

export default UserPostCard;
