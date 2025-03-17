import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { login } from "../assets/Images";
import * as apiCalls from "../api/apiServices.jsx"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Modal from "react-modal";
import {requestPasswordReset} from '../api/apiServices.jsx';




export default function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const navigate = useNavigate()
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  // const registerUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await apiCalls.userLogin(user);
  //     if(data.status == 200) // Correctly passing the 'user' object
  //     toast.success("Login Successful!");
  //     localStorage.setItem("authToken", data.token);
  //     localStorage.setItem("userData", JSON.stringify({ role: data.user.role ,name:data.user.name ,id:data.user.id}));
  //     navigate("/")
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Login failed:", error.message || error);
  //     alert(data.message)
  //     navigate("/Signup")
  //   }
  // };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const data = await apiCalls.userLogin(user);
      console.log(data)
      if (data.status) {
        toast.success("Login Successful!");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify({ role: data.user.role, name: data.user.name, id: data.user.id }));
        setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
        }, 1000);
      }else{
        toast.error(data.message)}
    } catch (error) {
      console.error("Login failed:", error.message || error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      navigate("/Signup", { replace: true });
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message || "If an account with that email exists, a reset link has been sent.");
      setIsModalOpen(false); // Close modal after submitting
    } catch (error) {
      setMessage(error); // Display error message if request fails
    }
  };

  return (
      <div className="flex w-full flex-wrap justify-center bg-fuchsia-900">
        <div className="pointer-events-none hidden select-none shadow-2xl md:block md:w-1/2 lg:w-1/2 rounded-tl-2xl rounded-bl-2xl mt-24 h-[70%]">
          <img className=" w-full object-cover opacity-90  rounded-tl-3xl rounded-bl-3xl" src={login} />
        </div>
        <div className="flex w-full flex-col md:w-1/2 lg:w-1/3 mt-24 shadow- bg-fuchsia-50 rounded-tr-3xl rounded-br-3xl h-[50%]">
          <div className="my-auto flex flex-col justify-center p-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12 mt-2">
            <p className="text-center text-3xl font-bold">Welcome</p>
            <p className=" text-center">Login to access your account.</p>
            <form method="POST"
              onSubmit={(e) => {
                registerUser(e);
              }} className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <MdEmail />
                  </span>
                  <input type="email" id="email" name="email" value={user.email} onChange={handleChange}
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none" placeholder="Email" />
                </div>
              </div>
              <div className="mb-7 flex flex-col pt-4 ">
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <FaUnlock />
                  </span>
                  <input 
                  type={showPassword ? "text" : "password"} // Toggle type
                  id="password"  name="password"  value={user.password} onChange={handleChange}
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none" placeholder="Password" />
                     <button
        type="button"
        onClick={() => setShowPassword(!showPassword)} // Toggle state
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
                </div>
              </div>
              <button type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2">
                <span className="w-full"> Submit </span>
              </button>
            </form>
            <div className="pt-12 text-center">
              <p className="whitespace-nowrap">
                Don't have an account?
                <a href="Signup" className="font-semibold underline"> Register here. </a>
              </p>
              <p className="">
                <button
                onClick={() => setIsModalOpen(true)}
    className="text-blue-600 font-semibold">
      Forgot Password?
    </button>
    <ToastContainer position="top-right" autoClose={2000} />
  </p>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <p className="text-xl font-semibold mb-4">Enter your Registred Email, and we'll send You a Password Reset Link.
              </p>
              <form onSubmit={handleRequestReset}>
              <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex justify-end space-x-2">
                  {/* Close Modal */}
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  {/* Submit Email */}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
}