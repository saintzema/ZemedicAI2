import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaHistory, FaChartBar, FaFileMedical, 
  FaUserMd, FaCog, FaSignOutAlt, FaUserFriends, FaBrain,
  FaQuestion, FaHeadset, FaBars, FaTimes
} from 'react-icons/fa';

const NewDashboardSidebar = ({ userRole = 'patient' }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };
  
  // Navigation items
  const navigationItems = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      role: 'all'
    },
    {
      name: 'Analyses',
      path: '/dashboard/analyses',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      role: 'all'
    },
    {
      name: 'Scan History',
      path: '/dashboard/history',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      role: 'all'
    },
    {
      name: 'My Doctors',
      path: '/dashboard/doctors',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      role: 'patient'
    },
    {
      name: 'Patients',
      path: '/dashboard/patients',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      role: 'doctor'
    },
    {
      name: 'Health Records',
      path: '/dashboard/records',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      role: 'all'
    },
    {
      name: 'AI Training',
      path: '/dashboard/ai-training',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      role: 'doctor'
    }
  ];
  
  // Secondary navigation items
  const secondaryNavigation = [
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: 'Subscription',
      path: '/dashboard/subscription',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      name: 'Support',
      path: '/dashboard/support',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];
  
  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter(item => 
    item.role === 'all' || item.role === user?.role
  );
  
  // Check if a link is active
  const isLinkActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    if (path === '/dashboard' && location.pathname === '/dashboard/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  }
  
  return (
    <>
      {/* Mobile hamburger menu */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <button 
            onClick={toggleSidebar} 
            className="bg-blue-900 text-white p-2 rounded-md focus:outline-none"
          >
            {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
          </button>
        </div>
      )}
      
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white h-screen ${isCollapsed && isMobile ? '-translate-x-full' : ''} ${isMobile ? 'w-64' : (isCollapsed ? 'w-16' : 'w-64')} fixed left-0 transition-all duration-300 overflow-y-auto z-40 shadow-lg`}>
        <div className="p-4 flex justify-between items-center">
          {(!isCollapsed || isMobile) && <h2 className="text-xl font-semibold">ZemedicAI</h2>}
          {!isMobile && (
            <button onClick={toggleSidebar} className="text-white focus:outline-none">
              {isCollapsed ? <span>→</span> : <span>←</span>}
            </button>
          )}
        </div>
        
        {/* User info section */}
        {(!isCollapsed || isMobile) && (
          <div className="px-4 py-2 border-t border-b border-blue-800">
            <p className="text-sm opacity-70">Logged in as:</p>
            <p className="font-medium capitalize">{userRole}</p>
          </div>
        )}
        
        <div className="mt-4">
          {navigationItems.map((item) => (
            (item.roles.includes(userRole) || item.roles.includes('all')) && (
              <Link
                to={item.path}
                key={item.path}
                className={`flex items-center py-3 px-4 ${location.pathname === item.path ? 'bg-blue-800' : 'hover:bg-blue-800'} transition-colors duration-200`}
              >
                <div className="text-lg">{item.icon}</div>
                {(!isCollapsed || isMobile) && <span className="ml-3">{item.label}</span>}
              </Link>
            )
          ))}
          
          {/* Logout button */}
          <button 
            onClick={logout} 
            className="flex items-center w-full py-3 px-4 hover:bg-blue-800 transition-colors duration-200"
          >
            <div className="text-lg"><FaSignOutAlt /></div>
            {(!isCollapsed || isMobile) && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default NewDashboardSidebar;
