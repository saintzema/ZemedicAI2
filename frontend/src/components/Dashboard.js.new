import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import DashboardSidebar from './DashboardSidebar';
import ImageUpload from './ImageUpload';
import MedicalDisclaimer from './MedicalDisclaimer';

// Dashboard sub-components
const DashboardOverview = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
    <p className="text-gray-300">Welcome back, {user?.first_name}! Here's your health overview.</p>
  </div>
);

const DashboardAnalyses = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Your Analyses</h2>
    <p className="text-gray-300">View your previous medical image analyses.</p>
  </div>
);

const DashboardDoctors = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Your Doctors</h2>
    <p className="text-gray-300">Manage your healthcare providers and share results.</p>
  </div>
);

const DashboardSettings = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
    <p className="text-gray-300">Update your profile and preferences.</p>
  </div>
);

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
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to authenticate. Please log in again.");
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);
  
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
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {user?.first_name?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:inline text-white">{user?.first_name || 'User'}</span>
            </div>
            
            <button 
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="text-sm text-blue-200 hover:text-white transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isDoctor={isDoctor}
          setShowUploadModal={setShowUploadModal}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <main className="max-w-5xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">
                {activeTab === 'overview' && 'Dashboard'}
                {activeTab === 'analyses' && 'Your Analyses'}
                {activeTab === 'doctors' && 'Your Doctors'}
                {activeTab === 'settings' && 'Account Settings'}
              </h1>
              <p className="text-blue-300 mt-2">
                {activeTab === 'overview' && 'Welcome to your health dashboard'}
                {activeTab === 'analyses' && 'Review your medical image analyses'}
                {activeTab === 'doctors' && 'Manage your healthcare providers'}
                {activeTab === 'settings' && 'Update your account preferences'}
              </p>
            </div>
            
            {/* Content based on active tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Profile Card */}
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl p-6 shadow-xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.first_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{user?.first_name} {user?.last_name}</h2>
                      <p className="text-blue-200">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-blue-300 text-sm">Account Type</p>
                      <p className="text-white font-medium">{isDoctor ? 'Healthcare Provider' : 'Patient'}</p>
                    </div>
                    
                    <div>
                      <p className="text-blue-300 text-sm">Member Since</p>
                      <p className="text-white font-medium">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                    
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="w-full mt-4 py-2 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition duration-300"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
                  <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setShowUploadModal(true)}
                      className="flex flex-col items-center justify-center p-4 bg-blue-900 hover:bg-blue-800 rounded-lg transition duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                      </svg>
                      <span className="text-sm text-white">Upload Image</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('analyses')}
                      className="flex flex-col items-center justify-center p-4 bg-purple-900 hover:bg-purple-800 rounded-lg transition duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="text-sm text-white">View Analyses</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('doctors')}
                      className="flex flex-col items-center justify-center p-4 bg-green-900 hover:bg-green-800 rounded-lg transition duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm text-white">Doctors</span>
                    </button>
                    
                    <button 
                      className="flex flex-col items-center justify-center p-4 bg-red-900 hover:bg-red-800 rounded-lg transition duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-white">Appointments</span>
                    </button>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
                  <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Image Uploaded</p>
                        <p className="text-blue-300 text-sm">Chest X-Ray</p>
                        <p className="text-gray-400 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Analysis Completed</p>
                        <p className="text-blue-300 text-sm">Pneumonia Detection</p>
                        <p className="text-gray-400 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Appointment Scheduled</p>
                        <p className="text-blue-300 text-sm">Dr. Sarah Johnson</p>
                        <p className="text-gray-400 text-xs">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'analyses' && <DashboardAnalyses user={user} />}
            {activeTab === 'doctors' && <DashboardDoctors user={user} />}
            {activeTab === 'settings' && <DashboardSettings user={user} />}
            
            {/* Analysis Result Modal */}
            {analysisResult && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                      <button 
                        onClick={() => setAnalysisResult(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="relative rounded-lg overflow-hidden border-2 border-blue-700 mb-4">
                          <img 
                            src={analysisResult.imageUrl || '/images/sample-xray.jpg'} 
                            alt="Medical scan" 
                            className="w-full h-auto"
                          />
                          
                          {/* Hotspots */}
                          <div className="absolute inset-0">
                            {analysisResult.hotspots?.map((position, index) => {
                              let color;
                              switch (index % 3) {
                                case 0:
                                  color = 'border-red-500 bg-red-500';
                                  break;
                                case 1:
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
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-3">Image Information</h3>
                          <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
                            <div>
                              <p className="text-blue-400 text-sm">Image Type</p>
                              <p className="text-white">{analysisResult.imageType || 'X-Ray'}</p>
                            </div>
                            <div>
                              <p className="text-blue-400 text-sm">Body Region</p>
                              <p className="text-white">{analysisResult.bodyRegion || 'Chest'}</p>
                            </div>
                            <div>
                              <p className="text-blue-400 text-sm">Date Taken</p>
                              <p className="text-white">{analysisResult.dateTaken || new Date().toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-blue-400 text-sm">Resolution</p>
                              <p className="text-white">{analysisResult.resolution || '2048 x 1536'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Findings</h3>
                        <div className="space-y-1">
                          {analysisResult.findings?.map((finding, index) => {
                            const confidenceScore = finding.confidence || Math.random() * 0.5 + 0.5;
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
                        
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">AI Assessment</h3>
                          <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-800">
                            <p className="text-white leading-relaxed">
                              {analysisResult.assessment || 
                                'Based on the analysis, there are indications of mild pneumonia in the lower right lung. The opacity patterns suggest bacterial infection rather than viral. Recommend follow-up with a pulmonologist and consider antibiotic treatment pending clinical correlation.'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-3 mt-6">
                          <button className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition duration-300">
                            Share with Doctor
                          </button>
                          <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300">
                            Download Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Image Upload Modal */}
            {showUploadModal && (
              <ImageUpload 
                onClose={() => setShowUploadModal(false)}
                onAnalysisComplete={(result) => {
                  setAnalysisResult(result);
                  setShowUploadModal(false);
                }}
              />
            )}
          </main>
          <MedicalDisclaimer position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;