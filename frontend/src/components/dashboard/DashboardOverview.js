import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    pendingAnalyses: 0,
    completedAnalyses: 0,
    findings: 0,
    upcomingAppointments: 0
  });
  
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'patient');
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you'd fetch this data from your API
        // For demo purposes, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if role has changed
        const storedRole = localStorage.getItem('userRole');
        if (storedRole && storedRole !== userRole) {
          setUserRole(storedRole);
        }
        
        // Mock statistics based on user role
        const mockStats = {
          totalScans: userRole === 'doctor' ? 247 : 12,
          pendingAnalyses: userRole === 'doctor' ? 18 : 0,
          completedAnalyses: userRole === 'doctor' ? 229 : 12,
          findings: userRole === 'doctor' ? 167 : 8,
          upcomingAppointments: userRole === 'doctor' ? 34 : 2
        };
        
        // Mock recent scans
        const mockRecentScans = [
          {
            id: 'scan-001',
            patient_name: userRole === 'doctor' ? 'Alice Johnson' : 'John Doe',
            scan_type: 'X-Ray',
            body_part: 'Chest',
            date: '2023-05-10T14:30:00Z',
            status: 'Completed',
            findings: 2,
            doctor: userRole === 'doctor' ? 'Self' : 'Dr. Sarah Johnson'
          },
          {
            id: 'scan-002',
            patient_name: userRole === 'doctor' ? 'Robert Smith' : 'John Doe',
            scan_type: 'MRI',
            body_part: 'Brain',
            date: '2023-05-08T10:15:00Z',
            status: 'Completed',
            findings: 0,
            doctor: userRole === 'doctor' ? 'Self' : 'Dr. David Chen'
          },
          {
            id: 'scan-003',
            patient_name: userRole === 'doctor' ? 'Emma Davis' : 'John Doe',
            scan_type: 'CT Scan',
            body_part: 'Abdomen',
            date: '2023-05-05T09:00:00Z',
            status: 'Completed',
            findings: 1,
            doctor: userRole === 'doctor' ? 'Self' : 'Dr. Sarah Johnson'
          },
          {
            id: 'scan-004',
            patient_name: userRole === 'doctor' ? 'Michael Wilson' : 'John Doe',
            scan_type: 'X-Ray',
            body_part: 'Shoulder',
            date: '2023-05-01T16:45:00Z',
            status: 'Completed',
            findings: 3,
            doctor: userRole === 'doctor' ? 'Dr. James Lee' : 'Dr. Robert Anderson'
          },
          {
            id: 'scan-005',
            patient_name: userRole === 'doctor' ? 'Sophia Martinez' : 'John Doe',
            scan_type: 'Ultrasound',
            body_part: 'Thyroid',
            date: '2023-04-28T11:30:00Z',
            status: 'Completed',
            findings: 0,
            doctor: userRole === 'doctor' ? 'Self' : 'Dr. Emily Wilson'
          }
        ];
        
        setStats(mockStats);
        setRecentScans(mockRecentScans);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [userRole]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to handle new scan upload
  const handleNewScan = () => {
    // In a real app, this would open a modal or redirect to upload page
    alert('This would open the scan upload functionality in a real app');
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6 h-32"></div>
          ))}
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-8 h-64"></div>
        <div className="bg-gray-800 rounded-lg p-6 h-64"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Data</h3>
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
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload New Scan
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 shadow-md border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Total Scans</p>
              <p className="text-white text-2xl font-bold mt-1">{stats.totalScans}</p>
            </div>
            <div className="p-3 bg-blue-800 bg-opacity-50 rounded-full">
              <svg className="h-6 w-6 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 flex items-center">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              8% increase
            </span>
            <span className="text-blue-300 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 shadow-md border border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Analyses</p>
              <p className="text-white text-2xl font-bold mt-1">{stats.completedAnalyses}</p>
            </div>
            <div className="p-3 bg-purple-800 bg-opacity-50 rounded-full">
              <svg className="h-6 w-6 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 flex items-center">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12% increase
            </span>
            <span className="text-purple-300 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 shadow-md border border-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-300 text-sm font-medium">Findings</p>
              <p className="text-white text-2xl font-bold mt-1">{stats.findings}</p>
            </div>
            <div className="p-3 bg-red-800 bg-opacity-50 rounded-full">
              <svg className="h-6 w-6 text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-400 flex items-center">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              3% decrease
            </span>
            <span className="text-red-300 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 shadow-md border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Appointments</p>
              <p className="text-white text-2xl font-bold mt-1">{stats.upcomingAppointments}</p>
            </div>
            <div className="p-3 bg-green-800 bg-opacity-50 rounded-full">
              <svg className="h-6 w-6 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 flex items-center">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              5% increase
            </span>
            <span className="text-green-300 ml-2">vs last month</span>
          </div>
        </div>
      </div>
      
      {/* Recent Scans Table */}
      <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Recent Scans</h2>
          <Link to="/dashboard/history" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-750">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {user.role === 'doctor' ? 'Patient' : 'Scan ID'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Findings
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {user.role === 'doctor' ? 'Ordered By' : 'Doctor'}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {recentScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {user.role === 'doctor' ? scan.patient_name : scan.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{scan.scan_type}</div>
                    <div className="text-xs text-gray-500">{scan.body_part}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{formatDate(scan.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                      {scan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.findings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {scan.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/analyses?id=${scan.id}`} className="text-blue-400 hover:text-blue-300 mr-3">
                      View
                    </Link>
                    <button className="text-purple-400 hover:text-purple-300">
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Health Recommendations */}
      <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Health Recommendations</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-blue-900 bg-opacity-50 rounded-full">
                  <svg className="h-6 w-6 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Hydration Reminder</h3>
                  <p className="mt-1 text-gray-400 text-sm">
                    Staying hydrated is essential for kidney health. Aim for 8-10 glasses of water daily.
                  </p>
                  <a href="#" className="mt-2 inline-flex text-sm text-blue-400 hover:text-blue-300">
                    Learn more
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-green-900 bg-opacity-50 rounded-full">
                  <svg className="h-6 w-6 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Vision Exercises</h3>
                  <p className="mt-1 text-gray-400 text-sm">
                    Take regular screen breaks using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.
                  </p>
                  <a href="#" className="mt-2 inline-flex text-sm text-blue-400 hover:text-blue-300">
                    Learn more
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-purple-900 bg-opacity-50 rounded-full">
                  <svg className="h-6 w-6 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Social Wellness</h3>
                  <p className="mt-1 text-gray-400 text-sm">
                    Maintaining social connections is crucial for mental health. Try to connect with friends or family at least once a week.
                  </p>
                  <a href="#" className="mt-2 inline-flex text-sm text-blue-400 hover:text-blue-300">
                    Learn more
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-red-900 bg-opacity-50 rounded-full">
                  <svg className="h-6 w-6 text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-medium">Heart Health</h3>
                  <p className="mt-1 text-gray-400 text-sm">
                    Based on your recent scan, consider increasing cardio exercise to 150 minutes per week for optimal heart health.
                  </p>
                  <a href="#" className="mt-2 inline-flex text-sm text-blue-400 hover:text-blue-300">
                    Learn more
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
