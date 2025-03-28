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

  // Handle Delete
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

  // Handle Create
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

  // Debug log to confirm render
  console.log('Rendering Forums component, loading:', loading);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Forums Management</h1>
      </div>

      {/* Filters, Search, and Create Button */}
      <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setActiveTab('active')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: activeTab === 'active' ? '#e0f2fe' : 'transparent',
                color: activeTab === 'active' ? '#0284c7' : '#6b7280',
              }}
            >
              Active Forums
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: activeTab === 'archived' ? '#e0f2fe' : 'transparent',
                color: activeTab === 'archived' ? '#0284c7' : '#6b7280',
              }}
            >
              Archived
            </button>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: activeTab === 'all' ? '#e0f2fe' : 'transparent',
                color: activeTab === 'all' ? '#0284c7' : '#6b7280',
              }}
            >
              All Forums
            </button>
          </div>

          {/* Search and Create */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search forums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                }}
              />
              <HiOutlineSearch
                style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#9ca3af' }}
              />
            </div>
            <button
              onClick={handleCreate}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <HiOutlinePlus style={{ marginRight: '8px' }} />
              New Forum
            </button>
          </div>
        </div>
      </div>

      {/* Forums Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', marginTop: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '24px' }}>Loading forums...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                    Forum Title
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                    Category
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                    Participants
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                    Status
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                    Last Activity
                  </th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredForums.length > 0 ? (
                  filteredForums.map((forum) => (
                    <tr key={forum._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{forum.title}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{forum.responses} responses</div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '2px 8px', fontSize: '12px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '9999px' }}>
                          {forum.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{forum.participants}</td>
                      <td style={{ padding: '16px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            fontSize: '12px',
                            backgroundColor: forum.status === 'active' ? '#dcfce7' : '#f3f4f6',
                            color: forum.status === 'active' ? '#166534' : '#4b5563',
                            borderRadius: '9999px',
                          }}
                        >
                          {forum.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                        {new Date(forum.lastActivity).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button style={{ color: '#2563eb', margin: '0 8px' }}>
                          <HiOutlineEye />
                        </button>
                        <button style={{ color: '#2563eb', margin: '0 8px' }}>
                          <HiOutlinePencil />
                        </button>
                        <button onClick={() => handleDelete(forum._id)} style={{ color: '#dc2626', margin: '0 8px' }}>
                          <HiOutlineTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
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