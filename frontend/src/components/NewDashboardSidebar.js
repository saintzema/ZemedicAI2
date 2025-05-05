import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaHistory, FaChartBar, FaFileMedical, 
  FaUserMd, FaCog, FaSignOutAlt, FaUserFriends, FaBrain,
  FaQuestion, FaHeadset, FaBars, FaTimes
} from 'react-icons/fa';

const NewDashboardSidebar = ({ userRole = 'patient', isCollapsed = false, toggleSidebar }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };
  
  // Get the user role from localStorage
  const storedUserRole = localStorage.getItem('userRole') || userRole;

  const navigationItems = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: <FaTachometerAlt />,
      roles: ['all']
    },
    {
      label: 'Scan History',
      path: '/dashboard/history',
      icon: <FaHistory />,
      roles: ['all']
    },
    {
      label: 'Analysis',
      path: '/dashboard/analysis',
      icon: <FaChartBar />,
      roles: ['all']
    },
    {
      label: 'Health Records',
      path: '/dashboard/records',
      icon: <FaFileMedical />,
      roles: ['patient']
    },
    {
      label: 'My Doctors',
      path: '/dashboard/doctors',
      icon: <FaUserMd />,
      roles: ['patient']
    },
    {
      label: 'My Patients',
      path: '/dashboard/patients',
      icon: <FaUserFriends />,
      roles: ['doctor']
    },
    {
      label: 'AI Training',
      path: '/dashboard/ai-training',
      icon: <FaBrain />,
      roles: ['doctor', 'admin']
    },
    {
      label: 'Profile',
      path: '/dashboard/profile',
      icon: <FaUserFriends />,
      roles: ['all']
    },
    {
      label: 'Settings',
      path: '/dashboard/settings',
      icon: <FaCog />,
      roles: ['all']
    },
    {
      label: 'Support',
      path: '/dashboard/support',
      icon: <FaHeadset />,
      roles: ['all']
    },
    {
      label: 'FAQs',
      path: '/dashboard/faqs',
      icon: <FaQuestion />,
      roles: ['all']
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
    item.roles.includes('all') || item.roles.includes(userRole)
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
            onClick={() => {
              console.log('Mobile hamburger clicked');
              if (typeof toggleSidebar === 'function') {
                toggleSidebar();
              } else {
                console.error('toggleSidebar is not a function');
              }
            }} 
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
            <button 
              onClick={() => {
                console.log('Desktop sidebar toggle clicked');
                if (typeof toggleSidebar === 'function') {
                  toggleSidebar();
                } else {
                  console.error('toggleSidebar is not a function');
                }
              }} 
              className="text-white focus:outline-none"
            >
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
          onClick={() => {
            console.log('Overlay clicked');
            if (typeof toggleSidebar === 'function') {
              toggleSidebar();
            } else {
              console.error('toggleSidebar is not a function');
            }
          }}
        ></div>
      )}
    </>
  );
};

export default NewDashboardSidebar;
