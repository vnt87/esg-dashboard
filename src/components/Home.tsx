import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

const House = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-gray-500 hover:text-gray-700">
          <House size={16} className="mr-2" />
        </Link>
      </div>
    </div>
  );
};

export default House;
