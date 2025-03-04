import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

interface Post {
  id: number;
  title: string; // Updated from author to title
  content: string;
  tags: string[]; // Added tags
  timestamp: string; // Assuming the backend returns this
}

export default function ForumsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState(''); // Changed from author to title
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Added tags input
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useContext(AuthContext); // Get token and auth status
  const navigate = useNavigate();

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/forums', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
        } else {
          toast.error('Failed to fetch posts. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, isAuthenticated, navigate]);

  // Add a new post
  const addPost = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content!');
      return;
    }

    const newPost = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag), // Convert to array, remove empty tags
    };

    try {
      const response = await axios.post('http://localhost:5000/api/forums', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts([response.data, ...posts]); // Assuming backend returns the created post with id and timestamp
      setTitle('');
      setContent('');
      setTags('');
      toast.success('Post created successfully!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to create post. Please try again.');
      }
    }
  };

  // Delete a post (assuming DELETE endpoint exists)
  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/forums/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id));
      toast.success('Post deleted successfully!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error('Failed to delete post. Please try again.');
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
            <h1 className="text-3xl font-bold">Forum Discussion</h1>
            <p className="text-gray-300 text-sm mt-1">Join the conversation and share your thoughts.</p>
          </div>

          {/* Welcome Message */}
          {posts.length === 0 && (
            <div className="p-6 bg-yellow-50 border-b border-yellow-100">
              <p className="text-yellow-800 font-medium">No posts yet! Be the first to start a discussion.</p>
            </div>
          )}

          {/* Post Form */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a New Post</h2>
            <input
              type="text"
              placeholder="Post Title" // Updated placeholder
              className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write your post..."
              className="w-full p-3 h-32 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Tags (comma-separated)" // Added tags input
              className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <button
              onClick={addPost}
              className="mt-4 bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Post
            </button>
          </div>

          {/* Posts List */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Discussions</h2>
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-blue-600">{post.title}</span> {/* Updated from author to title */}
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="mt-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 mr-2 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
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