import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NewDashboardSidebar from './NewDashboardSidebar';
import ImageUpload from './ImageUpload';
import MedicalDisclaimer from './MedicalDisclaimer';

// Dashboard Components
import DashboardOverview from './dashboard/DashboardOverview';
import DashboardAnalyses from './dashboard/DashboardAnalyses';
import DashboardDoctors from './dashboard/DashboardDoctors';
import DashboardPatients from './dashboard/DashboardPatients';
import DashboardSettings from './dashboard/DashboardSettings';
import DashboardProfile from './dashboard/DashboardProfile';
import DashboardHistory from './dashboard/DashboardHistory';
import DashboardRecords from './dashboard/DashboardRecords';
import DashboardTraining from './dashboard/DashboardTraining';
import DashboardSupport from './dashboard/DashboardSupport';
import DashboardAnalytics from './dashboard/DashboardAnalytics';
import DashboardResearch from './dashboard/DashboardResearch';
import DashboardSubscription from './dashboard/DashboardSubscription';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const NewDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: 'Your latest X-ray analysis is complete',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      text: 'Dr. Sarah Johnson has sent you a message',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      text: 'Your subscription will renew in 7 days',
      time: '3 days ago',
      read: true
    }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get active tab from path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'overview';
    return path.split('/').pop();
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());
  
  // Update active tab when path changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
  }, [location]);
  
  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({...notif, read: true})));
  };
  
  // Clear a single notification
  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-blue-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 max-w-lg">
          <div className="flex items-center mb-4">
            <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-red-300">Authentication Error</h2>
          </div>
          <p className="text-red-200 mb-4">{error}</p>
          <Link to="/login" className="inline-block px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const isDoctor = user?.role === 'doctor';
  
  // Find current page title
  const getCurrentPageTitle = () => {
    switch(activeTab) {
      case 'overview': return 'Dashboard';
      case 'analyses': return 'Scan Analysis';
      case 'records': return 'My Health Records';
      case 'history': return 'History';
      case 'doctors': return 'My Doctors';
      case 'patients': return 'Patients';
      case 'training': return 'AI Model Training';
      case 'analytics': return 'Analytics';
      case 'research': return 'Research';
      case 'support': return 'Support & Help';
      case 'settings': return 'Settings';
      case 'profile': return 'My Profile';
      case 'subscription': return 'Subscription';
      default: return 'Dashboard';
    }
  };
  
  // Generate breadcrumbs based on current tab
  const getBreadcrumbs = () => {
    const crumbs = [
      { name: 'Dashboard', path: '/dashboard' }
    ];
    
    if (activeTab !== 'overview') {
      crumbs.push({
        name: getCurrentPageTitle(),
        path: `/dashboard/${activeTab}`
      });
    }
    
    return crumbs;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center flex-shrink-0">
                <img src="/images/logo.svg" alt="ZemedicAI" className="h-8 w-8 mr-2" />
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">ZemedicAI</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  
                  {/* Notification badge */}
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notification dropdown */}
                {showNotifications && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 px-4 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="py-4 px-4 text-center text-gray-400">
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 ${notification.read ? '' : 'bg-gray-700 bg-opacity-30'}`}
                          >
                            <div className="flex justify-between">
                              <p className={`text-sm ${notification.read ? 'text-gray-300' : 'text-white font-medium'}`}>
                                {notification.text}
                              </p>
                              <button
                                onClick={() => clearNotification(notification.id)}
                                className="text-gray-400 hover:text-gray-300"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="py-2 px-4 border-t border-gray-700 text-center">
                      <a href="#" className="text-xs text-blue-400 hover:text-blue-300">View all notifications</a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div className="flex items-center">
                  <button 
                    onClick={() => {
                      setActiveTab('profile');
                      navigate('/dashboard/profile');
                    }}
                    className="flex items-center hover:bg-gray-700 rounded-full p-1 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Dashboard Content */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <NewDashboardSidebar 
          user={user} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setShowUploadModal={setShowUploadModal}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-6 md:ml-64 transition-all duration-300">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm">
            <ol className="list-none p-0 inline-flex text-gray-500">
              {getBreadcrumbs().map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {index === getBreadcrumbs().length - 1 ? (
                    <span className="text-blue-400">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-blue-400">{crumb.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">{getCurrentPageTitle()}</h1>
            {activeTab === 'overview' && (
              <p className="text-gray-400 mt-1">
                Welcome back, {isDoctor ? 'Dr. ' : ''}{user.first_name}. Here's your health dashboard.
              </p>
            )}
          </div>
          
          {/* Dashboard Content based on active tab */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            {activeTab === 'overview' && <DashboardOverview user={user} setShowUploadModal={setShowUploadModal} />}
            {activeTab === 'analyses' && <DashboardAnalyses user={user} />}
            {activeTab === 'records' && <DashboardRecords user={user} />}
            {activeTab === 'history' && <DashboardHistory user={user} />}
            {activeTab === 'doctors' && <DashboardDoctors user={user} />}
            {activeTab === 'support' && <DashboardSupport user={user} />}
            {activeTab === 'settings' && <DashboardSettings user={user} />}
            {activeTab === 'profile' && <DashboardProfile user={user} />}
            {activeTab === 'subscription' && <DashboardSubscription user={user} />}
            
            {/* Doctor specific pages */}
            {isDoctor && activeTab === 'patients' && <DashboardPatients user={user} />}
            {isDoctor && activeTab === 'training' && <DashboardTraining user={user} />}
            {isDoctor && activeTab === 'analytics' && <DashboardAnalytics user={user} />}
            {isDoctor && activeTab === 'research' && <DashboardResearch user={user} />}
          </div>
          
          {/* Upload Image Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="bg-gray-800 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <ImageUpload 
                      onUploadComplete={(result) => {
                        setShowUploadModal(false);
                        // Navigate to analyses tab with the result
                        setActiveTab('analyses');
                        navigate('/dashboard/analyses', { state: { analysisResult: result }});
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-500">© 2025 ZemedicAI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;