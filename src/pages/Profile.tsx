import { User, Mail, Calendar, MapPin, Building } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../App';

const Profile = () => {
  // Dummy user data (in a real app, this would come from an API/props)
  const userData = {
    name: 'Mike Kelvin',
    initials: 'MK',
    email: 'mike.kelvin@example.com',
    joinDate: 'September 2023',
    location: 'Ho Chi Minh City, Vietnam',
    company: 'ESG Analytics Ltd.',
    bio: 'ESG Data Analyst with over 5 years of experience in sustainability reporting and environmental impact assessment.',
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-3xl">
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
                Joined {userData.joinDate}
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
      </div>
    </div>
  );
};

export default Profile;
