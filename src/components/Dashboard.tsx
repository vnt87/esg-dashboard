import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Disclosure {
  disclosure_id: string;
  company: string;
  framework: string;
  disclosure_identifier: string;
  last_updated: string;
  evidence_summary: string;
  disclosure_type: string;
  status: 'Draft' | 'In Progress' | 'Completed';
}

const Dashboard = () => {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        // For now, we'll hardcode user_id as 1 since we don't have auth yet
        const response = await axios.get('http://localhost:3001/api/disclosures/1');
        setDisclosures(response.data);
      } catch (err) {
        setError('Failed to load disclosures');
        console.error('Error fetching disclosures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisclosures();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Dashboard</h1>
        <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md">
          <Plus size={18} className="mr-2" />
          New Disclosure
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden transition-colors">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Disclosures</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Framework</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {disclosures.map((disclosure) => (
              <tr key={disclosure.disclosure_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{disclosure.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{disclosure.framework}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(disclosure.last_updated).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${disclosure.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      disclosure.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {disclosure.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <Link to={`/disclosure/${disclosure.disclosure_id}`} className="text-teal-600 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-1" />
                      <span>View</span>
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Pending Tasks</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="flex items-center">
                <FileText size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Review Funki A/S disclosure</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Due 05/11/2022</span>
            </li>
            <li className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="flex items-center">
                <FileText size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Upload evidence for Tech Innovations</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Due 10/11/2022</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6">
          <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Disclosure Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="text-3xl font-bold text-teal-500">{disclosures.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Disclosures</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="text-3xl font-bold text-green-500">
                {disclosures.filter(d => d.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="text-3xl font-bold text-yellow-500">
                {disclosures.filter(d => d.status === 'Draft').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Draft</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="text-3xl font-bold text-blue-500">
                {disclosures.filter(d => d.status === 'In Progress').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
