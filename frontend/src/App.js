import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

// Components
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NewDashboard from "./components/NewDashboard";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Dashboard Components
import DashboardOverview from "./components/dashboard/DashboardOverview";
import DashboardAnalyses from "./components/dashboard/DashboardAnalyses";
import DashboardHistory from "./components/dashboard/DashboardHistory";
import DashboardRecords from "./components/dashboard/DashboardRecords";
import DashboardAITraining from "./components/dashboard/DashboardAITraining";
import DashboardSettings from "./components/dashboard/DashboardSettings";
import DashboardDoctors from "./components/dashboard/DashboardDoctors";
import DashboardPatients from "./components/dashboard/DashboardPatients";
import DashboardSupport from "./components/dashboard/DashboardSupport";
import DashboardFAQs from "./components/dashboard/DashboardFAQs";
import DashboardProfile from "./components/dashboard/DashboardProfile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Demo login handler - for easy testing
  const handleDemoLogin = (role = 'patient') => {
    const demoToken = `demo-token-${Date.now()}`;
    localStorage.setItem('token', demoToken);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    window.location.href = '/dashboard';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-4 max-w-sm w-full">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onDemoLogin={handleDemoLogin} />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <NewDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="analysis" element={<DashboardAnalyses />} />
            <Route path="history" element={<DashboardHistory />} />
            <Route path="records" element={<DashboardRecords />} />
            <Route path="doctors" element={<DashboardDoctors />} />
            <Route path="patients" element={<DashboardPatients />} />
            <Route path="ai-training" element={<DashboardAITraining />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="support" element={<DashboardSupport />} />
            <Route path="faqs" element={<DashboardFAQs />} />
          </Route>
          
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/about" element={<><Header /><About /><Footer /></>} />
          <Route path="/features" element={<><Header /><Features /><Footer /></>} />
          <Route path="/pricing" element={<><Header /><Pricing /><Footer /></>} />
          <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
