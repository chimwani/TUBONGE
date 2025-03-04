import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

interface Petition {
  id: number;
  title: string;
  description: string;
  goal: number; // Updated from signatures to goal
  tags: string[]; // Added tags
  creator?: string; // Optional, assuming backend might return it
  signatures?: number; // Optional, assuming backend tracks this separately
  timestamp: string; // Assuming backend returns this
}

export default function PetitionsPage() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState<number>(0); // Changed from creator to goal
  const [tags, setTags] = useState(''); // Added tags
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useContext(AuthContext); // Get token and auth status
  const navigate = useNavigate();

  // Fetch petitions from the API
  useEffect(() => {
    const fetchPetitions = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/petitions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPetitions(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
        } else {
          toast.error('Failed to fetch petitions. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchPetitions();
  }, [token, isAuthenticated, navigate]);

  // Add a new petition
  const addPetition = async () => {
    if (!title.trim() || !description.trim() || goal <= 0) {
      toast.error('Please fill in all fields and set a valid goal!');
      return;
    }

    const newPetition = {
      title,
      description,
      goal,
      tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag), // Convert to array, remove empty tags
    };

    try {
      const response = await axios.post('http://localhost:5000/api/petitions', newPetition, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPetitions([response.data, ...petitions]); // Assuming backend returns the created petition
      setTitle('');
      setDescription('');
      setGoal(0);
      setTags('');
      toast.success('Petition created successfully!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to create petition. Please try again.');
      }
    }
  };

  // Sign a petition (assuming a separate endpoint like PUT /api/petitions/:id/sign)
  const signPetition = async (id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/petitions/${id}/sign`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPetitions(
        petitions.map((petition) =>
          petition.id === id ? { ...petition, signatures: response.data.signatures } : petition
        )
      );
      toast.success('Petition signed successfully!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to sign petition. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          {/* Header */}
          <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold">Petitions</h1>
            <p className="text-gray-300 text-sm mt-1">Make your voice heard. Start or support a cause.</p>
          </div>

          {/* Welcome Message */}
          {petitions.length === 0 && (
            <div className="p-6 bg-yellow-50 border-b border-yellow-100">
              <p className="text-yellow-800 font-medium">No petitions yet! Create one to kick things off.</p>
            </div>
          )}

          {/* Petition Form */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a New Petition</h2>
            <input
              type="text"
              placeholder="Petition Title"
              className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Petition Description"
              className="w-full p-3 h-32 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="number"
              placeholder="Signature Goal"
              className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={goal}
              onChange={(e) => setGoal(parseInt(e.target.value) || 0)}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <button
              onClick={addPetition}
              className="mt-4 bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Create Petition
            </button>
          </div>

          {/* Petitions List */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Petitions</h2>
            {petitions.map((petition) => (
              <div
                key={petition.id}
                className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{petition.title}</h3>
                    <p className="mt-2 text-gray-700">{petition.description}</p>
                    <div className="mt-3 text-sm text-gray-600">
                      {petition.creator && (
                        <p>
                          <span className="text-gray-500">Created by</span>{' '}
                          <span className="font-medium">{petition.creator}</span>{' '}
                          <span className="text-gray-500">({petition.timestamp})</span>
                        </p>
                      )}
                      <p className="mt-1">
                        <span className="text-gray-500">Goal:</span>{' '}
                        <span className="font-medium">{petition.goal}</span>
                        {petition.signatures !== undefined && (
                          <>
                            {' '}
                            <span className="text-gray-500">• Signatures:</span>{' '}
                            <span className="text-blue-600 font-medium">{petition.signatures}</span>
                          </>
                        )}
                      </p>
                      <p className="mt-1">
                        <span className="text-gray-500">Tags:</span>{' '}
                        {petition.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 mr-2 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signPetition(petition.id)}
                    className="ml-4 bg-gray-900 text-white py-1.5 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                  >
                    Sign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="w-full mt-8">
        <Footer />
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
}