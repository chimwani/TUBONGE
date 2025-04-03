import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

interface Notice {
  id: string; // Changed to string to match MongoDB _id
  title: string;
  content: string;
  issuer: string;
  timestamp: string;
  category: 'General' | 'Emergency' | 'Event' | 'Regulation';
}

export default function PublicNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notices from the API on mount
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        // Map API data to Notice interface
        const mappedNotices = response.data.map((notice: any) => ({
          id: notice._id,
          title: notice.message.split('.')[0] || 'Untitled Notice', // Extract first sentence as title
          content: notice.message,
          issuer: 'System Administrator', // Default issuer since not in API
          timestamp: new Date(notice.createdAt).toLocaleString(), // Use createdAt
          category: 'General' as const, // Default category since not in API
        }));
        setNotices(mappedNotices);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch public notices');
        setLoading(false);
        console.error('Fetch error:', error);
      }
    };

    fetchNotices();
  }, []);

  // Get badge styling based on notice category
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Emergency':
        return 'bg-red-100 text-red-800';
      case 'Event':
        return 'bg-blue-100 text-blue-800';
      case 'Regulation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white p-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Public Notices</h1>
            <p className="text-gray-300 text-sm mt-1">Stay informed with official updates from your community.</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-6 bg-gray-100 border-b border-gray-200">
              <p className="text-gray-700 font-medium">Loading public notices...</p>
            </div>
          )}

          {/* No Notices Message */}
          {!loading && notices.length === 0 && (
            <div className="p-6 bg-gray-100 border-b border-gray-200">
              <p className="text-gray-700 font-medium">No public notices available at this time.</p>
            </div>
          )}

          {/* Notices List */}
          {!loading && notices.length > 0 && (
            <div className="p-6">
              <div className="space-y-6">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{notice.title}</h2>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getCategoryBadgeStyle(
                              notice.category
                            )}`}
                          >
                            {notice.category}
                          </span>
                        </div>
                        <p className="text-gray-700 break-words">{notice.content}</p>
                        <div className="mt-3 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Issued by:</span> {notice.issuer}
                          </p>
                          <p className="text-gray-500">{notice.timestamp}</p>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                        <button
                          onClick={() => alert(`Details for "${notice.title}" would be shown here.`)}
                          className="w-full sm:w-auto bg-gray-900 text-white py-1.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
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
}