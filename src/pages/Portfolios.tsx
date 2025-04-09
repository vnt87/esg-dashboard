import { useState, useEffect } from 'react';
import { Plus, Building2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import DataTable from '../components/DataTable';

interface Portfolio {
  portfolio_id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: string;
  last_updated: string;
  company_count: number;
}

const PAGE_SIZE = 10;

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        // For now, we'll hardcode user_id as 1 since we don't have auth yet
        const response = await axios.get(`http://localhost:3001/api/portfolios/1?page=${currentPage}&limit=${PAGE_SIZE}`);
        setPortfolios(response.data.data);
        setTotalItems(response.data.totalItems);
      } catch (err) {
        setError('Failed to load portfolios');
        console.error('Error fetching portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [currentPage]);

  const columns = [
    {
      key: 'name',
      header: 'Portfolio Name',
      render: (value: string, row: Portfolio) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          {row.description && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {row.description}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'company_count',
      header: 'Companies',
      render: (value: number) => (
        <div className="flex items-center">
          <Building2 size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {value} {value === 1 ? 'company' : 'companies'}
        </div>
      ),
    },
    {
      key: 'last_updated',
      header: 'Last Updated',
      render: (value: string) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: Portfolio) => (
        <div className="flex space-x-3">
          <button
            onClick={() => {/* TODO: Implement edit */}}
            className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
          >
            Edit
          </button>
          {row.company_count === 0 && (
            <div className="flex items-center text-amber-600 dark:text-amber-400">
              <AlertCircle size={16} className="mr-1" />
              Empty
            </div>
          )}
        </div>
      ),
    },
  ];

  const actionButtons = (
    <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
      <Plus size={18} className="mr-2" />
      Create Portfolio
    </button>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Portfolios</h1>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={portfolios}
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          title="All Portfolios"
          actionButtons={actionButtons}
          isLoading={loading}
        />
      )}

      {!loading && !error && portfolios.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg mt-6">
          <Building2 size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Portfolios Yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Get started by creating your first portfolio
          </p>
        </div>
      )}
    </div>
  );
};

export default Portfolios;
