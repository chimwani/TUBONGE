import React from 'react';
import { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

interface Notice {
  id: number;
  title: string;
  content: string;
  issuer: string;
  timestamp: string;
  category: 'General' | 'Emergency' | 'Event' | 'Regulation';
}

export default function PublicNoticesPage() {
  const [notices] = useState<Notice[]>([
    {
      id: 4,
      title: "Road Closure on Main Street",
      content: "Main Street will be closed for maintenance from March 1-3, 2025. Please use alternate routes.",
      issuer: "City Transportation Department",
      timestamp: "Feb 24, 2025, 12:00 PM",
      category: "General",
    },
    {
      id: 3,
      title: "Severe Weather Alert",
      content: "A storm warning is in effect until 6 PM today. Stay indoors and avoid unnecessary travel.",
      issuer: "National Weather Service",
      timestamp: "Feb 24, 2025, 11:15 AM",
      category: "Emergency",
    },
    {
      id: 2,
      title: "Community Town Hall Meeting",
      content: "Join us on March 5, 2025, at 7 PM at City Hall to discuss local budget plans.",
      issuer: "Mayor's Office",
      timestamp: "Feb 24, 2025, 10:00 AM",
      category: "Event",
    },
    {
      id: 1,
      title: "New Recycling Regulations",
      content: "Starting March 1, 2025, all households must separate glass from other recyclables.",
      issuer: "Environmental Services",
      timestamp: "Feb 24, 2025, 9:00 AM",
      category: "Regulation",
    },
  ]);

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

          {/* No Notices Message */}
          {notices.length === 0 && (
            <div className="p-6 bg-gray-100 border-b border-gray-200">
              <p className="text-gray-700 font-medium">No public notices available at this time.</p>
            </div>
          )}

          {/* Notices List */}
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
                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getCategoryBadgeStyle(notice.category)}`}>
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-gray-700">{notice.content}</p>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}