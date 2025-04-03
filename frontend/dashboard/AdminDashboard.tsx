import React, { useState } from 'react';
import {
  HiOutlineUsers,
  HiOutlineChatAlt2,
  HiMenuAlt2,
  HiOutlineChartBar,
} from 'react-icons/hi';
import { BarChart, Bell } from 'lucide-react'; // Using BarChart for Polls
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Overview', href: '/admin', icon: HiOutlineChartBar },
    { name: 'Forums & Discussions', href: '/admin/forums', icon: HiOutlineChatAlt2 },
    { name: 'User Management', href: '/admin/users', icon: HiOutlineUsers },
    { name: 'Polls', href: '/admin/polls', icon: BarChart }, // Using BarChart from lucide-react
    { name: 'Public Notices', href: '/admin/notices', icon: Bell },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex">
        <div
          className={`fixed lg:relative w-64 bg-gradient-to-b from-gray-800 to-gray-700 shadow-xl transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 z-10`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
              <div className="flex items-center">
                <span className="ml-2 text-xl font-semibold text-white">Admin Panel</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <HiMenuAlt2 className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white group transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
                  <span className="text-sm font-medium">AU</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-400">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>
          </div>
          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;