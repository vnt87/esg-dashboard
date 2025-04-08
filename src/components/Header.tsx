import { ChevronDown, Globe, Search, Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../App';

interface HeaderProps {
  currentUser: {
    initials: string;
    name: string;
  };
}

const Header = ({ currentUser }: HeaderProps) => {
  const { isDark, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between transition-colors">
      <div className="text-xl font-semibold text-gray-900 dark:text-white">Disclosure</div>
      
      <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for company"
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Globe size={20} />
        </button>
        
        <div className="flex items-center">
          <div className="w-9 h-9 bg-gray-500 dark:bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
            {currentUser.initials}
          </div>
          <ChevronDown size={20} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Header;
