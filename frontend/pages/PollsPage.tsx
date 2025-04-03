import React, { useState, useEffect } from "react";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Type definitions for Poll and Option (aligned with backend)
interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  _id: string;
  title: string;
  type: 'forum' | 'petition' | 'issue';
  options: PollOption[];
  createdAt?: string;
}

const PollsPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch polls from the API on component mount
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/polls');
        if (!response.ok) {
          throw new Error(`Failed to fetch polls: ${response.statusText}`);
        }
        const data: Poll[] = await response.json();
        // Ensure votes are initialized if backend doesn't provide them
        const initializedPolls = data.map(poll => ({
          ...poll,
          options: poll.options.map(opt => ({
            text: typeof opt === 'string' ? opt : opt.text,
            votes: typeof opt === 'string' ? 0 : (opt.votes || 0)
          }))
        }));
        setPolls(initializedPolls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = (pollId: string, optionText: string) => {
    if (votedPolls.has(pollId)) {
      alert("You have already voted on this poll!");
      return;
    }

    // Update votes locally
    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll._id === pollId) {
          return {
            ...poll,
            options: poll.options.map(opt =>
              opt.text === optionText ? { ...opt, votes: opt.votes + 1 } : opt
            )
          };
        }
        return poll;
      })
    );

    // Mark poll as voted
    setVotedPolls(prev => new Set(prev).add(pollId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Active Polls</h1>

        {loading ? (
          <p className="text-gray-600">Loading polls...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : polls.length === 0 ? (
          <p className="text-gray-600">No polls available at the moment.</p>
        ) : (
          <div className="space-y-8">
            {polls.map(poll => (
              <div
                key={poll._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  {poll.title}
                </h2>

                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    const totalVotes = poll.options.reduce(
                      (sum, opt) => sum + opt.votes,
                      0
                    );
                    const percentage = totalVotes
                      ? ((option.votes / totalVotes) * 100).toFixed(1)
                      : 0;

                    return (
                      <div key={index} className="flex items-center gap-4">
                        <button
                          onClick={() => handleVote(poll._id, option.text)}
                          disabled={votedPolls.has(poll._id)}
                          className={`px-4 py-2 rounded-md transition-colors ${
                            votedPolls.has(poll._id)
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          Vote
                        </button>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">{option.text}</span>
                            <span className="text-gray-600">
                              {option.votes} votes ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {votedPolls.has(poll._id) && (
                  <p className="mt-3 text-green-600 text-sm">
                    Thank you for voting!
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PollsPage;