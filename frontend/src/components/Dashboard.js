import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import DashboardSidebar from './DashboardSidebar';
import ImageUpload from './ImageUpload';
import MedicalDisclaimer from './MedicalDisclaimer';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login");
        return;
      }
      
      try {
        const response = await axios.get(`${API}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError("Failed to load user profile. Please try logging in again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const handleUploadComplete = (result) => {
    setAnalysisResult(result);
    setActiveTab('results');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-xl">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-red-900 bg-opacity-20 rounded-lg border border-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-white text-xl mb-4">Authentication Error</p>
          <p className="text-red-200 mb-6">{error}</p>
          <button 
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  // Determine if user is a doctor or patient
  const isDoctor = user?.role === 'doctor';
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-purple-900 to-blue-900 px-4 py-3 fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="ZemedicAI Logo" className="h-8 w-8" />
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-blue-800 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                </div>
                <span>{isDoctor ? "Dr. " : ""}{user.first_name} {user.last_name}</span>
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 text-sm bg-red-600 bg-opacity-30 hover:bg-opacity-50 rounded-full transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Dashboard Layout with Sidebar */}
      <div className="flex flex-col md:flex-row pt-16">
        {/* Sidebar */}
        <DashboardSidebar user={user} />
        
        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  Welcome, {isDoctor ? "Dr. " : ""}{user?.first_name} {user?.last_name}
                </h1>
                <p className="text-blue-300">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => setActiveTab('upload')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Analysis
                </button>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-700 mb-6">
              <nav className="flex -mb-px" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`${
                    activeTab === 'upload'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
                >
                  Upload & Analyze
                </button>
                {analysisResult && (
                  <button
                    onClick={() => setActiveTab('results')}
                    className={`${
                      activeTab === 'results'
                        ? 'border-blue-500 text-blue-500'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
                  >
                    Analysis Results
                  </button>
                )}
              </nav>
            </div>
            
            {/* Dashboard Overview Tab Content */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {isDoctor ? (
                    <>
                      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-blue-300 text-sm">Total Analyses</p>
                            <h3 className="text-2xl font-bold text-white mt-1">1,248</h3>
                          </div>
                          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-green-400 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            12% increase
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-blue-300 text-sm">Patients</p>
                            <h3 className="text-2xl font-bold text-white mt-1">347</h3>
                          </div>
                          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-green-400 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            8% increase
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-blue-300 text-sm">My Analyses</p>
                            <h3 className="text-2xl font-bold text-white mt-1">7</h3>
                          </div>
                          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-blue-400 text-sm">
                            Last scan: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-blue-300 text-sm">Health Status</p>
                            <h3 className="text-2xl font-bold text-green-400 mt-1">Good</h3>
                          </div>
                          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-blue-400 text-sm">
                            No critical findings detected
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-300 text-sm">AI Accuracy</p>
                        <h3 className="text-2xl font-bold text-white mt-1">94.8%</h3>
                      </div>
                      <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-green-400 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        1.2% improvement
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Recent Analyses Table */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{isDoctor ? 'Recent Analyses' : 'My Recent Analyses'}</h2>
                  <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-lg overflow-hidden border border-blue-900">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-900 bg-opacity-40">
                        <tr>
                          {isDoctor && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Patient</th>}
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Findings</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Confidence</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-300 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 bg-black bg-opacity-20">
                        {isDoctor ? (
                          // Doctor view - shows data for different patients
                          <>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                    SJ
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-white">Sarah Johnson</div>
                                    <div className="text-sm text-gray-400">ID: 39281</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-white">X-ray</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">March 15, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Pneumonia</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-green-400 text-sm font-semibold">94%</span>
                                  <div className="ml-2 w-20 bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{width: "94%"}}></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-400 hover:text-blue-300">View</a>
                              </td>
                            </tr>
                            
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                    MC
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-white">Michael Chen</div>
                                    <div className="text-sm text-gray-400">ID: 29184</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-900 text-white">MRI</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">March 14, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Lumbar Disc Herniation</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-green-400 text-sm font-semibold">88%</span>
                                  <div className="ml-2 w-20 bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{width: "88%"}}></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-400 hover:text-blue-300">View</a>
                              </td>
                            </tr>
                          </>
                        ) : (
                          // Patient view - shows only their own data
                          <>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-white">X-ray</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">March 10, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No Significant Findings</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-green-400 text-sm font-semibold">98%</span>
                                  <div className="ml-2 w-20 bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{width: "98%"}}></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-400 hover:text-blue-300">View</a>
                              </td>
                            </tr>
                            
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-900 text-white">MRI</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">February 22, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Mild Tendinitis</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-green-400 text-sm font-semibold">91%</span>
                                  <div className="ml-2 w-20 bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{width: "91%"}}></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-400 hover:text-blue-300">View</a>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Additional doctor-specific content */}
                {isDoctor && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Analysis Distribution</h2>
                      <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-lg p-6 border border-blue-900">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-blue-300">X-rays</span>
                              <span className="text-sm text-blue-300">64%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: "64%"}}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-blue-300">MRIs</span>
                              <span className="text-sm text-blue-300">28%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{width: "28%"}}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-blue-300">CT Scans</span>
                              <span className="text-sm text-blue-300">8%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{width: "8%"}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Custom Model Training</h2>
                      <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-lg p-6 border border-blue-900">
                        <p className="text-blue-300 mb-4">Your latest model is trained with 5,241 images and has improved detection accuracy by 2.3%.</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-blue-300">Training Progress</span>
                            <div className="mt-1 w-40 bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: "100%"}}></div>
                            </div>
                            <span className="text-xs text-green-400">Completed</span>
                          </div>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300">Train New Model</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Patient-specific content */}
                {!isDoctor && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Health Insights</h2>
                      <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-lg p-6 border border-blue-900">
                        <p className="text-blue-300 mb-4">Based on your scan history, our AI recommends:</p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Regular physical activity for joint health</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Next chest X-ray recommended in 12 months</span>
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Continue monitoring wrist mobility</span>
                          </li>
                        </ul>
                        <div className="mt-6 border-t border-blue-900 pt-4">
                          <p className="text-sm text-blue-400 italic">
                            *These are AI-generated suggestions and should not replace professional medical advice. Always consult with your healthcare provider.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Your Doctors</h2>
                      <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-lg p-6 border border-blue-900">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                              JW
                            </div>
                            <div className="ml-3">
                              <p className="text-white font-medium">Dr. James Wilson</p>
                              <p className="text-sm text-blue-300">Primary Physician</p>
                              <button className="mt-1 text-xs text-blue-400 hover:text-blue-300">
                                Share results
                              </button>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                              RL
                            </div>
                            <div className="ml-3">
                              <p className="text-white font-medium">Dr. Rachel Lee</p>
                              <p className="text-sm text-blue-300">Orthopedic Specialist</p>
                              <button className="mt-1 text-xs text-blue-400 hover:text-blue-300">
                                Share results
                              </button>
                            </div>
                          </div>
                          <button className="mt-4 w-full px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900 hover:bg-opacity-30 text-sm">
                            Add New Doctor
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Upload & Analyze Tab Content */}
            {activeTab === 'upload' && (
              <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-xl border border-blue-900 p-6">
                <h2 className="text-xl font-semibold mb-6">Upload & Analyze Medical Images</h2>
                <ImageUpload onUploadComplete={handleUploadComplete} />
              </div>
            )}
            
            {/* Analysis Results Tab Content */}
            {activeTab === 'results' && analysisResult && (
              <div className="bg-gradient-to-br from-blue-950 to-purple-950 bg-opacity-40 rounded-xl border border-blue-900 p-6">
                <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Preview */}
                  <div className="lg:col-span-2">
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={analysisResult.imageUrl} 
                        alt="Analyzed Medical Image" 
                        className="w-full h-auto"
                      />
                      
                      {/* Markers for findings */}
                      {analysisResult.findings.map((finding, index) => {
                        // Position markers in different places based on the index
                        const positions = [
                          { top: '30%', left: '40%' },
                          { top: '50%', left: '60%' },
                          { top: '45%', left: '30%' },
                          { top: '60%', left: '50%' },
                          { top: '25%', left: '55%' }
                        ];
                        const position = positions[index % positions.length];
                        
                        // Color based on severity
                        let color;
                        switch(finding.severity?.toLowerCase()) {
                          case 'severe':
                            color = 'border-red-500 bg-red-500';
                            break;
                          case 'moderate':
                            color = 'border-yellow-500 bg-yellow-500';
                            break;
                          default:
                            color = 'border-green-500 bg-green-500';
                        }
                        
                        return (
                          <div 
                            key={index}
                            className={`absolute w-6 h-6 rounded-full border-2 ${color} bg-opacity-50 animate-pulse-slow`}
                            style={{ 
                              top: position.top, 
                              left: position.left,
                              animationDelay: `${index * 0.2}s`
                            }}
                          ></div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Image Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black bg-opacity-40 rounded-lg p-4">
                          <p className="text-sm text-blue-300">Image Type</p>
                          <p className="text-lg text-white">{analysisResult.imageType?.toUpperCase()}</p>
                        </div>
                        <div className="bg-black bg-opacity-40 rounded-lg p-4">
                          <p className="text-sm text-blue-300">Analysis Date</p>
                          <p className="text-lg text-white">{new Date(analysisResult.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Analysis Details */}
                  <div className="bg-black bg-opacity-40 rounded-lg p-6 border border-blue-800 h-fit">
                    <h3 className="text-lg font-semibold mb-4">Analysis Findings</h3>
                    
                    <div className="space-y-6">
                      {analysisResult.findings.map((finding, index) => {
                        // Determine confidence score for this finding
                        const confidenceScore = analysisResult.confidenceScores[finding.name] || 0;
                        let confidenceColor;
                        if (confidenceScore > 0.9) {
                          confidenceColor = 'text-green-400';
                        } else if (confidenceScore > 0.7) {
                          confidenceColor = 'text-yellow-400';
                        } else {
                          confidenceColor = 'text-red-400';
                        }
                        
                        return (
                          <div key={index} className="pb-4 border-b border-blue-900">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-white">{finding.name}</h4>
                              <span className={`${confidenceColor} font-semibold`}>
                                {Math.round(confidenceScore * 100)}%
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <div className="w-full bg-gray-800 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    confidenceScore > 0.9 ? 'bg-green-500' : 
                                    confidenceScore > 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`} 
                                  style={{width: `${confidenceScore * 100}%`}}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-blue-400">Location</p>
                                <p className="text-white">{finding.location || 'Not specified'}</p>
                              </div>
                              <div>
                                <p className="text-blue-400">Severity</p>
                                <p className="text-white">{finding.severity || 'Not specified'}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-blue-900">
                      <h4 className="font-medium text-blue-300 mb-2">AI Recommendations</h4>
                      <p className="text-sm text-white mb-4">
                        {analysisResult.findings.length > 0 
                          ? `Based on the ${analysisResult.findings[0].name} finding, we recommend follow-up with a specialist within 2 weeks.`
                          : 'No significant findings detected. Routine follow-up recommended.'}
                      </p>
                      
                      <div className="flex flex-col space-y-3 mt-6">
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-300 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Report
                        </button>
                        <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share with Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <MedicalDisclaimer position="bottom" />
    </div>
  );
};

export default Dashboard;