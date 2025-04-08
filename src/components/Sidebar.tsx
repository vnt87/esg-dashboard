import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Briefcase, FileQuestion, FileText, FolderPlus, House, Info } from 'lucide-react';
import { ReactNode } from 'react';

interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems: NavItem[] = [
    { name: 'My Dashboard', icon: <House size={20} />, path: '/' },
    { name: 'Company Directory', icon: <Briefcase size={20} />, path: '/company-directory' },
  ];

  const portfolioItems: NavItem[] = [
    { name: 'Portfolios', icon: <FileText size={20} />, path: '/portfolios' },
    { name: 'Create Portfolio', icon: <FolderPlus size={20} />, path: '/create-portfolio' },
  ];

  const disclosureItems: NavItem[] = [
    { name: 'Disclosures', icon: <FileText size={20} />, path: '/disclosures' },
    { name: 'Requests', icon: <FileQuestion size={20} />, path: '/requests' },
    { name: 'Frameworks', icon: <BookOpen size={20} />, path: '/frameworks' },
  ];

  const supportItems: NavItem[] = [
    { name: 'Knowledge', icon: <Info size={20} />, path: '/knowledge' },
  ];

  const renderNavItems = (items: NavItem[], title?: string) => (
    <div className="mb-5">
      {title && <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">{title}</div>}
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center px-4 py-3 text-sm ${
            location.pathname === item.path
              ? 'bg-[#f0f9f6] dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-l-4 border-teal-500'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span className="mr-3">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="w-60 h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors">
      <div className="p-4">
        <div className="flex items-center">
          <span className="font-bold text-2xl text-gray-900 dark:text-white">esg</span>
          <span className="font-bold text-xl text-gray-900 dark:text-white">book</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {renderNavItems(navigationItems)}
        {renderNavItems(portfolioItems, 'PORTFOLIOS')}
        {renderNavItems(disclosureItems, 'DISCLOSURES')}
        {renderNavItems(supportItems, 'SUPPORT')}
      </div>
    </div>
  );
};

export default Sidebar;
