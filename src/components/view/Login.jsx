import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from '../../assets/6333040.jpg'
import toast from "react-hot-toast";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/v1/user/signin", {
        email: loginData.email,
        password: loginData.password
      },{
        withCredentials: true
      });
      const json = response.data;
      if (response.status === 200) {
        // const username = json.username;
        localStorage.setItem('username', JSON.stringify(json));
        const name = JSON.parse(localStorage.getItem('username'));
        console.log(name);
        toast.success(`welcome ${name.username}`)
        navigate("/");
      } else {
        setError(json.msg);
      }
      setLoginData({ email: "", password: "" });
    } catch (error) {
      setError(error.response.data.msg);
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container flex justify-center items-center min-h-[43rem] bg-white">
    <img src={loginImage} className="h-[30rem]" alt="loginImage" />
      <div className="login-box bg-white ml-40 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <form className="login-form flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Please login to your account</p>
          <div className="input-group mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              placeholder="Email"
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              required
              autoComplete="on"
              className="p-3 rounded-lg border border-gray-300 w-full text-lg"
            />
          </div>
          <div className="input-group mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              placeholder="Password"
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              required
              autoComplete="current-password"
              className="p-3 rounded-lg border border-gray-300 w-full text-lg"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button className="bn632-hover bn24 py-3 px-6 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-semibold text-lg transition-all">
            Login
          </button>
          <div className="bottom-text flex flex-col items-center mt-6 text-gray-600">
            <p className="mb-2">
              Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">Sign Up</Link>
            </p>
            <p>
              <Link to="/" className="text-indigo-600 hover:text-indigo-800">Forgot password?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
