import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface Petition {
  id: number;
  title: string;
  description: string;
  creator: string;
  signatures: number;
  timestamp: string;
}

export default function PetitionsPage() {
  const [petitions, setPetitions] = useState<Petition[]>([
    {
      id: 3,
      title: "Increase Funding for Space Exploration",
      description: "We urge the government to allocate more resources to space programs to accelerate human exploration of the cosmos.",
      creator: "JohnSmith",
      signatures: 42,
      timestamp: "Feb 24, 2025, 11:00 AM",
    },
    {
      id: 2,
      title: "Protect Local Wildlife Habitats",
      description: "Demand stronger regulations to preserve natural habitats from urban development.",
      creator: "JaneDoe",
      signatures: 78,
      timestamp: "Feb 24, 2025, 10:45 AM",
    },
    {
      id: 1,
      title: "Welcome to the Petitions Page",
      description: "Start a petition to make your voice heard! This is an example petition to get us started.",
      creator: "Admin",
      signatures: 5,
      timestamp: "Feb 24, 2025, 9:30 AM",
    },
  ]);
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addPetition = () => {
    if (creator.trim() && title.trim() && description.trim()) {
      const newPetition: Petition = {
        id: petitions.length + 1,
        title,
        description,
        creator,
        signatures: 0,
        timestamp: new Date().toLocaleString(),
      };
      setPetitions([newPetition, ...petitions]);
      setCreator('');
      setTitle('');
      setDescription('');
    } else {
      alert("Please fill in all fields to create a petition!");
    }
  };

  const signPetition = (id: number) => {
    setPetitions(
      petitions.map((petition) =>
        petition.id === id ? { ...petition, signatures: petition.signatures + 1 } : petition
      )
    );
  };

  return (
    <div className="">
        <Header />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className=" p-6">
          <h1 className="text-3xl font-bold ">Petitions</h1>
          <p className="text-gray-300 text-sm mt-1">Make your voice heard. Start or support a cause.</p>
        </div>

        {/* Welcome Message */}
        {petitions.length === 0 && (
          <div className="p-6 bg-yellow-50 border-b border-yellow-200">
            <p className="text-yellow-800 font-medium">No petitions yet! Create one to kick things off.</p>
          </div>
        )}

        {/* Petition Form */}
        <div className="p-6 bg-gray-100 border-b border-gray-200">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
          <input
            type="text"
            placeholder="Petition Title"
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Petition Description"
            className="w-full p-3 h-32 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            onClick={addPetition}
            className="mt-4 bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
          >
            Create Petition
          </button>
        </div>

        {/* Petitions List */}
        <div className="p-6 space-y-6">
          {petitions.map((petition) => (
            <div
              key={petition.id}
              className="p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{petition.title}</h2>
                  <p className="mt-2 text-gray-700">{petition.description}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      <strong>Created by:</strong> {petition.creator}{' '}
                      <span className="text-gray-500">({petition.timestamp})</span>
                    </p>
                    <p className="mt-1">
                      <strong>Signatures:</strong>{' '}
                      <span className="text-gray-900 font-medium">{petition.signatures}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => signPetition(petition.id)}
                  className="ml-4 bg-gray-900 text-white py-1.5 px-4 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
                >
                  Sign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}