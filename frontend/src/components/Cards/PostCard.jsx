import React from 'react';

const PostCard = ({ image, title, description, author }) => {
    const src = `http://localhost:5001/uploads/${image}`;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={src} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <p className="text-gray-700 mb-4">{description}</p>
                <p className="text-gray-500 text-sm">Written by {author}</p>
            </div>
        </div>
    );
};

export default PostCard;
