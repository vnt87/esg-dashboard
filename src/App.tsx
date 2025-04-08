import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DisclosureView from './components/DisclosureView';
import Dashboard from './components/Dashboard';
import Profile from './pages/Profile';
import './index.css';

// Create theme context
export const ThemeContext = createContext({
  isDark: false,
  toggleDarkMode: () => {},
});

// Create sidebar context
export const SidebarContext = createContext({
  isCollapsed: false,
  toggleSidebar: () => {},
});

function App() {
  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState === 'true';
  });
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // User state
  const [currentUser, setCurrentUser] = useState({
    initials: 'MK',
    name: 'Mike Kelvin',
  });

  // Effect to handle theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header currentUser={currentUser} />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/disclosure/:id" element={<DisclosureView />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
        </div>
      </Router>
      </SidebarContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
