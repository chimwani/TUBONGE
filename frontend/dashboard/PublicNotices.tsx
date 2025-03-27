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
import CreateNoticeModal from '../dashboard/modals/CreateNoticeModal';
import EditNoticeModal from '../dashboard/modals/EditNoticeModal';

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const notificationTypes = ['New Incident', 'Incident Update', 'System Alert', 'Other'];

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
    }
  };

  const handleCreateNotification = async (notificationData: {
    recipient: string;
    message: string;
    type: string;
    relatedIncident?: string;
  }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notifications', {
        ...notificationData,
        status: 'unread',
      });
      setNotifications([response.data, ...notifications]);
      toast.success('Notification created successfully!');
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create notification');
      console.error('Error:', error.response);
    }
  };

  const handleEditNotification = async (notificationData: Partial<Notification>) => {
    if (!selectedNotification) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/notifications/${selectedNotification._id}`,
        notificationData
      );
      setNotifications(
        notifications.map((notification) =>
          notification._id === selectedNotification._id ? response.data : notification
        )
      );
      toast.success('Notification updated successfully!');
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`);
        setNotifications(notifications.filter((notification) => notification._id !== notificationId));
        toast.success('Notification deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete notification');
      }
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab = activeTab === 'all' || notification.status === activeTab;
    const matchesSearch =
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return <div className="text-center py-6">Loading notifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Public Notices</h1>
            <p className="text-sm text-gray-500">Manage and track all notifications</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <HiOutlinePlus className="mr-2 h-5 w-5" />
            Create Notification
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
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
          <div className="mt-3 sm:mt-0">
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
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Recipient',
                  'Message',
                  'Type',
                  'Related Incident',
                  'Status',
                  'Created At',
                  'Actions',
                ].map((header) => (
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
                        onClick={() => {
                          setSelectedNotification(notification);
                          setIsEditModalOpen(true);
                        }}
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
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <p className="text-gray-500">No notifications found</p>
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <HiOutlinePlus className="mr-2 h-5 w-5" />
                        Create New Notification
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Create new notification"
        >
          <HiOutlinePlus className="h-6 w-6" />
        </button>
      </div>

      <CreateNoticeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateNotification}
        notificationTypes={notificationTypes}
        initialValues={{
          recipient: '',
          message: '',
          type: 'New Incident',
          relatedIncident: '',
        }}
      />

      <EditNoticeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditNotification}
        notification={selectedNotification}
        notificationTypes={notificationTypes}
      />

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