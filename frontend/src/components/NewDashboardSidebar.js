import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NewDashboardSidebar = ({ user, activeTab, setActiveTab, setShowUploadModal }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set responsive sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isDoctor = user?.role === 'doctor';
  
  // Common navigation items for all users
  const commonNavigation = [
    { 
      name: 'Dashboard', 
      tab: 'overview',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'Scan Analysis', 
      tab: 'analyses',
      path: '/dashboard/analyses',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      name: 'My Health Records', 
      tab: 'records',
      path: '/dashboard/records',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      name: 'History', 
      tab: 'history',
      path: '/dashboard/history',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: 'My Doctors', 
      tab: 'doctors',
      path: '/dashboard/doctors',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      name: 'Support & Help', 
      tab: 'support',
      path: '/dashboard/support',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];
  
  // Doctor-specific navigation items
  const doctorNavigation = [
    { 
      name: 'Patients', 
      tab: 'patients',
      path: '/dashboard/patients',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      name: 'AI Model Training', 
      tab: 'training',
      path: '/dashboard/training',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      name: 'Analytics', 
      tab: 'analytics',
      path: '/dashboard/analytics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      name: 'Research', 
      tab: 'research',
      path: '/dashboard/research',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
  ];
  
  // Settings and profile section
  const settingsNavigation = [
    { 
      name: 'Settings', 
      tab: 'settings',
      path: '/dashboard/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      name: 'My Profile', 
      tab: 'profile',
      path: '/dashboard/profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      name: 'Subscription', 
      tab: 'subscription',
      path: '/dashboard/subscription',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a2 2 0 10-4 0v5a2 2 0 104 0V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01M12 2v1M12 21v1M20 12h1M3 12h1M18.364 5.636l.707.707M4.929 19.071l.707.707M4.929 5.636l-.707.707M18.364 19.071l-.707.707" />
        </svg>
      )
    },
  ];
  
  // Combine navigation items based on user role
  const navigationItems = [...commonNavigation];
  
  if (isDoctor) {
    navigationItems.splice(5, 0, ...doctorNavigation);
  }
  
  return (
    <>
      {/* Mobile menu button - shown on small screens only */}
      <div className="fixed top-16 left-0 z-40 md:hidden p-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      
      {/* Sidebar for desktop - fixed on left side */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          collapsed && !mobileMenuOpen ? "-translate-x-full" : "translate-x-0"
        } ${mobileMenuOpen ? "translate-x-0" : ""} ${collapsed ? "md:w-20" : "md:w-64"} top-16 h-[calc(100vh-4rem)]`}
      >
        <div className="flex flex-col h-full overflow-y-auto bg-gray-900 text-white">
          {/* Navigation section */}
          <div className="py-4 flex-grow">
            <div className="px-4 mb-6 flex items-center justify-between">
              <h2 className={`font-semibold text-lg ${collapsed ? "hidden" : "block"}`}>Navigation</h2>
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 rounded-md hover:bg-gray-800 md:block hidden"
              >
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} 
                  />
                </svg>
              </button>
            </div>
            
            {/* Quick action for new upload */}
            <div className={`mb-6 mx-4 ${collapsed ? "px-0 justify-center" : "px-1"} flex`}>
              <button
                onClick={() => {
                  setShowUploadModal(true);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center p-2 ${
                  collapsed ? "justify-center w-12 h-12" : "px-4 py-2.5 w-full"
                } bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200`}
              >
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className={`${collapsed ? "hidden" : "ml-2"}`}>Upload Scan</span>
              </button>
            </div>
            
            {/* Main navigation */}
            <ul className="space-y-1 px-2">
              {navigationItems.map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => {
                      setActiveTab(item.tab);
                      setMobileMenuOpen(false);
                      navigate(item.path);
                    }}
                    className={`flex items-center ${
                      collapsed ? "justify-center" : "justify-start"
                    } w-full p-2 rounded-md ${
                      activeTab === item.tab
                        ? "bg-blue-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } transition-colors duration-200`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className={`${collapsed ? "hidden" : "ml-3"} text-sm`}>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Divider */}
            <div className="mt-6 mb-4 px-4">
              <div className={`border-t border-gray-700 ${collapsed ? "mx-2" : ""}`}></div>
            </div>
            
            {/* Settings and profile navigation */}
            <ul className="space-y-1 px-2">
              {settingsNavigation.map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => {
                      setActiveTab(item.tab);
                      setMobileMenuOpen(false);
                      navigate(item.path);
                    }}
                    className={`flex items-center ${
                      collapsed ? "justify-center" : "justify-start"
                    } w-full p-2 rounded-md ${
                      activeTab === item.tab
                        ? "bg-blue-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } transition-colors duration-200`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className={`${collapsed ? "hidden" : "ml-3"} text-sm`}>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* User section */}
          <div className="p-4 border-t border-gray-800">
            <button
              className={`flex items-center ${collapsed ? "justify-center" : ""} hover:bg-gray-800 p-2 rounded-md w-full`}
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
                navigate('/dashboard/profile');
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                {user?.first_name?.charAt(0) || 'U'}
              </div>
              {!collapsed && (
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-300">
                    {isDoctor ? 'Dr. ' : ''}{user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isDoctor ? 'Doctor' : 'Patient'}
                  </p>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NewDashboardSidebar;