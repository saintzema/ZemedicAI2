import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      
      // Check for token in localStorage or sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      // If it's a demo token, we'll skip the validation
      if (token.startsWith('demo-token')) {
        console.log('Demo token detected, skipping validation');
        setLoading(false);
        setIsAuthenticated(true);
        return;
      }

      try {
        // Verify token with backend by getting current user
        await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Token validated successfully');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token validation error:', error);
        
        // Clear invalid token
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('userRole');
        
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API]);
  
  if (loading) {
    // Loading state
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Authenticating...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
