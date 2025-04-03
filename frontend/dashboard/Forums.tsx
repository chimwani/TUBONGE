import React, { useState, useEffect } from 'react';
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineEye,
} from 'react-icons/hi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Forum {
  _id: string;
  title: string;
  category: string;
  participants: number;
  status: string;
  lastActivity: string;
  responses: number;
}

const Forums = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forums');
        setForums(response.data);
        setLoading(false);
        console.log('Forums fetched:', response.data);
      } catch (error) {
        toast.error('Failed to fetch forums');
        setLoading(false);
        console.error('Fetch error:', error);
      }
    };

    fetchForums();
  }, []);

  const handleDelete = async (forumId: string) => {
    if (window.confirm('Are you sure you want to delete this forum?')) {
      try {
        await axios.delete(`http://localhost:5000/api/forums/${forumId}`);
        setForums(forums.filter((forum) => forum._id !== forumId));
        toast.success('Forum deleted successfully');
      } catch (error) {
        toast.error('Failed to delete forum');
        console.error(error);
      }
    }
  };

  const handleCreate = async () => {
    try {
      const newForum = {
        title: 'New Forum',
        category: 'General',
        participants: 0,
        status: 'active',
        lastActivity: new Date().toISOString(),
        responses: 0,
      };
      const response = await axios.post('http://localhost:5000/api/forums', newForum);
      setForums([response.data, ...forums]);
      toast.success('Forum created successfully');
    } catch (error) {
      toast.error('Failed to create forum');
      console.error('Create error:', error);
    }
  };

  const filteredForums = forums.filter((forum) => {
    const matchesTab = activeTab === 'all' || forum.status === activeTab;
    const matchesSearch =
      forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forum.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  console.log('Rendering Forums component, loading:', loading);

  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold">Forums Management</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded ${
                activeTab === 'all' ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Forums
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[300px]">
            <input
              type="text"
              placeholder="Search forums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <HiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <HiOutlinePlus className="mr-2" />
            New Forum
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mt-6">
        {loading ? (
          <div className="text-center p-6 text-gray-600">Loading forums...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase">Forum Title</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase">Participants</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase">Last Activity</th>
                  <th className="p-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {forums.length > 0 ? (
                  forums.map((forum) => (
                    <tr key={forum._id} className="border-b">
                      <td className="p-4">
                        <div className="text-sm font-medium">{forum.title}</div>
                        <div className="text-xs text-gray-600">{forum.responses} responses</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {forum.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{forum.participants}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            forum.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {forum.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(forum.lastActivity).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(forum._id)} className="text-red-600 hover:text-red-800">
                          <HiOutlineTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-600">
                      No forums found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Forums;