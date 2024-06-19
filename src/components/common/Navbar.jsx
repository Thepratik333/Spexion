import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#385A64] py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white text-2xl font-bold">
          Article Hub
        </Link>
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto transition-all duration-300 ease-in-out`}
        >
          <Link
            to="/"
            className="block w-[90px] md:w-0 bg-gray-700 md:mr-4 text-white py-2 px-4 rounded-lg mt-2 md:mt-0"
            onClick={toggleMenu}
          >
            Home
          </Link>
          {localStorage.getItem("username") ? (
            <>
              <Link
                to="/article"
                className="block w-[120px] md:w-0 bg-gray-700 md:mr-4 text-white py-2 px-4 rounded-lg mt-2 md:mt-0"
                onClick={toggleMenu}
              >
                Add Article
              </Link>
              <Link
                to="/my-articles"
                className="block w-[90px] md:w-0 bg-gray-700 md:mr-4 text-white py-2 px-4 rounded-lg mt-2 md:mt-0"
                onClick={toggleMenu}
              >
                My Post
              </Link>
              <button
                onClick={logoutHandler}
                className="block bg-gray-700 md:mr-4 text-white py-2 px-4 rounded-lg mt-2 md:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="block bg-gray-700 md:mr-4 text-white py-2 px-4 rounded-lg mt-2 md:mt-0"
              onClick={toggleMenu}
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
