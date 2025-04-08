import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ChevronLeft, Pencil, FileText, Info, Home, ChevronDown } from 'lucide-react';

const DisclosureView = () => {
  const { id } = useParams();
  const [facilityCount, setFacilityCount] = useState('34556');
  const [currentStep, setCurrentStep] = useState(1); // 1: Draft, 2: Review, 3: Completed

  return (
    <div className="p-6">
      <div className="flex items-center">
        <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <Home size={16} />
        </Link>
        <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
        <Link to="/disclosures" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          Disclosures
        </Link>
        <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
        <span className="text-gray-700 dark:text-gray-300">Funki A/S</span>
      </div>

      <div className="mt-6 flex items-center">
        <ChevronLeft size={20} className="mr-2" />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">SASB Toys & Sporting Goods</h1>
      </div>

      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Review Disclosure
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Manage Evidence
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mt-6">
          <div className="flex-1 flex items-center">
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
              currentStep >= 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {currentStep >= 1 ? <Check size={20} /> : '1'}
            </div>
            <div className="text-center mx-2">
              <div className="text-sm font-medium">Draft</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pencil Disclosure</div>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
              currentStep >= 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {currentStep >= 2 ? <Check size={20} /> : <Pencil size={16} />}
            </div>
            <div className="text-center mx-2">
              <div className="text-sm font-medium">Review</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Review your Data</div>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          
          <div className="flex items-center">
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
              currentStep >= 3 ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {currentStep >= 3 ? <Check size={20} /> : <FileText size={16} />}
            </div>
            <div className="text-center mx-2">
              <div className="text-sm font-medium">Completed</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Your disclosure is Complete</div>
            </div>
          </div>
        </div>

        {/* Disclosure Table */}
        <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden transition-colors">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr className="text-gray-500 dark:text-gray-400">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disclosure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disclosure Type</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Funki A/S</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">SASB Toys & Sporting Goods</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ff</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">31/10/2022 12:12</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No Documents</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Corporate Disclosure</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Facility Audit Form */}
        <div className="mt-8">
          <Link to="#" className="text-teal-500 hover:underline">&lt;&lt; Back</Link>
          
          <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 transition-colors">
            <div className="font-medium text-lg mb-6 text-gray-900 dark:text-white">
              Business Model & Innovation / Supply Chain Management / Labor Conditions in the Supply Chain
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-md mb-6 overflow-hidden">
              <div className="flex justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Supply Chain Management</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">0 / 2 questions answered</div>
                </div>
                <div>
                  <button className="p-1">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-md mb-6 overflow-hidden">
              <div className="flex justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Labor Conditions in the Supply Chain</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">0 / 2 questions answered</div>
                </div>
                <div>
                  <button className="p-1">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Number of facilities audited to a social responsibility code of conduct</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">External ID: CG-TS-430a.1</div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="font-medium text-gray-900 dark:text-white">Number of facilities audited to a social responsibility code of conduct</div>
                  <button className="ml-2 text-gray-500 dark:text-gray-400">
                    <Info size={16} />
                  </button>
                </div>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    value={facilityCount}
                    onChange={(e) => setFacilityCount(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  reset
                </button>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-md">
                  continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclosureView;
