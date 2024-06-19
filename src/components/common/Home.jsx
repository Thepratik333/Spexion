import React, { useEffect, useState } from 'react';
import home from '../../assets/5396346.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostCard from '../Cards/PostCard';

function Home() {
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/v1/posts/get-posts", {
                    withCredentials: true
                });
                const { Posts } = response.data; 
                setAllPosts(Posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts(); 
    }, []); 

    return (
        <div className="flex flex-col items-center min-h-screen bg-white">
            <img src={home} alt="home" className="w-full max-w-3xl rounded-lg  mb-8" />
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-md">
                    All Blog Posts
                </h1>
            </div>
            <div className="w-full max-w-7xl grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allPosts.map((post, index) => (
                    <div key={index}>
                        <PostCard
                            image={post.image} 
                            title={post.title} 
                            description={post.content} 
                            author={post.author} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
