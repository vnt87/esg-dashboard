import { useState, useEffect } from 'react';
import { Plus, FileText, Clock, Tag } from 'lucide-react';
import axios from 'axios';
import DataTable from '../components/DataTable';

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

const PAGE_SIZE = 10;

const DisclosuresList = () => {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisclosures = async () => {
      try {
        setLoading(true);
        // For now, we'll hardcode user_id as 1 since we don't have auth yet
        const response = await axios.get(`http://localhost:3001/api/disclosures/1?page=${currentPage}&limit=${PAGE_SIZE}`);
        setDisclosures(response.data.data);
        setTotalItems(response.data.totalItems);
      } catch (err) {
        setError('Failed to load disclosures');
        console.error('Error fetching disclosures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisclosures();
  }, [currentPage]);

  const getStatusColor = (status: Disclosure['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  const columns = [
    {
      key: 'company',
      header: 'Company',
      render: (value: string, row: Disclosure) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ID: {row.disclosure_identifier}
          </div>
        </div>
      ),
    },
    {
      key: 'framework',
      header: 'Framework',
      render: (value: string) => (
        <div className="flex items-center">
          <Tag size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {value}
        </div>
      ),
    },
    {
      key: 'disclosure_type',
      header: 'Type',
    },
    {
      key: 'evidence_summary',
      header: 'Evidence',
      render: (value: string) => (
        <div className="flex items-center">
          <FileText size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {value}
        </div>
      ),
    },
    {
      key: 'last_updated',
      header: 'Last Updated',
      render: (value: string) => (
        <div className="flex items-center">
          <Clock size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: Disclosure['status']) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
  ];

  const actionButtons = (
    <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
      <Plus size={18} className="mr-2" />
      New Disclosure
    </button>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Disclosures</h1>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={disclosures}
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          title="All Disclosures"
          actionButtons={actionButtons}
          isLoading={loading}
        />
      )}

      {!loading && !error && disclosures.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg mt-6">
          <FileText size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Disclosures Yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Get started by creating your first disclosure
          </p>
        </div>
      )}
    </div>
  );
};

export default DisclosuresList;
