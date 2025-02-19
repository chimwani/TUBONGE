import React, { useState } from 'react';
import { 
  HiOutlineUsers, 
  HiOutlineChatAlt2, 
  HiOutlineDocumentText,
  HiOutlineCash,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineCog,
  HiMenuAlt2
} from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Overview', href: '/admin', icon: HiOutlineChartBar },
    { name: 'Forums & Discussions', href: '/admin/forums', icon: HiOutlineChatAlt2 },
    { name: 'User Management', href: '/admin/users', icon: HiOutlineUsers },
    { name: 'Budget Transparency', href: '/admin/budget', icon: HiOutlineCash },
    { name: 'Legislative Documents', href: '/admin/documents', icon: HiOutlineDocumentText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
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
      <div className={`lg:pl-64 flex flex-col flex-1 transition-all duration-200 ${
        sidebarOpen ? '' : 'pl-0'
      }`}>
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 ${
                sidebarOpen ? 'hidden' : ''
              }`}
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>

            {/* Header actions */}
            <div className="flex items-center space-x-4 ml-auto">
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <HiOutlineBell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <HiOutlineCog className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;