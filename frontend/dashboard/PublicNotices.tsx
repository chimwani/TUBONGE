import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

const PublicNotices = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

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

  // Handle creating a new notification
  const handleCreateNotification = async () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    const newNotification = { message };

    try {
      const response = await axios.post('http://localhost:5000/api/notifications', newNotification);
      setNotifications([response.data, ...notifications]);
      toast.success('Notification created successfully!');
      setMessage(''); // Clear the input
      setIsModalOpen(false); // Close the modal
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

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Public Notices</h1>
        <p className="text-sm text-gray-500">Manage and track all notifications</p>
      </div>

      {/* Search and Create Button */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Search */}
          <div className="relative rounded-md shadow-sm w-full sm:w-64">
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

          {/* Create Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <HiOutlinePlus className="mr-2 h-5 w-5" />
            Create Notification
          </button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <tr key={notification._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 break-words max-w-2xl">
                          {notification.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No notifications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Creating Notification */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Notification</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-y h-32"
                  placeholder="Enter your notification message here..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setMessage('');
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNotification}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

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