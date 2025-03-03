import { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export default function ForumsPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 3,
      author: "JaneDoe",
      content: "Hey everyone, just joined the forum. Excited to be here and discuss some cool topics!",
      timestamp: "Feb 24, 2025, 10:30 AM",
    },
    {
      id: 2,
      author: "JohnSmith",
      content: "Anyone interested in space exploration? I'd love to hear your thoughts on the latest Mars mission.",
      timestamp: "Feb 24, 2025, 10:15 AM",
    },
    {
      id: 1,
      author: "Admin",
      content: "Welcome to the forum! Feel free to share your thoughts and start discussions.",
      timestamp: "Feb 24, 2025, 9:00 AM",
    },
  ]);
  
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  
  const addPost = () => {
    if (author.trim() && content.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        author,
        content,
        timestamp: new Date().toLocaleString(),
      };
      setPosts([newPost, ...posts]);
      setAuthor('');
      setContent('');
    } else {
      alert("Please fill in both your name and post content!");
    }
  };
  
  const deletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };
  
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
              placeholder="Your Name"
              className="w-full p-3 mb-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              placeholder="Write your post..."
              className="w-full p-3 h-32 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
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
                      <span className="font-medium text-blue-600">{post.author}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{post.content}</p>
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
      
      {/* Full-width footer */}
      <div className="w-full mt-8">
        <Footer />
      </div>
    </div>
  );
}