import { useState, useEffect } from 'react';
import { Plus, Globe, Users, Calendar } from 'lucide-react';
import axios from 'axios';
import DataTable from '../components/DataTable';

interface Company {
  company_id: number;
  name: string;
  industry: string;
  location: string;
  website: string;
  employee_count: number;
  founded_year: number;
  description: string;
  created_at: string;
}

const PAGE_SIZE = 10;

const CompanyDirectory = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/companies?page=${currentPage}&limit=${PAGE_SIZE}`);
        setCompanies(response.data.data);
        setTotalItems(response.data.totalItems);
      } catch (err) {
        setError('Failed to load companies');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  const columns = [
    {
      key: 'name',
      header: 'Company Name',
    },
    {
      key: 'industry',
      header: 'Industry',
    },
    {
      key: 'location',
      header: 'Location',
    },
    {
      key: 'website',
      header: 'Website',
      render: (value: string) => (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
        >
          <Globe size={16} className="mr-1" />
          {value}
        </a>
      ),
    },
    {
      key: 'employee_count',
      header: 'Employees',
      render: (value: number) => (
        <div className="flex items-center">
          <Users size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {value.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'founded_year',
      header: 'Founded',
      render: (value: number) => (
        <div className="flex items-center">
          <Calendar size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
          {value}
        </div>
      ),
    },
  ];

  const actionButtons = (
    <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
      <Plus size={18} className="mr-2" />
      Add Company
    </button>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Company Directory</h1>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          data={companies}
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          title="All Companies"
          actionButtons={actionButtons}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default CompanyDirectory;
