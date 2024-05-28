import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const articlePath = location.pathname.startsWith("/articles")
    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center">

                <Link to="/" className="text-white text-2xl font-bold">
                    Article Hub
                </Link>

                {
                    articlePath ? (
                      
                        <Link to="/" className="bg-gray-700 text-white py-2 px-4 rounded-lg">
                        Add Article
                    </Link>
                    ) :  <Link to="/articles" className="bg-gray-700 text-white py-2 px-4 rounded-lg">
                    Articles
                </Link>
                }

            </div>
        </nav>
    );
};

export default Navbar;
