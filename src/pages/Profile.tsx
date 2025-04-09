import { User, Mail, Calendar, MapPin, Building, Lock, Key, ShieldCheck } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../App';
import axios from 'axios';

type TabType = 'overview' | 'edit' | 'password' | 'api' | '2fa';

interface UserData {
  user_id: number;
  name: string;
  email: string;
  join_date: string;
  location: string;
  company: string;
  bio: string;
  initials: string;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // For now, we'll hardcode user_id as 1 since we don't have auth yet
        const response = await axios.get('http://localhost:3001/api/profile/1');
        const data = response.data;
        
        // Format the data to match our interface
        setUserData({
          ...data,
          // Extract initials from name
          initials: data.name.split(' ').map((n: string) => n[0]).join(''),
        });
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error || !userData) {
    return <div className="p-6 text-red-500">{error || 'Failed to load profile'}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Profile</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <User size={18} className="mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'edit'
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <User size={18} className="mr-2" />
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'password'
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Lock size={18} className="mr-2" />
          Password
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'api'
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Key size={18} className="mr-2" />
          API Keys
        </button>
        <button
          onClick={() => setActiveTab('2fa')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === '2fa'
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <ShieldCheck size={18} className="mr-2" />
          2FA
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-3xl">
        {activeTab === 'overview' && (
          <>
            <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center text-white text-3xl font-medium">
            {userData.initials}
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{userData.name}</h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">{userData.bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail size={18} className="mr-2" />
                {userData.email}
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={18} className="mr-2" />
                Joined {new Date(userData.join_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin size={18} className="mr-2" />
                {userData.location}
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Building size={18} className="mr-2" />
                {userData.company}
              </div>
            </div>
          </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-teal-500">28</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Reports Created</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">154</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Data Points Added</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Reports Completed</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'edit' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={userData.name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={userData.email} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={userData.location} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={userData.company} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" rows={4} value={userData.bio} />
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Update Password</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Production API Key</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last used 2 days ago</div>
                  </div>
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Generate New Key</button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Development API Key</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last used 5 hours ago</div>
                  </div>
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Generate New Key</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '2fa' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">2FA Status</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Currently disabled</div>
                </div>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Enable 2FA</button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
