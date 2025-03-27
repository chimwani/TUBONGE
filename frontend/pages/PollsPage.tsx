import React, { useState, useEffect } from "react";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Type definitions for Poll and Option
interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

// Mock data - in a real app, this would come from an API
// Mock data - in a real app, this would come from an API
const mockPolls: Poll[] = [
    {
      id: 1,
      question: "Which forum platform do you prefer?",
      options: [
        { id: 1, text: "Discourse", votes: 25 },
        { id: 2, text: "phpBB", votes: 18 },
        { id: 3, text: "vBulletin", votes: 12 },
      ]
    },
    {
      id: 2,
      question: "What's your favorite feature in a forum?",
      options: [
        { id: 1, text: "User Reputation System", votes: 30 },
        { id: 2, text: "Customizable Themes", votes: 15 },
        { id: 3, text: "Integration with Social Media", votes: 10 },
      ]
    }
  ];

const PollsPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());

  // Load polls on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setPolls(mockPolls);
  }, []);

  const handleVote = (pollId: number, optionId: number) => {
    if (votedPolls.has(pollId)) {
      alert("You have already voted on this poll!");
      return;
    }

    // Update votes
    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map(option =>
              option.id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option
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
        
        {polls.length === 0 ? (
          <p className="text-gray-600">No polls available at the moment.</p>
        ) : (
          <div className="space-y-8">
            {polls.map(poll => (
              <div 
                key={poll.id} 
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  {poll.question}
                </h2>
                
                <div className="space-y-3">
                  {poll.options.map(option => {
                    const totalVotes = poll.options.reduce(
                      (sum, opt) => sum + opt.votes,
                      0
                    );
                    const percentage = totalVotes 
                      ? ((option.votes / totalVotes) * 100).toFixed(1) 
                      : 0;

                    return (
                      <div key={option.id} className="flex items-center gap-4">
                        <button
                          onClick={() => handleVote(poll.id, option.id)}
                          disabled={votedPolls.has(poll.id)}
                          className={`px-4 py-2 rounded-md transition-colors ${
                            votedPolls.has(poll.id)
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
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {votedPolls.has(poll.id) && (
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