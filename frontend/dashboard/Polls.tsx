import React, { useState, useEffect } from 'react';

interface Poll {
  _id: string; // Changed to match MongoDB's default _id field
  title: string;
  type: 'forum' | 'petition' | 'issue';
  options: string[];
  createdAt?: string;
  updatedAt?: string;
}

const PollsPage = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newPoll, setNewPoll] = useState({
    title: '',
    type: 'forum' as 'forum' | 'petition' | 'issue',
    options: ['', '']
  });
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all polls on component mount
  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/polls');
      if (!response.ok) throw new Error('Failed to fetch polls');
      const data = await response.json();
      setPolls(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error fetching polls:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...newPoll.options];
    newOptions[index] = value;
    setNewPoll(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleRemoveOption = (index: number) => {
    if (newPoll.options.length <= 2) return;
    const newOptions = [...newPoll.options];
    newOptions.splice(index, 1);
    setNewPoll(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleCreatePoll = async () => {
    if (!newPoll.title.trim() || newPoll.options.some(opt => !opt.trim())) {
      setError('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/polls', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPoll.title,
          type: newPoll.type,
          options: newPoll.options.filter(opt => opt.trim())
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create poll');
      }

      const createdPoll = await response.json();
      setPolls(prev => [...prev, createdPoll]);
      setNewPoll({ title: '', type: 'forum', options: ['', ''] });
      setActiveTab('view');
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error creating poll:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePoll = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this poll?')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/polls/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete poll');
      
      setPolls(prev => prev.filter(poll => poll._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error deleting poll:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Polls Management</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'create' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('create')}
          disabled={isLoading}
        >
          Create Poll
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'view' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('view')}
          disabled={isLoading}
        >
          View Polls
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {activeTab === 'create' ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Poll</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Poll Title</label>
            <input
              type="text"
              value={newPoll.title}
              onChange={(e) => setNewPoll(prev => ({...prev, title: e.target.value}))}
              className="w-full p-2 border rounded"
              placeholder="Enter poll title"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Poll Type</label>
            <select
              value={newPoll.type}
              onChange={(e) => setNewPoll(prev => ({...prev, type: e.target.value as 'forum' | 'petition' | 'issue'}))}
              className="w-full p-2 border rounded"
              disabled={isLoading}
            >
              <option value="forum">Forum</option>
              <option value="petition">Petition</option>
              <option value="issue">Issue</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Poll Options</label>
            {newPoll.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Option ${index + 1}`}
                  disabled={isLoading}
                />
                {newPoll.options.length > 2 && (
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                    disabled={isLoading}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddOption}
              className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={isLoading}
              type="button"
            >
              Add Option
            </button>
          </div>

          <button
            onClick={handleCreatePoll}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Poll'}
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Existing Polls</h2>
          {polls.length === 0 ? (
            <div className="text-gray-500">No polls created yet</div>
          ) : (
            <div className="space-y-4">
              {polls.map(poll => (
                <div key={poll._id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{poll.title}</h3>
                      <span className="text-sm text-gray-500 capitalize">{poll.type}</span>
                    </div>
                    <button
                      onClick={() => handleDeletePoll(poll._id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium mb-1">Options:</h4>
                    <ul className="list-disc list-inside">
                      {poll.options.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PollsPage;