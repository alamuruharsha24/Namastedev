import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted:', { email, password });
  };

  const handleGoogleLogin = () => {
    // Implement Google login
    console.log('Google login');
  };

  const handleGithubLogin = () => {
    // Implement GitHub login
    console.log('GitHub login');
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
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-400">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400 text-gray-100 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-400 text-gray-100 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-3.5 w-3.5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-400">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300">Forgot password?</Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:shadow transition-all"
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-800 text-gray-400 text-sm">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={handleGoogleLogin}
              whileHover={{ y: -1 }}
              className="flex items-center justify-center gap-1.5 bg-gray-700/50 border border-gray-600 rounded-lg py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <FaGoogle className="text-base text-red-400" />
              <span>Google</span>
            </motion.button>

            <motion.button
              onClick={handleGithubLogin}
              whileHover={{ y: -1 }}
              className="flex items-center justify-center gap-1.5 bg-gray-700/50 border border-gray-600 rounded-lg py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="text-base text-gray-100" />
              <span>GitHub</span>
            </motion.button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;