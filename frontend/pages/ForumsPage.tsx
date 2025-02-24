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
      content: "Anyone interested in space exploration? I’d love to hear your thoughts on the latest Mars mission.",
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
    <div className="">
      <Header />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Forum Discussion</h1>

        {/* Welcome Message */}
        {posts.length === 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="text-yellow-700">No posts yet! Be the first to start a discussion.</p>
          </div>
        )}

        {/* Post Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Write your post..."
            className="w-full p-3 h-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            onClick={addPost}
            className="mt-3 bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Post
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-150"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-700">
                    <strong className="text-blue-600">{post.author}</strong>{' '}
                    <span className="text-sm text-gray-500">{post.timestamp}</span>
                  </p>
                  <p className="mt-2 text-gray-800">{post.content}</p>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

     
      </div>
      <Footer />
    </div>
  );
}