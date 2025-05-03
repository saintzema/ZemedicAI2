import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardHistory = ({ user }) => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'all',
    dateRange: 'all',
    sortBy: 'date-desc'
  });
  
  // Fetch scan history (mock data for now)
  useEffect(() => {
    setTimeout(() => {
      const mockScans = [
        { 
          id: 'scan-1', 
          date: '2023-06-15', 
          type: 'X-Ray', 
          region: 'Chest',
          findings: 2,
          doctor: 'Dr. Sarah Johnson',
          hospital: 'Metro General Hospital',
          status: 'Analyzed'
        },
        { 
          id: 'scan-2', 
          date: '2023-05-28', 
          type: 'MRI', 
          region: 'Lumbar Spine',
          findings: 3,
          doctor: 'Dr. Michael Chen',
          hospital: 'University Medical Center',
          status: 'Analyzed'
        },
        { 
          id: 'scan-3', 
          date: '2023-04-10', 
          type: 'CT Scan', 
          region: 'Head',
          findings: 1,
          doctor: 'Dr. Emily Rodriguez',
          hospital: 'Central Clinic',
          status: 'Analyzed'
        },
        { 
          id: 'scan-4', 
          date: '2023-03-22', 
          type: 'X-Ray', 
          region: 'Left Hand',
          findings: 0,
          doctor: 'Dr. James Wilson',
          hospital: 'Orthopedic Specialists',
          status: 'Analyzed'
        },
        { 
          id: 'scan-5', 
          date: '2023-02-14', 
          type: 'MRI', 
          region: 'Right Knee',
          findings: 2,
          doctor: 'Dr. Robert Park',
          hospital: 'Sports Medicine Center',
          status: 'Analyzed'
        },
        { 
          id: 'scan-6', 
          date: '2023-01-05', 
          type: 'X-Ray', 
          region: 'Chest',
          findings: 1,
          doctor: 'Dr. Sarah Johnson',
          hospital: 'Metro General Hospital',
          status: 'Analyzed'
        },
        { 
          id: 'scan-7', 
          date: '2022-11-18', 
          type: 'CT Scan', 
          region: 'Abdomen',
          findings: 3,
          doctor: 'Dr. Lisa Wong',
          hospital: 'Gastroenterology Center',
          status: 'Analyzed'
        },
        { 
          id: 'scan-8', 
          date: '2022-10-09', 
          type: 'MRI', 
          region: 'Brain',
          findings: 0,
          doctor: 'Dr. David Patel',
          hospital: 'Neurology Institute',
          status: 'Analyzed'
        }
      ];
      
      setScans(mockScans);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Apply filters and sorting
  const filteredScans = scans.filter(scan => {
    // Filter by type
    if (filter.type !== 'all' && scan.type.toLowerCase() !== filter.type.toLowerCase()) {
      return false;
    }
    
    // Filter by date range
    if (filter.dateRange !== 'all') {
      const scanDate = new Date(scan.date);
      const today = new Date();
      
      if (filter.dateRange === '30days' && 
         (today - scanDate) > 30 * 24 * 60 * 60 * 1000) {
        return false;
      } else if (filter.dateRange === '90days' && 
                (today - scanDate) > 90 * 24 * 60 * 60 * 1000) {
        return false;
      } else if (filter.dateRange === '1year' && 
                (today - scanDate) > 365 * 24 * 60 * 60 * 1000) {
        return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by selected criteria
    if (filter.sortBy === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    } else if (filter.sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (filter.sortBy === 'findings-desc') {
      return b.findings - a.findings;
    } else if (filter.sortBy === 'findings-asc') {
      return a.findings - b.findings;
    }
    return 0;
  });
  
  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-white">Scan History</h2>
          <p className="text-gray-400 text-sm">View your historical medical scans and analyses</p>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export History</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Scan Type
            </label>
            <select 
              value={filter.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="x-ray">X-Ray</option>
              <option value="mri">MRI</option>
              <option value="ct scan">CT Scan</option>
              <option value="ultrasound">Ultrasound</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date Range
            </label>
            <select 
              value={filter.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Sort By
            </label>
            <select 
              value={filter.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="findings-desc">Findings (Most First)</option>
              <option value="findings-asc">Findings (Least First)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Scan History Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Findings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Facility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {filteredScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      scan.findings > 0 ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {scan.findings} {scan.findings === 1 ? 'finding' : 'findings'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.hospital}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-300">
                      {scan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/dashboard/analyses?id=${scan.id}`} 
                      className="text-blue-400 hover:text-blue-300 mr-3"
                    >
                      View
                    </Link>
                    <button className="text-blue-400 hover:text-blue-300">
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredScans.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-400">No scan history matches your filter criteria.</p>
          </div>
        )}
        
        {filteredScans.length > 0 && (
          <div className="px-6 py-4 bg-gray-750 border-t border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing {filteredScans.length} of {scans.length} scans
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHistory;