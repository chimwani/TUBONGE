import React, { useState, useEffect } from 'react';
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
} from 'react-icons/hi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Notification {
  _id: string;
  recipient: string;
  message: string;
  type: string;
  relatedIncident?: string;
  status: 'read' | 'unread';
  createdAt: string;
}

const PublicNotices = () => {
  const [activeTab, setActiveTab] = useState('unread');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notifications');
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch notifications');
      setLoading(false);
      console.error('Fetch error:', error);
    }
  };

  // Handle creating a new notification with default values
  const handleCreateNotification = async () => {
    const newNotification = {
      recipient: 'All Users', // Default value
      message: 'A new public notice has been issued.',
      type: 'New Incident',
      relatedIncident: '', // Optional, left empty
      status: 'unread',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/notifications', newNotification);
      setNotifications([response.data, ...notifications]);
      toast.success('Notification created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create notification');
      console.error('Create error:', error.response || error);
    }
  };

  // Handle deleting a notification
  const handleDeleteNotification = async (notificationId: string) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`);
        setNotifications(notifications.filter((n) => n._id !== notificationId));
        toast.success('Notification deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete notification');
        console.error('Delete error:', error);
      }
    }
  };

  // Filter notifications based on tab and search term
  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab = activeTab === 'all' || notification.status === activeTab;
    const matchesSearch =
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Public Notices</h1>
        <p className="text-sm text-gray-500">Manage and track all notifications</p>
      </div>

      {/* Filters, Search, and Create Button */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Tabs */}
          <div className="flex space-x-4">
            {['unread', 'read', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'all' ? 'All Notifications' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search and Create */}
          <div className="flex flex-col gap-3 w-full sm:w-64">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Search notifications..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              onClick={handleCreateNotification}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <HiOutlinePlus className="mr-2 h-5 w-5" />
              Create Notification
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-6">Loading notifications...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Recipient', 'Message', 'Type', 'Related Incident', 'Status', 'Created At', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-3 text-${
                        header === 'Actions' ? 'right' : 'left'
                      } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <tr key={notification._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {notification.recipient}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{notification.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {notification.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {notification.relatedIncident || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            notification.status === 'unread'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {notification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => toast.info('Edit functionality not implemented yet')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <HiOutlinePencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <HiOutlineTrash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No notifications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PublicNotices;