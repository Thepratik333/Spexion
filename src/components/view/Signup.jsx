import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupImage from '../../assets/5208993.jpg'
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ fullname: "", password: "", email: "", confirmPassword: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        setError("Password and Confirm password must be same")
    }else{
        try {
            const response = await axios.post("http://localhost:5001/api/v1/user/signup", {
              fullname: formData.fullname,
              email: formData.email,
              password: formData.password
            },{
              withCredentials: true
            });
            if (response.status === 200) {
                toast.success(response.data.msg)
              setFormData({ fullname: "", password: "", email: "", confirmPassword: "" });
              navigate("/signin");
            } else {
              setError("An error occurred. Please try again later.");
            }
          } catch (error) {
            setError(error.response.data.msg);
            console.error('Error:', error);
          }
    }
  };

  return (
    <div className='login-container flex justify-center items-center min-h-[43.5rem] bg-white'>
    <img src={SignupImage} className="h-[30rem] md:block hidden" alt="loginImage" />
      <div className="login-box bg-white md:ml-40 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <form className="login-form flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Welcome</h1>
          <p className="text-gray-600 mb-6">Please Signup to your account</p>
          <div className="input-group mb-4">
            <input
              onChange={e => setFormData({ ...formData, fullname: e.target.value })}
              value={formData.fullname}
              type="text"
              id="name"
              name="fullname"
              placeholder="Fullname"
              required
              className="p-3 rounded-lg border border-gray-300 w-full text-lg"
            />
          </div>
          <div className="input-group mb-4">
            <input
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className="p-3 rounded-lg border border-gray-300 w-full text-lg"
            />
          </div>
          <div className="input-group mb-4">
            <input
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              className="p-3 rounded-lg border border-gray-300 w-full text-lg"
            />
          </div>
          <div className="input-group mb-4">
            <input
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              value={formData.confirmPassword}
              type="password"
              id="cpassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              autoComplete="new-password"
              className="p-3 rounded-lg border border-gray-300 w-full text-lg"
            />
          </div>
          <p className="text-red-500 mb-4">{error}</p>
          <button className="bn632-hover bn24 py-3 px-6 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-semibold text-lg transition-all">
            Sign Up
          </button>
          <div className="bottom-text flex flex-col items-center mt-6 text-gray-600">
            <p>
              You have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-800">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
