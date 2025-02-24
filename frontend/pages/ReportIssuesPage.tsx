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
    <div className="">
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold">Report Issues</h1>
          <p className="text-gray-300 text-sm mt-1">Let us know about any problems you encounter.</p>
        </div>

        {/* Welcome Message */}
        {issues.length === 0 && (
          <div className="p-6 bg-yellow-50 border-b border-yellow-200">
            <p className="text-yellow-800 font-medium">No issues reported yet! Submit one to get started.</p>
          </div>
        )}

        {/* Issue Form */}
        <div className="p-6 bg-gray-100 border-b border-gray-200">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Issue Title"
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Issue Description"
            className="w-full p-3 h-32 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={addIssue}
            className="mt-4 bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
          >
            Submit Issue
          </button>
        </div>

        {/* Issues List */}
        <div className="p-6 space-y-6">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{issue.title}</h2>
                  <p className="mt-2 text-gray-700">{issue.description}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      <strong>Reported by:</strong> {issue.reporter}{' '}
                      <span className="text-gray-500">({issue.timestamp})</span>
                    </p>
                    <p className="mt-1">
                      <strong>Status:</strong>{' '}
                      <span
                        className={`font-medium ${
                          issue.status === 'Open'
                            ? 'text-red-600'
                            : issue.status === 'In Progress'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {issue.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  {issue.status !== 'Resolved' && (
                    <button
                      onClick={() =>
                        updateStatus(issue.id, issue.status === 'Open' ? 'In Progress' : 'Resolved')
                      }
                      className="bg-gray-900 text-white py-1.5 px-4 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
                    >
                      {issue.status === 'Open' ? 'Start Progress' : 'Resolve'}
                    </button>
                  )}
                </div>
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