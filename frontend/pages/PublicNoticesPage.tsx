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
      issuer: "Mayor’s Office",
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

  return (
    <div className="">
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold ">Public Notices</h1>
          <p className="text-gray-300 text-sm mt-1">Stay informed with official updates from your community.</p>
        </div>

        {/* No Notices Message */}
        {notices.length === 0 && (
          <div className="p-6 bg-gray-100 border-b border-gray-200">
            <p className="text-gray-700 font-medium">No public notices available at this time.</p>
          </div>
        )}

        {/* Notices List */}
        <div className="p-6 space-y-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{notice.title}</h2>
                  <p className="mt-2 text-gray-700">{notice.content}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      <strong>Issued by:</strong> {notice.issuer}{' '}
                      <span className="text-gray-500">({notice.timestamp})</span>
                    </p>
                    <p className="mt-1">
                      <strong>Category:</strong>{' '}
                      <span
                        className={`font-medium ${
                          notice.category === 'Emergency'
                            ? 'text-red-600'
                            : notice.category === 'Event'
                            ? 'text-blue-600'
                            : notice.category === 'Regulation'
                            ? 'text-purple-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {notice.category}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Details for "${notice.title}" would be shown here.`)}
                  className="ml-4 bg-gray-900 text-white py-1.5 px-4 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
       
      </div>
      <Footer />
    </div>
  );
}