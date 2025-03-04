import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

interface Issue {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  tags: string[];
  reporter: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export default function ReportIssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [reporter, setReporter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [tags, setTags] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useContext(AuthContext); // Get token and auth status
  const navigate = useNavigate(); // For redirecting to login

  // Fetch existing issues from the API
  useEffect(() => {
    const fetchIssues = async () => {
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/issues', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setIssues(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
        } else {
          toast.error('Failed to fetch issues. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchIssues();
  }, [token, isAuthenticated, navigate]);

  // Add a new issue
  const addIssue = async () => {
    if (!reporter.trim() || !title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields to report an issue!');
      return;
    }

    const newIssue = {
      title,
      description,
      priority,
      tags: tags.split(',').map((tag) => tag.trim()),
      reporter,
      status: 'Open',
      timestamp: new Date().toLocaleString(),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/issues', newIssue, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      setIssues([response.data, ...issues]);
      setReporter('');
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setTags('');
      toast.success('Issue submitted successfully!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to submit the issue. Please try again.');
      }
    }
  };

  // Update issue status
  const updateStatus = async (id: number, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    try {
      const updatedIssue = issues.find((issue) => issue.id === id);
      if (updatedIssue) {
        const response = await axios.put(
          `http://localhost:5000/api/issues/${id}`,
          {
            ...updatedIssue,
            status: newStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );
        setIssues(issues.map((issue) => (issue.id === id ? response.data : issue)));
        toast.success(`Issue status updated to ${newStatus}!`);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to update the issue status. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
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
                          <span className="font-medium">Priority:</span>{' '}
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              issue.priority === 'Low'
                                ? 'bg-green-100 text-green-800'
                                : issue.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {issue.priority}
                          </span>
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">Tags:</span>{' '}
                          {issue.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 mr-2 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
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
}