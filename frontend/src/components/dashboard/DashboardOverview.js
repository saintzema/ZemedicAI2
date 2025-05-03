import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardOverview = ({ user, setShowUploadModal }) => {
  const [stats, setStats] = useState({
    totalScans: 0,
    recentScans: [],
    recommendations: []
  });
  
  const [loading, setLoading] = useState(true);
  
  // Mock data - in a real application, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalScans: 12,
        recentScans: [
          { 
            id: 'scan-1', 
            date: '2023-06-15', 
            type: 'X-Ray', 
            region: 'Chest',
            status: 'Analyzed',
            findings: 2,
            confidence: 0.89
          },
          { 
            id: 'scan-2', 
            date: '2023-05-28', 
            type: 'MRI', 
            region: 'Lumbar Spine',
            status: 'Analyzed',
            findings: 3,
            confidence: 0.92
          },
          { 
            id: 'scan-3', 
            date: '2023-04-10', 
            type: 'CT Scan', 
            region: 'Head',
            status: 'Analyzed',
            findings: 1,
            confidence: 0.95
          },
        ],
        recommendations: [
          {
            id: 'rec-1',
            text: 'Schedule follow-up appointment for your chest X-ray',
            severity: 'medium',
            date: '2023-06-30'
          },
          {
            id: 'rec-2',
            text: 'Complete your annual health assessment',
            severity: 'low',
            date: '2023-07-15'
          },
          {
            id: 'rec-3',
            text: 'Review consultation notes from Dr. Johnson',
            severity: 'high',
            date: '2023-06-20'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  // Function to determine severity badge color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const isDoctor = user?.role === 'doctor';
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-800 bg-opacity-40">
              <svg className="h-8 w-8 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">{stats.totalScans}</h2>
              <p className="text-blue-200">Total Scans</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-800 bg-opacity-40">
              <svg className="h-8 w-8 text-purple-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">94%</h2>
              <p className="text-purple-200">Accuracy Rate</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-800 bg-opacity-40">
              <svg className="h-8 w-8 text-indigo-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">Premium</h2>
              <p className="text-indigo-200">Current Plan</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="p-4 bg-blue-700 hover:bg-blue-600 rounded-lg flex flex-col items-center justify-center transition-colors duration-200"
          >
            <svg className="h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-white text-sm font-medium">Upload Scan</span>
          </button>
          
          <Link to="/dashboard/analyses" className="p-4 bg-purple-700 hover:bg-purple-600 rounded-lg flex flex-col items-center justify-center transition-colors duration-200">
            <svg className="h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-white text-sm font-medium">View Analyses</span>
          </Link>
          
          <Link to="/dashboard/history" className="p-4 bg-indigo-700 hover:bg-indigo-600 rounded-lg flex flex-col items-center justify-center transition-colors duration-200">
            <svg className="h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white text-sm font-medium">Scan History</span>
          </Link>
          
          {isDoctor ? (
            <Link to="/dashboard/patients" className="p-4 bg-teal-700 hover:bg-teal-600 rounded-lg flex flex-col items-center justify-center transition-colors duration-200">
              <svg className="h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-white text-sm font-medium">View Patients</span>
            </Link>
          ) : (
            <Link to="/dashboard/doctors" className="p-4 bg-teal-700 hover:bg-teal-600 rounded-lg flex flex-col items-center justify-center transition-colors duration-200">
              <svg className="h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-white text-sm font-medium">My Doctors</span>
            </Link>
          )}
        </div>
      </div>
      
      {/* Recent Scans Table */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Scans</h2>
          <Link to="/dashboard/history" className="text-blue-400 hover:text-blue-300 text-sm">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
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
                  Confidence
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {stats.recentScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-700">
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
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300">
                      {scan.findings} {scan.findings === 1 ? 'finding' : 'findings'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {(scan.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/analyses?id=${scan.id}`} className="text-blue-400 hover:text-blue-300">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Health Recommendations */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Health Recommendations</h2>
        
        <div className="space-y-4">
          {stats.recommendations.map((rec) => (
            <div key={rec.id} className="flex items-start space-x-4 p-4 bg-gray-750 rounded-lg border border-gray-700">
              <div className={`${getSeverityColor(rec.severity)} p-2 rounded-full flex-shrink-0`}>
                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{rec.text}</p>
                <p className="text-gray-400 text-xs mt-1">Due by: {rec.date}</p>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Take Action
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;