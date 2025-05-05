import React, { useState, useEffect } from 'react';

const DashboardRecords = ({ user }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordType, setRecordType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newRecordData, setNewRecordData] = useState({
    title: '',
    type: 'lab_result',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    file: null
  });
  
  // Fetch records data
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch this data from the API
        // For demo purposes, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock records data
        const mockRecords = [
          {
            id: 'record-001',
            title: 'Annual Physical Examination',
            type: 'examination',
            date: '2023-05-15T10:30:00Z',
            provider: 'Dr. Sarah Johnson',
            facility: 'General Medical Center',
            notes: 'Routine annual physical examination. Patient is in good health. Blood pressure and cholesterol levels are within normal range.',
            file_url: '#',
            file_type: 'pdf',
            file_size: '1.2 MB',
            shared_with: ['Dr. David Chen']
          },
          {
            id: 'record-002',
            title: 'Complete Blood Count (CBC)',
            type: 'lab_result',
            date: '2023-05-14T09:15:00Z',
            provider: 'Quest Diagnostics',
            facility: 'Quest Diagnostics Lab',
            notes: 'Complete blood count shows all values within normal range. No abnormalities detected.',
            file_url: '#',
            file_type: 'pdf',
            file_size: '843 KB',
            shared_with: ['Dr. Sarah Johnson']
          },
          {
            id: 'record-003',
            title: 'Chest X-Ray',
            type: 'imaging',
            date: '2023-05-10T14:45:00Z',
            provider: 'Dr. Robert Anderson',
            facility: 'City Radiology Center',
            notes: 'Chest X-ray performed to rule out pneumonia. No significant findings. Lungs clear. Heart size normal.',
            file_url: '#',
            file_type: 'dicom',
            file_size: '15.6 MB',
            shared_with: ['Dr. Sarah Johnson', 'Dr. David Chen']
          },
          {
            id: 'record-004',
            title: 'Lipid Panel',
            type: 'lab_result',
            date: '2023-05-14T09:15:00Z',
            provider: 'Quest Diagnostics',
            facility: 'Quest Diagnostics Lab',
            notes: 'Total Cholesterol: 185 mg/dL (Desirable: <200 mg/dL)\nHDL: 55 mg/dL (Desirable: >60 mg/dL)\nLDL: 110 mg/dL (Desirable: <100 mg/dL)\nTriglycerides: 120 mg/dL (Desirable: <150 mg/dL)',
            file_url: '#',
            file_type: 'pdf',
            file_size: '756 KB',
            shared_with: ['Dr. Sarah Johnson']
          },
          {
            id: 'record-005',
            title: 'Flu Vaccination',
            type: 'immunization',
            date: '2022-10-05T11:00:00Z',
            provider: 'Nurse Practitioner Emily Wilson',
            facility: 'Walgreens Pharmacy',
            notes: 'Annual influenza vaccination administered. Vaccine type: Quadrivalent. No adverse reactions reported.',
            file_url: '#',
            file_type: 'pdf',
            file_size: '512 KB',
            shared_with: []
          },
          {
            id: 'record-006',
            title: 'Dental Examination',
            type: 'examination',
            date: '2023-03-22T13:30:00Z',
            provider: 'Dr. Michael Rodriguez',
            facility: 'Bright Smile Dental Clinic',
            notes: 'Routine dental check-up and cleaning. No cavities detected. Recommended continued regular brushing and flossing.',
            file_url: '#',
            file_type: 'pdf',
            file_size: '945 KB',
            shared_with: []
          },
          {
            id: 'record-007',
            title: 'Prescription - Lisinopril',
            type: 'prescription',
            date: '2023-05-15T10:45:00Z',
            provider: 'Dr. Sarah Johnson',
            facility: 'General Medical Center',
            notes: 'Lisinopril 10mg, 1 tablet daily for hypertension. 30-day supply with 3 refills.',
            file_url: '#',
            file_type: 'pdf',
            file_size: '624 KB',
            shared_with: []
          },
          {
            id: 'record-008',
            title: 'Abdominal Ultrasound',
            type: 'imaging',
            date: '2023-02-18T09:30:00Z',
            provider: 'Dr. Jessica Lee',
            facility: 'City Radiology Center',
            notes: 'Abdominal ultrasound to evaluate liver. Mild fatty liver changes noted. No masses or other abnormalities detected.',
            file_url: '#',
            file_type: 'dicom',
            file_size: '18.2 MB',
            shared_with: ['Dr. Sarah Johnson']
          }
        ];
        
        setRecords(mockRecords);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching health records:', err);
        setError('Failed to load health records');
        setLoading(false);
      }
    };
    
    fetchRecords();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle sort request
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
  
  // Get record icon based on type
  const getRecordIcon = (type) => {
    switch (type) {
      case 'examination':
        return (
          <div className="p-2 bg-blue-900 bg-opacity-50 rounded-full">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        );
      case 'lab_result':
        return (
          <div className="p-2 bg-green-900 bg-opacity-50 rounded-full">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        );
      case 'imaging':
        return (
          <div className="p-2 bg-purple-900 bg-opacity-50 rounded-full">
            <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'immunization':
        return (
          <div className="p-2 bg-yellow-900 bg-opacity-50 rounded-full">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          </div>
        );
      case 'prescription':
        return (
          <div className="p-2 bg-red-900 bg-opacity-50 rounded-full">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-700 rounded-full">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };
  
  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return (
          <svg className="h-8 w-8 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10.92,12.31C10.68,11.54 10.15,9.08 11.55,9.04C12.95,9 12.03,12.16 12.03,12.16C12.42,13.65 14.05,14.72 14.05,14.72C14.55,14.57 17.4,14.24 17,15.72C16.57,17.2 13.5,15.81 13.5,15.81C11.55,15.95 10.09,16.47 10.09,16.47C8.96,18.58 7.64,19.5 7.1,18.61C6.43,17.5 9.23,16.07 9.23,16.07C10.68,13.72 10.92,12.31 10.92,12.31M11.57,13.15C11.17,14.28 10.91,15.08 10.91,15.08C11.37,15.08 12,14.8 12,14.8C11.81,14.5 11.57,13.15 11.57,13.15M11.31,11.46C11.31,11.46 11.3,12.42 11.62,13.08C11.77,12.3 11.73,11.47 11.73,11.47C11.73,11.47 11.38,11.12 11.31,11.46M14.05,15.8C14.5,15.74 15.06,15.93 15.06,15.93C15.57,15.64 15.07,15.27 14.38,15.46C14.38,15.46 14.31,15.55 14.05,15.8M9.4,16.74C8.53,17 7.85,17.41 7.85,17.41C7.85,17.41 8.68,17.97 9.4,16.74Z" />
          </svg>
        );
      case 'dicom':
        return (
          <svg className="h-8 w-8 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5V19H5V5H19M21 3H3V21H21V3M17 17H7V16H17V17M10 10H8V15H7V8H10V10M12 8H11V15H12V8M15 8H13V15H14V13H15C16.11 13 17 12.11 17 11V10C17 8.9 16.11 8 15 8M15 12H14V9H15V12Z" />
          </svg>
        );
      default:
        return (
          <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };
  
  // Get record type display text
  const getRecordTypeText = (type) => {
    switch (type) {
      case 'examination':
        return 'Medical Examination';
      case 'lab_result':
        return 'Laboratory Result';
      case 'imaging':
        return 'Medical Imaging';
      case 'immunization':
        return 'Immunization Record';
      case 'prescription':
        return 'Prescription';
      default:
        return 'Other Medical Record';
    }
  };
  
  // Filter and sort records
  const filteredAndSortedRecords = React.useMemo(() => {
    // First filter records
    let filteredRecords = records.filter(record => {
      // Apply search filter
      const matchesSearch = !searchQuery || 
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply record type filter
      const matchesType = recordType === 'all' || record.type === recordType;
      
      // Apply date range filter
      let matchesDateRange = true;
      if (dateRange !== 'all') {
        const recordDate = new Date(record.date);
        const now = new Date();
        
        if (dateRange === 'last30days') {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          matchesDateRange = recordDate >= thirtyDaysAgo;
        } else if (dateRange === 'last90days') {
          const ninetyDaysAgo = new Date();
          ninetyDaysAgo.setDate(now.getDate() - 90);
          matchesDateRange = recordDate >= ninetyDaysAgo;
        } else if (dateRange === 'last6months') {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          matchesDateRange = recordDate >= sixMonthsAgo;
        } else if (dateRange === 'lastyear') {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(now.getFullYear() - 1);
          matchesDateRange = recordDate >= oneYearAgo;
        }
      }
      
      return matchesSearch && matchesType && matchesDateRange;
    });
    
    // Then sort records
    if (sortConfig.key) {
      filteredRecords.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredRecords;
  }, [records, searchQuery, recordType, dateRange, sortConfig]);
  
  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewRecordData({
        ...newRecordData,
        file: e.target.files[0]
      });
    }
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecordData({
      ...newRecordData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, we would send this data to the API
    // For demo purposes, we'll just update the state
    
    const fileType = newRecordData.file ? newRecordData.file.name.split('.').pop().toLowerCase() : 'pdf';
    const fileSize = newRecordData.file ? `${(newRecordData.file.size / 1024).toFixed(0)} KB` : '0 KB';
    
    const newRecord = {
      id: `record-${records.length + 1}`.padStart(9, '0'),
      title: newRecordData.title,
      type: newRecordData.type,
      date: new Date(newRecordData.date).toISOString(),
      provider: user.role === 'doctor' ? `Dr. ${user.first_name} ${user.last_name}` : 'Self-uploaded',
      facility: 'ZemedicAI Platform',
      notes: newRecordData.notes,
      file_url: '#',
      file_type: fileType,
      file_size: fileSize,
      shared_with: []
    };
    
    setRecords([newRecord, ...records]);
    setUploadModalOpen(false);
    setNewRecordData({
      title: '',
      type: 'lab_result',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      file: null
    });
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-800 rounded mb-6"></div>
        <div className="h-16 bg-gray-800 rounded-lg mb-6"></div>
        <div className="h-64 bg-gray-800 rounded-lg"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Health Records</h3>
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
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Health Records</h1>
        
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
        >
          <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload Record
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
              Search Records
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, provider..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div>
            <label htmlFor="recordType" className="block text-sm font-medium text-gray-400 mb-1">
              Record Type
            </label>
            <select
              id="recordType"
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="examination">Medical Examinations</option>
              <option value="lab_result">Laboratory Results</option>
              <option value="imaging">Medical Imaging</option>
              <option value="immunization">Immunizations</option>
              <option value="prescription">Prescriptions</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-400 mb-1">
              Date Range
            </label>
            <select
              id="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-400 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split('-');
                setSortConfig({ key, direction });
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="provider-asc">Provider (A-Z)</option>
              <option value="provider-desc">Provider (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
      
      {selectedRecord ? (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              {getRecordIcon(selectedRecord.type)}
              <h2 className="text-lg font-medium text-white ml-3">{selectedRecord.title}</h2>
            </div>
            <button
              onClick={() => setSelectedRecord(null)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Record Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-750 p-3 rounded-md">
                      <p className="text-sm text-gray-400">Record Type</p>
                      <p className="text-white">{getRecordTypeText(selectedRecord.type)}</p>
                    </div>
                    <div className="bg-gray-750 p-3 rounded-md">
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="text-white">{formatDate(selectedRecord.date)}</p>
                    </div>
                    <div className="bg-gray-750 p-3 rounded-md">
                      <p className="text-sm text-gray-400">Provider</p>
                      <p className="text-white">{selectedRecord.provider}</p>
                    </div>
                    <div className="bg-gray-750 p-3 rounded-md">
                      <p className="text-sm text-gray-400">Facility</p>
                      <p className="text-white">{selectedRecord.facility}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Notes</h3>
                  <div className="bg-gray-750 p-4 rounded-md">
                    <p className="text-gray-300 whitespace-pre-line">{selectedRecord.notes}</p>
                  </div>
                </div>
                
                {selectedRecord.shared_with.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Shared With</h3>
                    <div className="bg-gray-750 p-4 rounded-md">
                      <div className="flex flex-wrap gap-2">
                        {selectedRecord.shared_with.map((provider, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-300"
                          >
                            {provider}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">File</h3>
                <div className="bg-gray-750 p-6 rounded-md flex flex-col items-center">
                  {getFileIcon(selectedRecord.file_type)}
                  <p className="text-white font-medium mt-3">{selectedRecord.title}.{selectedRecord.file_type}</p>
                  <p className="text-gray-400 text-sm">{selectedRecord.file_size}</p>
                  
                  <div className="mt-6 flex flex-col w-full space-y-2">
                    <a
                      href={selectedRecord.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View File
                    </a>
                    <a
                      href={selectedRecord.file_url}
                      download
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                    <button
                      onClick={() => alert('This would open a sharing interface')}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {filteredAndSortedRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <button 
                        onClick={() => requestSort('title')} 
                        className="flex items-center focus:outline-none"
                      >
                        Record
                        {getSortDirectionIndicator('title')}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <button 
                        onClick={() => requestSort('type')} 
                        className="flex items-center focus:outline-none"
                      >
                        Type
                        {getSortDirectionIndicator('type')}
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
                        onClick={() => requestSort('provider')} 
                        className="flex items-center focus:outline-none"
                      >
                        Provider
                        {getSortDirectionIndicator('provider')}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredAndSortedRecords.map((record) => (
                    <tr 
                      key={record.id} 
                      className="hover:bg-gray-750 cursor-pointer"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRecordIcon(record.type)}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{record.title}</div>
                            <div className="text-xs text-gray-400 mt-1">{record.file_type.toUpperCase()} • {record.file_size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">
                          {getRecordTypeText(record.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">
                          {formatDate(record.date)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">
                          {record.provider}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(record);
                          }}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`This would share ${record.title}`);
                          }}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Share
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="h-12 w-12 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No Records Found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || recordType !== 'all' || dateRange !== 'all' 
                  ? 'No records match your current filters. Try adjusting your search criteria.'
                  : 'You haven\'t uploaded any health records yet.'}
              </p>
              {!searchQuery && recordType === 'all' && dateRange === 'all' && (
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                >
                  Upload Your First Record
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Upload Record Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-lg w-full">
            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Upload Medical Record</h3>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newRecordData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Annual Physical Examination"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">
                      Record Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={newRecordData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="lab_result">Laboratory Result</option>
                      <option value="examination">Medical Examination</option>
                      <option value="imaging">Medical Imaging</option>
                      <option value="immunization">Immunization</option>
                      <option value="prescription">Prescription</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={newRecordData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={newRecordData.notes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add any additional information about this record..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      File <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div className="flex text-sm text-gray-400">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DICOM, JPG, PNG up to 50MB
                        </p>
                        {newRecordData.file && (
                          <p className="text-sm text-blue-400 mt-2">
                            {newRecordData.file.name} ({(newRecordData.file.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-750 border-t border-gray-700 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Upload Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardRecords;
