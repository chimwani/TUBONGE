import React from 'react';
import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      // Placeholder for actual login logic
      alert(`Logging in with username: ${username}`);
      setUsername('');
      setPassword('');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header - Centered */}
          <div className="p-6 pb-0 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-500 text-sm mt-1">Access your civic engagement account.</p>
          </div>
          
          {/* Login Form */}
          <div className="p-6">
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
              >
                Login
              </button>
            </form>
            
            {/* Additional Links */}
            <div className="mt-6 text-center text-sm">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition duration-200"
                onClick={() => alert('Forgot Password functionality TBD')}
              >
                Forgot Password?
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}