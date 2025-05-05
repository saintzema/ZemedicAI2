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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Main application component

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <nav className={`text-white fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-blue-950 to-purple-900 shadow-xl py-2' 
        : 'bg-gradient-to-r from-blue-950 to-purple-900 bg-opacity-95 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/images/logo.svg" alt="ZemedicAI Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-10">
          <div className="relative group">
            <a href="#features" className="hover:text-blue-300 transition duration-300 flex items-center">
              Features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <div className="absolute left-0 mt-2 w-48 bg-blue-950 border border-blue-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 py-2 z-50">
              <a href="#features" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">X-ray Analysis</a>
              <a href="#features" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">MRI Interpretation</a>
              <a href="#features" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Custom Model Training</a>
              <a href="#features" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Offline Capabilities</a>
            </div>
          </div>
          <Link to="/pricing" className="hover:text-blue-300 transition duration-300">
            Pricing
          </Link>
          <div className="relative group">
            <a href="#solutions" className="hover:text-blue-300 transition duration-300 flex items-center">
              Solutions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <div className="absolute left-0 mt-2 w-48 bg-blue-950 border border-blue-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 py-2 z-50">
              <Link to="/solutions/hospital-integration" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Hospital Integration</Link>
              <Link to="/solutions/solar-booths" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Solar-Powered Booths</Link>
              <Link to="/solutions/mobile-applications" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Mobile Applications</Link>
              <a href="#solutions" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Research Platform</a>
            </div>
          </div>
          <a href="#about" className="hover:text-blue-300 transition duration-300">About Us</a>
          <a href="#contact" className="hover:text-blue-300 transition duration-300">Contact</a>
        </div>
        
        <div className="hidden lg:flex space-x-3">
          <Link to="/login" className="px-5 py-2 text-sm rounded-md border border-blue-500 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300">Log In</Link>
          <Link to="/signup" className="px-5 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">Sign Up</Link>
          <Link to="/dashboard" className="px-5 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md">Dashboard</Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none p-2 transition duration-300 hover:bg-blue-900 hover:bg-opacity-50 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-950 border-t border-blue-800 mt-2 max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div>
              <button className="flex items-center justify-between w-full py-2 text-blue-300 hover:text-white" onClick={() => document.getElementById('mobile-features').classList.toggle('hidden')}>
                <span>Features</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="mobile-features" className="hidden pl-4 pt-2 pb-1 space-y-2">
                <a href="#features" className="block py-2 text-sm text-blue-400 hover:text-white">X-ray Analysis</a>
                <a href="#features" className="block py-2 text-sm text-blue-400 hover:text-white">MRI Interpretation</a>
                <a href="#features" className="block py-2 text-sm text-blue-400 hover:text-white">Custom Model Training</a>
                <a href="#features" className="block py-2 text-sm text-blue-400 hover:text-white">Offline Capabilities</a>
              </div>
            </div>
            
            <div>
              <button className="flex items-center justify-between w-full py-2 text-blue-300 hover:text-white" onClick={() => document.getElementById('mobile-solutions').classList.toggle('hidden')}>
                <span>Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="mobile-solutions" className="hidden pl-4 pt-2 pb-1 space-y-2">
                <Link to="/solutions/hospital-integration" className="block py-2 text-sm text-blue-400 hover:text-white">Hospital Integration</Link>
                <Link to="/solutions/solar-booths" className="block py-2 text-sm text-blue-400 hover:text-white">Solar-Powered Booths</Link>
                <Link to="/solutions/mobile-applications" className="block py-2 text-sm text-blue-400 hover:text-white">Mobile Applications</Link>
                <a href="#solutions" className="block py-2 text-sm text-blue-400 hover:text-white">Research Platform</a>
              </div>
            </div>
            
            <a href="#about" className="block py-2 text-blue-300 hover:text-white">About Us</a>
            <Link to="/pricing" className="block py-2 text-blue-300 hover:text-white">Pricing</Link>
            <a href="#contact" className="block py-2 text-blue-300 hover:text-white">Contact</a>
            
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-blue-800">
              <Link to="/login" className="px-4 py-2 text-center rounded-md border border-blue-500 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 text-sm">Log In</Link>
              <Link to="/signup" className="px-4 py-2 text-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md text-sm">Sign Up</Link>
            </div>
            <div className="pt-3">
              <Link to="/dashboard" className="block py-2 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md">Dashboard</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section Component
const Hero = () => {
  // Typing animation phrases
  const typingPhrases = [
    "Revolutionizing Medical Imaging",
    "Transforming Healthcare Access",
    "Empowering Rural Communities",
    "Combining AI with Green Energy",
    "Saving Lives with Early Detection"
  ];
  
  return (
    <div className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-black min-h-screen flex items-center overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-blue-600 blur-3xl opacity-20"></div>
        <div className="absolute left-1/4 top-1/3 w-80 h-80 rounded-full bg-purple-600 blur-3xl opacity-10"></div>
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-blue-400 blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-24">
        <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto">
          <div className="md:w-1/2 lg:pr-16 mb-10 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="h-0.5 w-12 bg-blue-400 mr-4"></div>
              <span className="text-blue-400 font-medium tracking-wide uppercase text-sm">AI-Powered Healthcare</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              <div className="h-20 md:h-28 lg:h-32">
                <TypingAnimation 
                  phrases={typingPhrases} 
                  typingSpeed={80} 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" 
                />
              </div>
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-fade-in-up animation-delay-300 max-w-xl">
              ZemedicAI analyzes X-rays, MRIs, and CT scans with industry-leading accuracy, detecting up to 124 findings in under 20 seconds to improve patient outcomes globally.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-600">
              <a href="/register" className="px-8 py-4 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition duration-300 text-center font-semibold shadow-lg">
                Start Free Trial
              </a>
              <a href="#demo" className="px-8 py-4 rounded-md border border-blue-400 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 text-center font-semibold">
                See It In Action
              </a>
            </div>
            <div className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-blue-900" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-blue-900" />
                <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-blue-900" />
              </div>
              <div className="ml-4">
                <p className="text-blue-300 text-sm">Trusted by <span className="font-semibold text-blue-200">2,500+</span> healthcare professionals</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-float">
            <div className="absolute inset-0 -left-6 -top-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl transform rotate-3 opacity-30 blur-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1655993810480-c15dccf9b3a0" 
              alt="AI Medical Imaging Technology" 
              className="rounded-2xl shadow-2xl relative z-10 border border-blue-800" 
            />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl transform rotate-12 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Component
const App = () => {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Route - Protected */}
        <Route 
          path="/dashboard/*" 
          element={
            isLoggedIn ? (
              <NewDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Login Route */}
        <Route 
          path="/login" 
          element={<Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        
        {/* Solutions Routes */}
        <Route path="/solutions/hospital-integration" element={<HospitalIntegration />} />
        <Route path="/solutions/solar-booths" element={<SolarPoweredBooths />} />
        <Route path="/solutions/mobile-applications" element={<MobileApplications />} />
        
        {/* Pricing Route */}
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Public Home Route */}
        <Route 
          path="/" 
          element={
            <>
              <Navigation />
              <Hero />
              <MedicalDisclaimer position="bottom" />
            </>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
