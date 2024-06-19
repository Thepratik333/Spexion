import React, { useEffect, useState, useCallback } from 'react';
import logo from '../../assets/10991749.jpg';
import axios from 'axios';
import UserPostCard from '../Cards/UserPostCard';

function MyPost() {
    const [AllPosts, setAllPosts] = useState([]);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/v1/posts/all-post", {
                withCredentials: true
            });
            const { allUserPost } = response.data;
            setAllPosts(allUserPost);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-white">
            <img src={logo} alt="home" className="w-full max-w-lg  rounded-lg  mb-8" />
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 d">
                    My Posts
                </h1>
            </div>
            <div className="w-full max-w-7xl mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {AllPosts && AllPosts.length > 0 && AllPosts.map((post, index) => (
                    <div key={index}>
                        <UserPostCard
                            image={post.image}
                            title={post.title}
                            description={post.content}
                            author={post.author}
                            postId={post._id}
                            fetchPosts={fetchPosts}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPost;
