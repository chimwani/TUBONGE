import React, { useState } from 'react';
import {
  HiOutlineUsers,
  HiOutlineChatAlt2,
  HiOutlineDocumentText,
  HiOutlineCash,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineCog,
  HiMenuAlt2,
} from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Overview', href: '/admin', icon: HiOutlineChartBar },
    { name: 'Forums & Discussions', href: '/admin/forums', icon: HiOutlineChatAlt2 },
    { name: 'User Management', href: '/admin/users', icon: HiOutlineUsers },
    { name: 'Budget Transparency', href: '/admin/budget', icon: HiOutlineCash },
    { name: 'Legislative Documents', href: '/admin/documents', icon: HiOutlineDocumentText },
    { name: 'Public Notices', href: '/admin/notices', icon: HiOutlineBell },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div
          className={`fixed lg:relative w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Admin Panel</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              >
                <HiMenuAlt2 className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 group transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/avatar-placeholder.png"
                  alt="Admin avatar"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile sidebar toggle button */}
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>
          </div>

          {/* Page content */}
          <main className="flex-1 p-6 bg-gray-100">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;