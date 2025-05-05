import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import NewDashboardSidebar from './NewDashboardSidebar';
import APIKeyModal from './APIKeyModal';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const NewDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [userHasAPIKey, setUserHasAPIKey] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'patient');
  
  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  useEffect(() => {
    // Check if the user has an API key in localStorage
    const apiKey = localStorage.getItem('googleHealthApiKey');
    if (apiKey) {
      setUserHasAPIKey(true);
    } else {
      // Only show modal for certain roles
      if (['doctor', 'admin'].includes(userRole)) {
        setShowAPIKeyModal(true);
      }
    }

    // Check user role
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, [userRole]);
  
  // Demo user data
  const getDemoUser = () => ({
    id: 'user-1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    role: 'patient', // 'patient' or 'doctor'
    avatar: '/images/avatar-placeholder.jpg',
    created_at: new Date().toISOString()
  });
  
  const [user, setUser] = useState(getDemoUser());
  
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'analysis',
      title: 'Analysis Complete',
      message: 'Your recent chest X-ray analysis is now complete.',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 'notif-2',
      type: 'message',
      title: 'New Message',
      message: 'Dr. Sarah Johnson sent you a message regarding your recent scan.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif-3',
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'You have an upcoming follow-up appointment on June 30, 2023.',
      time: '1 day ago',
      read: true
    },
    {
      id: 'notif-4',
      type: 'system',
      title: 'System Update',
      message: 'ZemedicAI was updated with new analysis capabilities for lung scans.',
      time: '3 days ago',
      read: true
    }
  ]);
  
  const location = useLocation();
  
  // Close the sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'analysis':
        return (
          <div className="p-2 rounded-full bg-blue-900 text-blue-300">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      case 'message':
        return (
          <div className="p-2 rounded-full bg-green-900 text-green-300">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        );
      case 'appointment':
        return (
          <div className="p-2 rounded-full bg-purple-900 text-purple-300">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="p-2 rounded-full bg-yellow-900 text-yellow-300">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-700 text-gray-300">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  // Get unread notification count
  const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;
  
  // Determine the current section for breadcrumbs
  const getCurrentSection = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard/analyses')) return 'Analyses';
    if (path.includes('/dashboard/history')) return 'Scan History';
    if (path.includes('/dashboard/doctors')) return 'My Doctors';
    if (path.includes('/dashboard/patients')) return 'Patients';
    if (path.includes('/dashboard/records')) return 'Health Records';
    if (path.includes('/dashboard/subscription')) return 'Subscription';
    if (path.includes('/dashboard/settings')) return 'Settings';
    if (path.includes('/dashboard/profile')) return 'Profile';
    if (path.includes('/dashboard/support')) return 'Support';
    if (path.includes('/dashboard/ai-training')) return 'AI Training';
    return 'Overview';
  };
  
  // Toggle user role for testing
  const toggleUserRole = () => {
    setUser(prevUser => ({
      ...prevUser,
      role: prevUser.role === 'patient' ? 'doctor' : 'patient'
    }));
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md p-8 bg-gray-800 rounded-lg shadow-lg text-center">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-900">
      {/* Sidebar */}
      <NewDashboardSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-gray-800 shadow-md border-b border-gray-700">
          <div className="flex items-center justify-between px-4 h-full">
            {/* Mobile menu button and breadcrumb */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Open sidebar"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Breadcrumbs */}
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/dashboard" className="text-gray-400 hover:text-gray-300 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  {getCurrentSection() !== 'Overview' && (
                    <>
                      <li>
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </li>
                      <li>
                        <span className="text-gray-300 font-medium">{getCurrentSection()}</span>
                      </li>
                    </>
                  )}
                </ol>
              </nav>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* API Key button */}
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="flex items-center text-sm text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md transition-colors"
                aria-label="API Key settings"
              >
                <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="hidden sm:inline">API Key</span>
              </button>
              
              {/* Upload button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md transition-colors"
                aria-label="Upload scan"
              >
                <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="hidden sm:inline">Upload Scan</span>
              </button>
              
              {/* Notification bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Notifications (${unreadNotificationsCount} unread)`}
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
                
                {/* Notification dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="text-white font-medium">Notifications</h3>
                      {unreadNotificationsCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-blue-400 hover:text-blue-300"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center">
                          <p className="text-gray-400">No notifications</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-700">
                          {notifications.map(notification => (
                            <div 
                              key={notification.id} 
                              className={`p-4 hover:bg-gray-750 ${!notification.read ? 'bg-gray-750' : ''} cursor-pointer`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex">
                                <div className="flex-shrink-0 mr-3">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-white">{notification.title}</p>
                                  <p className="text-sm text-gray-400 mt-0.5">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                                {!notification.read && (
                                  <div className="ml-3 flex-shrink-0">
                                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-700 text-center">
                      <Link to="/dashboard/notifications" className="text-sm text-blue-400 hover:text-blue-300">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User menu */}
              <div className="relative inline-block text-left">
                <div className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full object-cover border border-gray-700"
                    src={user.avatar || '/images/avatar-placeholder.jpg'}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white">{user.first_name} {user.last_name}</div>
                    <div className="text-xs text-gray-400">{user.role === 'doctor' ? 'Doctor' : 'Patient'}</div>
                  </div>
                  
                  {/* Role toggle button - for testing only */}
                  <button 
                    onClick={toggleUserRole}
                    className="ml-3 p-1 bg-gray-700 text-xs text-gray-300 rounded hover:bg-gray-600 transition-colors"
                    aria-label={`Switch to ${user.role === 'patient' ? 'doctor' : 'patient'} view`}
                  >
                    Switch to {user.role === 'patient' ? 'Doctor' : 'Patient'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-900">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Routes>
              <Route index element={<DashboardOverview user={user} setShowUploadModal={setShowUploadModal} />} />
              <Route path="analyses" element={<DashboardAnalyses user={user} />} />
              <Route path="history" element={<DashboardHistory user={user} />} />
              <Route path="doctors" element={<DashboardDoctors user={user} />} />
              <Route path="patients" element={<DashboardPatients user={user} />} />
              <Route path="records" element={<DashboardRecords user={user} />} />
              <Route path="subscription" element={<DashboardSubscription user={user} />} />
              <Route path="settings" element={<DashboardSettings user={user} />} />
              <Route path="profile" element={<DashboardProfile user={user} />} />
              <Route path="support" element={<DashboardSupport user={user} />} />
              <Route path="ai-training" element={<DashboardAITraining user={user} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-4xl w-full mx-auto">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-2 right-2 p-2 text-gray-300 hover:text-white z-50"
              aria-label="Close upload modal"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ImageUpload 
              setShowModal={setShowUploadModal} 
              apiKey={apiKey} 
            />
          </div>
        </div>
      )}
      
      {/* API Key Modal */}
      <APIKeyModal 
        isOpen={showApiKeyModal} 
        onClose={() => setShowApiKeyModal(false)} 
        onSave={(key) => {
          setApiKey(key);
          setShowApiKeyModal(false);
        }}
      />
    </div>
  );
};

export default NewDashboard;
