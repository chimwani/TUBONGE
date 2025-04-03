// src/pages/UserProfile.tsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi';
import { AuthContext } from '../components/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface UserProfileData {
  _id: string;
  name: string;
  email: string;
  role: 'Citizen' | 'Government Official' | 'NGO' | 'Admin';
  phone?: string;
  bio?: string;
}

const UserProfile: React.FC = () => {
  const { userId, token, logout } = useContext(AuthContext); // Get userId, token, and logout from context
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile on mount using userId from context
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setError('User ID not available');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedUser = response.data;
        setUserData(fetchedUser);
        setTempData(fetchedUser); // Initialize tempData for editing
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchUserProfile();
  }, [userId, token]);

  // Toggle edit mode
  const handleEditToggle = () => {
    if (isEditing && userData) {
      setTempData(userData); // Reset temp data on cancel
    }
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Handle save action
  const handleSave = async () => {
    if (!tempData) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/me`,
        tempData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.user);
      setIsEditing(false);
      console.log('Profile updated:', response.data.user);
    } catch (err) {
      setError('Failed to save profile changes');
      console.error('Save error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Your Profile</h1>
              <p className="text-gray-200 text-sm mt-1">
                Manage your personal details and preferences
              </p>
            </div>
            <button
              onClick={handleEditToggle}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              aria-label={isEditing ? 'Cancel Editing' : 'Edit Profile'}
              disabled={loading || !userData}
            >
              {isEditing ? (
                <HiX className="h-5 w-5 text-white" />
              ) : (
                <HiPencil className="h-5 w-5 text-white" />
              )}
            </button>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-8">
            {loading ? (
              <div className="text-center text-gray-600">Loading profile...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : userData ? (
              <section className="space-y-6">
                {/* Avatar Placeholder */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-semibold">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                    <p className="text-sm text-gray-500">{userData.role}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={tempData?.name || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={tempData?.email || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={tempData?.phone || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  {/* Role (Read-Only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-gray-900">{userData.role}</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={tempData?.bio || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 resize-y min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userData.bio || 'No bio provided'}</p>
                  )}
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center"
                    >
                      <HiCheck className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </section>
            ) : (
              <div className="text-center text-gray-600">No profile data available.</div>
            )}

            {/* Account Actions */}
            {!isEditing && (
              <section className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
                <button
                  onClick={logout} // Use logout from AuthContext
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;