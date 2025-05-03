import React, { useState, useEffect } from 'react';

const DashboardRecords = ({ user }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch health records (mock data for now)
  useEffect(() => {
    setTimeout(() => {
      const mockRecords = [
        {
          id: 'rec-1',
          title: 'Annual Physical Examination',
          date: '2023-06-01',
          doctor: 'Dr. Sarah Johnson',
          facility: 'Metro General Hospital',
          category: 'physical',
          notes: 'General health is good. Blood pressure slightly elevated at 135/85. Weight is stable. Recommended continued exercise and reduced sodium intake.',
          attachments: ['Physical_Exam_Report_Jun2023.pdf'],
          confidential: false
        },
        {
          id: 'rec-2',
          title: 'Lung CT Scan Results',
          date: '2023-05-28',
          doctor: 'Dr. Michael Chen',
          facility: 'University Medical Center',
          category: 'imaging',
          notes: 'CT scan shows small area of inflammation in right lower lobe, consistent with mild pneumonia. Follow-up exam recommended in 2 weeks.',
          attachments: ['CT_Scan_Report_May2023.pdf', 'CT_Scan_Images_May2023.zip'],
          confidential: true
        },
        {
          id: 'rec-3',
          title: 'Vaccination - Influenza',
          date: '2023-04-15',
          doctor: 'Dr. Emily Rodriguez',
          facility: 'Central Clinic',
          category: 'immunization',
          notes: 'Annual influenza vaccine administered. No adverse reactions observed.',
          attachments: ['Vaccination_Record_Apr2023.pdf'],
          confidential: false
        },
        {
          id: 'rec-4',
          title: 'Lab Results - Complete Blood Count',
          date: '2023-03-10',
          doctor: 'Dr. James Wilson',
          facility: 'Metro General Hospital',
          category: 'laboratory',
          notes: 'All values within normal range. Slight elevation in white blood cell count but not clinically significant.',
          attachments: ['CBC_Results_Mar2023.pdf'],
          confidential: false
        },
        {
          id: 'rec-5',
          title: 'Cardiology Consultation',
          date: '2023-02-22',
          doctor: 'Dr. Lisa Wong',
          facility: 'Heart & Vascular Clinic',
          category: 'consultation',
          notes: 'Evaluation for occasional chest discomfort. ECG normal. Stress test scheduled for next month.',
          attachments: ['Cardiology_Consult_Feb2023.pdf', 'ECG_Results_Feb2023.pdf'],
          confidential: false
        },
        {
          id: 'rec-6',
          title: 'Prescription - Lisinopril',
          date: '2023-02-22',
          doctor: 'Dr. Lisa Wong',
          facility: 'Heart & Vascular Clinic',
          category: 'medication',
          notes: 'Prescribed for blood pressure management. 10mg once daily.',
          attachments: ['Prescription_Lisinopril_Feb2023.pdf'],
          confidential: false
        },
        {
          id: 'rec-7',
          title: 'Allergy Test Results',
          date: '2023-01-15',
          doctor: 'Dr. David Patel',
          facility: 'Allergy & Immunology Center',
          category: 'laboratory',
          notes: 'Positive reactions to dust mites and cat dander. Negative for food allergies tested.',
          attachments: ['Allergy_Test_Results_Jan2023.pdf'],
          confidential: false
        }
      ];
      
      setRecords(mockRecords);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter records based on active category and search query
  const filteredRecords = records.filter(record => {
    // Filter by category
    if (activeCategory !== 'all' && record.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !record.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
       !record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) &&
       !record.facility.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Record categories for filtering
  const categories = [
    { id: 'all', name: 'All Records' },
    { id: 'physical', name: 'Physical Exams' },
    { id: 'imaging', name: 'Imaging & Scans' },
    { id: 'laboratory', name: 'Lab Results' },
    { id: 'consultation', name: 'Consultations' },
    { id: 'medication', name: 'Medications' },
    { id: 'immunization', name: 'Immunizations' },
    { id: 'surgery', name: 'Surgical Procedures' }
  ];
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'physical':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'imaging':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'laboratory':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'consultation':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'medication':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'immunization':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        );
      case 'surgery':
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          <h2 className="text-xl font-semibold text-white">My Health Records</h2>
          <p className="text-gray-400 text-sm">View and manage your medical history</p>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Record</span>
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center space-x-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Search and Categories */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="relative mb-4">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records by title, doctor, or facility..."
            className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute left-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button 
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1 ${
                activeCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.id !== 'all' && getCategoryIcon(category.id)}
              <span>{category.name}</span>
              {category.id === 'all' && (
                <span className="ml-1 bg-gray-600 text-xs rounded-full px-2 py-0.5">{records.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Records List */}
      {filteredRecords.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-medium text-white mb-2">No records found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            {searchQuery 
              ? "No health records match your search criteria. Try adjusting your search terms."
              : `No ${activeCategory !== 'all' ? categories.find(c => c.id === activeCategory)?.name.toLowerCase() : 'health records'} found in your medical history.`
            }
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map(record => (
            <div key={record.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-900 text-blue-300">
                      {getCategoryIcon(record.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{record.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {formatDate(record.date)} â¢ {record.facility}
                      </p>
                    </div>
                  </div>
                  
                  {record.confidential && (
                    <span className="px-2 py-1 rounded-full bg-red-900 text-red-300 text-xs font-medium inline-flex items-center">
                      <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Confidential
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-750 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 text-sm">{record.notes}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {record.attachments.map((attachment, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="flex items-center px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {attachment}
                    </a>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-400">
                    Attending Physician: <span className="text-blue-400">{record.doctor}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors">
                      Share
                    </button>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardRecords;