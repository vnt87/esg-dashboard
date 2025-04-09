import { useState, useEffect } from 'react';
import { Plus, AlertCircle, Flag, Clock, User } from 'lucide-react';
import axios from 'axios';
import DataTable from '../components/DataTable';

interface Request {
  request_id: number;
  title: string;
  request_type: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  details: string;
  requester_name: string;
  assigned_to_name: string | null;
  created_at: string;
  last_updated: string;
}

const PAGE_SIZE = 10;

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // For now, we'll hardcode user_id as 1 since we don't have auth yet
        const response = await axios.get(`http://localhost:3001/api/requests/1?page=${currentPage}&limit=${PAGE_SIZE}`);
        setRequests(response.data.data);
        setTotalItems(response.data.totalItems);
      } catch (err) {
        setError('Failed to load requests');
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentPage]);

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: Request['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 dark:text-red-400';
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Low':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Request',
      render: (value: string, row: Request) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Type: {row.request_type}
          </div>
          {row.details && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {row.details}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: Request['priority']) => (
        <div className={`flex items-center ${getPriorityColor(value)}`}>
          <Flag size={16} className="mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: 'assigned_to_name',
      header: 'Assigned To',
      render: (value: string | null) => (
        <div className="flex items-center text-gray-900 dark:text-white">
          <User size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {value || 'Unassigned'}
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
      render: (value: Request['status']) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
  ];

  const actionButtons = (
    <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
      <Plus size={18} className="mr-2" />
      New Request
    </button>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Requests</h1>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={requests}
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          title="All Requests"
          actionButtons={actionButtons}
          isLoading={loading}
        />
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg mt-6">
          <AlertCircle size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Requests Yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Get started by submitting your first request
          </p>
        </div>
      )}
    </div>
  );
};

export default Requests;
