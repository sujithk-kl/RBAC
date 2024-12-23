import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../components/image.jpg'; // Import the image

const HomePage = () => {
  return (
    <div 
      className="relative flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set the background image dynamically
    >
      {/* Company logo positioned in the top-left corner */}
      <h1 className="absolute top-8 left-8 text-6xl font-extrabold text-white bg-gradient-to-r from-blue-500 via-green-500 to-indigo-500 bg-clip-text text-transparent">
        ZeroShield
      </h1>

      {/* Buttons in the top-right corner */}
      <div className="absolute top-8 right-8 space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transform hover:bg-blue-600 hover:scale-105 transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transform hover:bg-green-600 hover:scale-105 transition-all duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
