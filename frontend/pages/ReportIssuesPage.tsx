import React from 'react';
import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface Issue {
  id: number;
  title: string;
  description: string;
  reporter: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export default function ReportIssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 3,
      title: "Broken Link on Homepage",
      description: "The 'Learn More' button on the homepage leads to a 404 error.",
      reporter: "JaneDoe",
      status: "Open",
      timestamp: "Feb 24, 2025, 11:30 AM",
    },
    {
      id: 2,
      title: "Login Button Not Responding",
      description: "Clicking the login button does nothing on the auth page.",
      reporter: "JohnSmith",
      status: "In Progress",
      timestamp: "Feb 24, 2025, 10:50 AM",
    },
    {
      id: 1,
      title: "Welcome to Issue Reporting",
      description: "Report any issues you encounter here! This is a sample issue.",
      reporter: "Admin",
      status: "Resolved",
      timestamp: "Feb 24, 2025, 9:45 AM",
    },
  ]);
  const [reporter, setReporter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addIssue = () => {
    if (reporter.trim() && title.trim() && description.trim()) {
      const newIssue: Issue = {
        id: issues.length + 1,
        title,
        description,
        reporter,
        status: "Open", // New issues start as "Open"
        timestamp: new Date().toLocaleString(),
      };
      setIssues([newIssue, ...issues]);
      setReporter('');
      setTitle('');
      setDescription('');
    } else {
      alert("Please fill in all fields to report an issue!");
    }
  };

  const updateStatus = (id: number, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white p-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Report Issues</h1>
            <p className="text-gray-300 text-sm mt-1">Let us know about any problems you encounter.</p>
          </div>

          {/* Welcome Message */}
          {issues.length === 0 && (
            <div className="p-6 bg-yellow-50 border-b border-yellow-100">
              <p className="text-yellow-800 font-medium">No issues reported yet! Submit one to get started.</p>
            </div>
          )}

          {/* Issue Form */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Submit a New Issue</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
              />
              <input
                type="text"
                placeholder="Issue Title"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Issue Description"
                className="w-full p-3 h-32 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                onClick={addIssue}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
              >
                Submit Issue
              </button>
            </div>
          </div>

          {/* Issues List */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Issues</h2>
            <div className="space-y-6">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <div className="sm:flex sm:justify-between sm:items-start">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{issue.title}</h3>
                      <p className="mt-2 text-gray-700">{issue.description}</p>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Reported by:</span> {issue.reporter}{' '}
                          <span className="text-gray-500">({issue.timestamp})</span>
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">Status:</span>{' '}
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              issue.status === 'Open'
                                ? 'bg-red-100 text-red-800'
                                : issue.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {issue.status}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      {issue.status !== 'Resolved' && (
                        <button
                          onClick={() =>
                            updateStatus(issue.id, issue.status === 'Open' ? 'In Progress' : 'Resolved')
                          }
                          className="w-full sm:w-auto bg-gray-900 text-white py-1.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center"
                        >
                          {issue.status === 'Open' ? 'Start Progress' : 'Resolve'}
                        </button>
                      )}
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