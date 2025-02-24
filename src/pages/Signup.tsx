import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Add signup logic here
    console.log('Signup submitted:', { name, email, password });
  };

  const handleGoogleSignup = () => {
    // Implement Google signup
    console.log('Google signup');
  };

  const handleGithubSignup = () => {
    // Implement GitHub signup
    console.log('GitHub signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 shadow-xl mx-4"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-1">Create Account</h2>
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</Link>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <motion.button
            onClick={handleGoogleSignup}
            whileHover={{ y: -1 }}
            className="flex items-center justify-center gap-1.5 bg-gray-700/50 border border-gray-600 rounded-lg py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <FaGoogle className="text-base text-red-400" />
            <span>Google</span>
          </motion.button>

          <motion.button
            onClick={handleGithubSignup}
            whileHover={{ y: -1 }}
            className="flex items-center justify-center gap-1.5 bg-gray-700/50 border border-gray-600 rounded-lg py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <FaGithub className="text-base text-gray-100" />
            <span>GitHub</span>
          </motion.button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-gray-800 text-gray-400 text-sm">Or continue with</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400 text-gray-100 transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400 text-gray-100 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400 text-gray-100 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400 text-gray-100 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:shadow transition-all"
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;