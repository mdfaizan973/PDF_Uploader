import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { FaHome, FaUser } from "react-icons/fa";
import { API_KEY, baseUrl } from "../configs/config";
import Nav from "./Nav";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      copypass: password,
      role_id: 5,
      gender,
      limits: 20,
    };
    try {
      await axios.post(`${baseUrl}/users/register`, userData, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      alert("Registration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      alert("Registration failed");
    }
  };

  const handleGoLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <span
          className="flex items-center underline cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHome className="mr-2" /> Home
        </span>
        <div className="flex items-center justify-center ">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-1">
                Join us by filling out the form below
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <FiLock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender*
                </label>
                <div className="relative">
                  {/* Icon */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <FaUser className="h-5 w-5" />
                  </div>
                  {/* Select Dropdown */}
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-700 appearance-none"
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <FiUserPlus className="mr-2 h-5 w-5" />
                Register
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={handleGoLogin}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
