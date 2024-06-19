import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:5001/api/v1/user/signout", {
        withCredentials: true,
      });
      localStorage.removeItem("username");
      navigate("/signin");
      toast.success("User Logout successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-[#385A64] py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white ml-4 text-2xl font-bold">
          Article Hub
        </Link>
        <div>
          <Link
            to="/"
            className="bg-gray-700 mr-4 text-white py-2 px-4 rounded-lg"
          >
            Home
          </Link>
          {localStorage.getItem("username") ? (
            <Link
              to="/article"
              className="bg-gray-700 mr-4 text-white py-2 px-4 rounded-lg"
            >
              Add Article
            </Link>
          ) : (
            ""
          )}

          {localStorage.getItem("username") ? (
            <Link
              to="/my-articles"
              className="bg-gray-700 mr-4 text-white py-2 px-4 rounded-lg"
            >
              My Post
            </Link>
          ) : (
            ""
          )}

          {localStorage.getItem("username") ? (
            <button
              onClick={logoutHandler}
              className="bg-gray-700 mr-4 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="bg-gray-700 mr-4 text-white py-2 px-4 rounded-lg"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
