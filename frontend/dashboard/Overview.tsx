import React, { useState, useEffect } from 'react';
import {
  HiUsers,
  HiDocumentText,
  HiChat,
  HiClipboardList,
} from 'react-icons/hi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Overview = () => {
  const [stats, setStats] = useState([]);
  const [recentForums, setRecentForums] = useState([]);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Remove authorization headers
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        const forumsResponse = await axios.get('http://localhost:5000/api/forums');
        const issuesResponse = await axios.get('http://localhost:5000/api/issues');

        // Transform data into stats format
        const transformedStats = [
          {
            name: 'Total Users',
            value: usersResponse.data.length.toString(),
            change: '+12%',
            icon: HiUsers,
          },
          {
            name: 'Active Forums',
            value: forumsResponse.data.filter((f) => f.status === 'active').length.toString(),
            change: '+4%',
            icon: HiChat,
          },
          {
            name: 'Pending Issues',
            value: issuesResponse.data.filter((i) => i.status === 'Open').length.toString(),
            change: '-8%',
            icon: HiClipboardList,
          },
          
        ];

        setStats(transformedStats);
        setRecentForums(forumsResponse.data.slice(0, 5));
        setRecentIssues(issuesResponse.data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        toast.error(`Error: ${err.message || 'Failed to fetch data.'}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Removed dependencies

  if (loading) {
    return <div className="text-center py-6">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <div className="mt-3 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Forums</h2>
            <div className="mt-6 flow-root">
              {recentForums.length > 0 ? (
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentForums.map((forum) => (
                    <li key={forum.id} className="py-4">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{forum.title}</p>
                          <p className="text-sm text-gray-500">
                            {forum.tags ? forum.tags.join(', ') : 'No tags'}
                          </p>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No recent forums available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Latest Issues</h2>
            <div className="mt-6 flow-root">
              {recentIssues.length > 0 ? (
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentIssues.map((issue) => (
                    <li key={issue.id} className="py-4">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
                          <p className="text-sm text-gray-500">{issue.status || 'Unknown'}</p>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No recent issues available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
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

export default Overview;