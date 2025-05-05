import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import NewDashboardSidebar from './NewDashboardSidebar';
import APIKeyModal from './APIKeyModal';

// For debugging
console.log('NewDashboard component loaded');

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
  
  // Handle API key submission
  const handleAPIKeySubmit = (apiKey) => {
    localStorage.setItem('googleHealthApiKey', apiKey);
    setUserHasAPIKey(true);
    setShowAPIKeyModal(false);
  };

  // Handle API key modal actions
  const skipApiKey = () => {
    localStorage.setItem('googleHealthApiKey', 'demo-api-key-123');
    setUserHasAPIKey(true);
    setShowAPIKeyModal(false);
  };

  // Function to handle role switching (for demo purposes)
  const switchRole = () => {
    const newRole = userRole === 'patient' ? 'doctor' : 'patient';
    localStorage.setItem('userRole', newRole);
    setUserRole(newRole);
    // Force refresh dashboard sections
    navigate('/dashboard');
  };
  
  // Demo user data
  const getDemoUser = () => {
    return {
      id: 'demo-user-123',
      name: 'Demo User',
      email: 'demo@example.com',
      role: localStorage.getItem('userRole') || 'patient',
      profile_image: 'https://randomuser.me/api/portraits/women/44.jpg'
    };
  };
  
  const [user, setUser] = useState(getDemoUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
  
  // Close the sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
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
  
  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    console.log('Toggling sidebar:', !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <NewDashboardSidebar 
        userRole={userRole} 
        isCollapsed={!sidebarOpen} 
        toggleSidebar={toggleSidebar}
      />
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        {/* Top navigation bar */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            {isMobile && (
              <button
                onClick={() => {
                  console.log('Mobile toggle button clicked');
                  toggleSidebar();
                }}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            )}
            
            <div className="text-xl font-semibold text-gray-800">
              {location.pathname === '/dashboard' ? 'Dashboard Overview' : 
               location.pathname === '/dashboard/history' ? 'Scan History' :
               location.pathname === '/dashboard/analysis' ? 'Analysis' :
               location.pathname === '/dashboard/records' ? 'Health Records' :
               location.pathname === '/dashboard/doctors' ? 'My Doctors' :
               location.pathname === '/dashboard/patients' ? 'My Patients' :
               location.pathname === '/dashboard/ai-training' ? 'AI Training' :
               location.pathname === '/dashboard/settings' ? 'Settings' :
               location.pathname === '/dashboard/profile' ? 'Profile' :
               location.pathname === '/dashboard/support' ? 'Support' :
               location.pathname === '/dashboard/faqs' ? 'FAQs' : 'Dashboard'}
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Role switcher (for demo) */}
              <button 
                onClick={switchRole}
                className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 px-3 rounded transition-colors duration-150"
              >
                Switch to {userRole === 'patient' ? 'Doctor' : 'Patient'} View
              </button>
              
              {/* User menu */}
              <div className="relative">
                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img className="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </div>
      </div>
      
      {/* Google Health API Key Modal */}
      {showAPIKeyModal && (
        <APIKeyModal
          onSubmit={handleAPIKeySubmit}
          onSkip={skipApiKey}
          onClose={() => setShowAPIKeyModal(false)}
        />
      )}
    </div>
  );
};

export default NewDashboard;
