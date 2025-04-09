import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Briefcase, FileQuestion, FileText, FolderPlus, House, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useContext } from 'react';
import { SidebarContext } from '../App';

interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);
  
  const navigationItems: NavItem[] = [
    { name: 'My Dashboard', icon: <House size={20} />, path: '/' },
    { name: 'Company Directory', icon: <Briefcase size={20} />, path: '/company-directory' },
    { name: 'Portfolios', icon: <FolderPlus size={20} />, path: '/portfolios' },
  ];

  const disclosureItems: NavItem[] = [
    { name: 'Disclosures', icon: <FileText size={20} />, path: '/disclosures' },
    { name: 'Requests', icon: <FileQuestion size={20} />, path: '/requests' },
  ];

  const accountItems: NavItem[] = [
    { name: 'Profile', icon: <Info size={20} />, path: '/profile' },
  ];

  const renderNavItems = (items: NavItem[], title?: string) => (
    <div className="mb-5">
      {title && <div className={`px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>{title}</div>}
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center px-4 py-3 text-sm ${
            location.pathname === item.path
              ? 'bg-[#f0f9f6] dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-l-4 border-teal-500'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title={isCollapsed ? item.name : undefined}
        >
          <span className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>{item.icon}</span>
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>{item.name}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-60'} h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`font-bold text-2xl text-gray-900 dark:text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>nv</span>
          <span className={`font-bold text-xl text-gray-900 dark:text-white ml-0.5 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Dash</span>
          {isCollapsed && <span className="font-bold text-2xl text-gray-900 dark:text-white">n</span>}
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {renderNavItems(navigationItems, 'NAVIGATION')}
        {renderNavItems(disclosureItems, 'DISCLOSURES')}
        {renderNavItems(accountItems, 'ACCOUNT')}
      </div>
    </div>
  );
};

export default Sidebar;
