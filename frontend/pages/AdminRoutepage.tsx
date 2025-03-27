// src/pages/AdminRoutePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminRoutePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Access Portal</h1>
        
        <div className="space-y-4">
          <Link
            to="/admin"
            className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Enter Admin Dashboard
          </Link>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            Note: This is an unprotected admin access point
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutePage;