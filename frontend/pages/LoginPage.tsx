import React from 'react';
import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
    <div className="">
        <Header />
        <div className='flex items-center justify-center p-6'>
      <div className="max-w-md w-full bg-white  rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-300 text-sm mt-1">Access your civic engagement account.</p>
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
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
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
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
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
          <div className="mt-4 text-center text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
              onClick={() => alert('Forgot Password functionality TBD')}
            >
              Forgot Password?
            </a>
            <span className="mx-2 text-gray-400">|</span>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
              onClick={() => alert('Sign Up functionality TBD')}
            >
              Don’t have an account? Sign Up
            </a>
          </div>
        </div>

        
      </div>
      </div>
      <Footer />
    </div>
  );
}