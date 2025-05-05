import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DashboardHistory = () => {
  // Scan history data
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'patient');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [scansPerPage, setScansPerPage] = useState(10);
  
  // Filtering state
  const [filters, setFilters] = useState({
    scanType: '',
    bodyPart: '',
    dateRange: '',
    findingsStatus: '',
    search: ''
  });
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  
  // Fetch scan history
  useEffect(() => {
    const fetchScanHistory = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch the data from the API
        // For demo purposes, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock scan history data
        const mockScans = [];
        
        // Different data based on user role
        if (user.role === 'doctor') {
          // Generate more scans for doctor role
          const patients = ['Alice Johnson', 'Robert Smith', 'Emma Davis', 'Michael Wilson', 'Sophia Martinez', 'David Lee', 'Olivia Brown', 'William Taylor', 'Emily White', 'James Anderson'];
          const scanTypes = ['X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'PET Scan'];
          const bodyParts = ['Chest', 'Brain', 'Abdomen', 'Knee', 'Shoulder', 'Spine', 'Pelvis', 'Hand', 'Foot', 'Neck'];
          
          for (let i = 1; i <= 50; i++) {
            const hasFindings = Math.random() > 0.3;
            const findingsCount = hasFindings ? Math.floor(Math.random() * 5) + 1 : 0;
            const patientIndex = Math.floor(Math.random() * patients.length);
            const scanTypeIndex = Math.floor(Math.random() * scanTypes.length);
            const bodyPartIndex = Math.floor(Math.random() * bodyParts.length);
            
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 180)); // Random date within last 180 days
            
            mockScans.push({
              id: `scan-${i.toString().padStart(3, '0')}`,
              patient_name: patients[patientIndex],
              scan_type: scanTypes[scanTypeIndex],
              body_part: bodyParts[bodyPartIndex],
              date: date.toISOString(),
              status: 'Completed',
              findings: findingsCount,
              doctor: 'Self',
              facility: 'General Hospital Radiology',
              notes: hasFindings ? 'Requires follow-up' : 'No significant findings'
            });
          }
        } else {
          // Generate fewer scans for patient role
          const scanTypes = ['X-Ray', 'MRI', 'CT Scan', 'Ultrasound'];
          const bodyParts = ['Chest', 'Brain', 'Abdomen', 'Knee', 'Shoulder'];
          const doctors = ['Dr. Sarah Johnson', 'Dr. David Chen', 'Dr. Emily Wilson', 'Dr. Robert Anderson'];
          
          for (let i = 1; i <= 15; i++) {
            const hasFindings = Math.random() > 0.3;
            const findingsCount = hasFindings ? Math.floor(Math.random() * 3) + 1 : 0;
            const scanTypeIndex = Math.floor(Math.random() * scanTypes.length);
            const bodyPartIndex = Math.floor(Math.random() * bodyParts.length);
            const doctorIndex = Math.floor(Math.random() * doctors.length);
            
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 120)); // Random date within last 120 days
            
            mockScans.push({
              id: `scan-${i.toString().padStart(3, '0')}`,
              patient_name: `${user.first_name} ${user.last_name}`,
              scan_type: scanTypes[scanTypeIndex],
              body_part: bodyParts[bodyPartIndex],
              date: date.toISOString(),
              status: 'Completed',
              findings: findingsCount,
              doctor: doctors[doctorIndex],
              facility: 'General Hospital Radiology',
              notes: hasFindings ? 'Requires follow-up' : 'No significant findings'
            });
          }
        }
        
        setScans(mockScans);
        setFilteredScans(mockScans);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching scan history:', err);
        setError('Failed to load scan history');
        setLoading(false);
      }
    };
    
    fetchScanHistory();
  }, [user]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...scans];
    
    // Apply filters
    if (filters.scanType) {
      result = result.filter(scan => scan.scan_type === filters.scanType);
    }
    
    if (filters.bodyPart) {
      result = result.filter(scan => scan.body_part === filters.bodyPart);
    }
    
    if (filters.dateRange) {
      const now = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case 'last30days':
          startDate = new Date(now.setDate(now.getDate() - 30));
          break;
        case 'last90days':
          startDate = new Date(now.setDate(now.getDate() - 90));
          break;
        case 'last6months':
          startDate = new Date(now.setMonth(now.getMonth() - 6));
          break;
        case 'last1year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        result = result.filter(scan => new Date(scan.date) >= startDate);
      }
    }
    
    if (filters.findingsStatus) {
      if (filters.findingsStatus === 'withFindings') {
        result = result.filter(scan => scan.findings > 0);
      } else if (filters.findingsStatus === 'noFindings') {
        result = result.filter(scan => scan.findings === 0);
      }
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(scan => 
        scan.id.toLowerCase().includes(searchLower) ||
        scan.patient_name.toLowerCase().includes(searchLower) ||
        scan.scan_type.toLowerCase().includes(searchLower) ||
        scan.body_part.toLowerCase().includes(searchLower) ||
        scan.doctor.toLowerCase().includes(searchLower) ||
        scan.facility.toLowerCase().includes(searchLower) ||
        (scan.notes && scan.notes.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredScans(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [scans, filters, sortConfig]);
  
  // Pagination logic
  const indexOfLastScan = currentPage * scansPerPage;
  const indexOfFirstScan = indexOfLastScan - scansPerPage;
  const currentScans = filteredScans.slice(indexOfFirstScan, indexOfLastScan);
  const totalPages = Math.ceil(filteredScans.length / scansPerPage);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };
  
  // Handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <svg className="h-3 w-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ) : (
      <svg className="h-3 w-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    );
  };
  
  // Get unique values for filter dropdowns
  const getUniqueValues = (key) => {
    return [...new Set(scans.map(scan => scan[key]))].sort();
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      scanType: '',
      bodyPart: '',
      dateRange: '',
      findingsStatus: '',
      search: ''
    });
    setSortConfig({
      key: 'date',
      direction: 'desc'
    });
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-800 rounded mb-6"></div>
        <div className="h-[calc(100vh-18rem)] bg-gray-800 rounded-lg"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Scan History</h3>
        <p className="text-red-300 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Scan History</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print History
          </button>
          <button
            onClick={() => alert('Export functionality would be implemented here')}
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Clear All Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search scans..."
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          
          {/* Scan Type */}
          <div>
            <label htmlFor="scanType" className="block text-sm font-medium text-gray-400 mb-1">
              Scan Type
            </label>
            <select
              id="scanType"
              value={filters.scanType}
              onChange={(e) => handleFilterChange('scanType', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Types</option>
              {getUniqueValues('scan_type').map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Body Part */}
          <div>
            <label htmlFor="bodyPart" className="block text-sm font-medium text-gray-400 mb-1">
              Body Part
            </label>
            <select
              id="bodyPart"
              value={filters.bodyPart}
              onChange={(e) => handleFilterChange('bodyPart', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Body Parts</option>
              {getUniqueValues('body_part').map((part) => (
                <option key={part} value={part}>{part}</option>
              ))}
            </select>
          </div>
          
          {/* Date Range */}
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-400 mb-1">
              Date Range
            </label>
            <select
              id="dateRange"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Time</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="last6months">Last 6 Months</option>
              <option value="last1year">Last Year</option>
            </select>
          </div>
          
          {/* Findings Status */}
          <div>
            <label htmlFor="findingsStatus" className="block text-sm font-medium text-gray-400 mb-1">
              Findings Status
            </label>
            <select
              id="findingsStatus"
              value={filters.findingsStatus}
              onChange={(e) => handleFilterChange('findingsStatus', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Status</option>
              <option value="withFindings">With Findings</option>
              <option value="noFindings">No Findings</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-400">
          Showing <span className="text-white font-medium">{filteredScans.length}</span> {filteredScans.length === 1 ? 'result' : 'results'}
          {Object.values(filters).some(filter => filter !== '') && ' with applied filters'}
        </p>
        
        <div className="flex items-center">
          <label htmlFor="scansPerPage" className="text-sm text-gray-400 mr-2">
            Show:
          </label>
          <select
            id="scansPerPage"
            value={scansPerPage}
            onChange={(e) => setScansPerPage(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      {/* Scans Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-750">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => requestSort('id')} 
                    className="flex items-center focus:outline-none"
                  >
                    Scan ID
                    {getSortDirectionIndicator('id')}
                  </button>
                </th>
                {user.role === 'doctor' && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button 
                      onClick={() => requestSort('patient_name')} 
                      className="flex items-center focus:outline-none"
                    >
                      Patient
                      {getSortDirectionIndicator('patient_name')}
                    </button>
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => requestSort('scan_type')} 
                    className="flex items-center focus:outline-none"
                  >
                    Type
                    {getSortDirectionIndicator('scan_type')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => requestSort('date')} 
                    className="flex items-center focus:outline-none"
                  >
                    Date
                    {getSortDirectionIndicator('date')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => requestSort('findings')} 
                    className="flex items-center focus:outline-none"
                  >
                    Findings
                    {getSortDirectionIndicator('findings')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => requestSort('doctor')} 
                    className="flex items-center focus:outline-none"
                  >
                    {user.role === 'doctor' ? 'Ordered By' : 'Doctor'}
                    {getSortDirectionIndicator('doctor')}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {currentScans.length > 0 ? (
                currentScans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{scan.id}</div>
                    </td>
                    {user.role === 'doctor' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{scan.patient_name}</div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{scan.scan_type}</div>
                      <div className="text-xs text-gray-500">{scan.body_part}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{formatDate(scan.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {scan.findings > 0 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900 text-yellow-300">
                          {scan.findings} {scan.findings === 1 ? 'Finding' : 'Findings'}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                          No Findings
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {scan.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {scan.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/dashboard/analyses?id=${scan.id}`} 
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        View
                      </Link>
                      <button 
                        className="text-purple-400 hover:text-purple-300"
                        onClick={() => alert(`Share functionality would be implemented here for scan ${scan.id}`)}
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={user.role === 'doctor' ? 8 : 7} 
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg className="h-10 w-10 text-gray-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <p className="text-lg font-medium text-gray-400 mb-1">No scans found</p>
                      <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {filteredScans.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstScan + 1} to {Math.min(indexOfLastScan, filteredScans.length)} of {filteredScans.length} entries
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              
              // Calculate page numbers to show
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else {
                if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } transition-colors`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHistory;
