import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import loginImage from "../components/login.jpg"; // Adjust path if necessary

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [role, setRole] = useState("Team Member"); // Default role
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      // Use the VITE_API_BASE_URL environment variable for the API URL
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, data);
      const token = response.data.token;

      // Decode the JWT token to get the user information
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);

      // Store the token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("name", decoded.name);

      // Check if the selected role matches the role in the token
      if (decoded.role !== role) {
        alert("Access denied: Insufficient permissions");
        return; // Stop the login process
      }

      alert("Login successful!");

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-end items-center min-h-screen"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-80 mr-80">
        <h1 className="absolute top-8 left-8 text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-green-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg transform transition-transform hover:scale-105">
          ZeroShield
        </h1>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to access your dashboard</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...register("password")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              id="role"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="CEO">CEO</option>
              <option value="Manager">Manager</option>
              <option value="Team Leader">Team Leader</option>
              <option value="Team Member">Team Member</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
