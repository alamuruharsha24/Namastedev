import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">NamasteDev</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/courses/javascript" className="text-gray-700 hover:text-purple-600">
              JavaScript
            </Link>
            <Link to="/courses/react" className="text-gray-700 hover:text-purple-600">
              React
            </Link>
            <Link to="/courses/node" className="text-gray-700 hover:text-purple-600">
              Node.js
            </Link>
            <Link to="/courses/system" className="text-gray-700 hover:text-purple-600">
              System Design
            </Link>
          </div>
          
          {/* Authentication Links */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-purple-600 hover:text-purple-700">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
