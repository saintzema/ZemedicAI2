import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import TypingAnimation from './components/TypingAnimation';
import AfricaMap from './components/AfricaMap';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import Dashboard from './components/Dashboard';
import NewDashboard from './components/NewDashboard';
import ImageUpload from './components/ImageUpload';
import HospitalIntegration from './components/solutions/HospitalIntegration';
import SolarPoweredBooths from './components/solutions/SolarPoweredBooths';
import MobileApplications from './components/solutions/MobileApplications';
import Pricing from './components/Pricing';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Link to="/pricing" className="hover:text-blue-300 transition duration-300">Pricing</Link>
          <a href="#contact" className="hover:text-blue-300 transition duration-300">Contact</a>
        </div>
        
        <div className="hidden lg:flex space-x-3">
          <Link to="/login" className="px-5 py-2 text-sm rounded-md border border-blue-500 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300">Log In</Link>
          <Link to="/register" className="px-5 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">Sign Up</Link>
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
              <Link to="/register" className="px-4 py-2 text-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md text-sm">Sign Up</Link>
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
        
        {/* Stats section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-white text-3xl font-bold">124+</h3>
              <p className="text-blue-300 font-medium">Detectable Findings</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-3xl font-bold">20s</h3>
              <p className="text-blue-300 font-medium">Analysis Time</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white text-3xl font-bold">98.7%</h3>
              <p className="text-blue-300 font-medium">Accuracy Rate</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5a.5.5 0 11-1 0 .5.5 0 011 0m0 0a2 2 0 102 2 2 2 0 10-2-2" />
                </svg>
              </div>
              <h3 className="text-white text-3xl font-bold">49+</h3>
              <p className="text-blue-300 font-medium">Countries Deployed</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

// Features Section Component
const Features = () => {
  return (
    <div id="features" className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionary AI-Powered Features</h2>
          <p className="text-blue-300 max-w-2xl mx-auto">Our cutting-edge technology delivers fast, accurate, and comprehensive analysis of medical images.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-xl transition-transform duration-300 hover:scale-105 feature-card">
            <div className="text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
            <p className="text-blue-100">Detects up to 124 findings in chest X-rays, CT scans, and pathology slides with high precision.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-xl transition-transform duration-300 hover:scale-105 feature-card">
            <div className="text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rapid Results</h3>
            <p className="text-blue-100">Process complete analyses in under 20 seconds, enabling faster diagnosis and treatment decisions.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-xl transition-transform duration-300 hover:scale-105 feature-card">
            <div className="text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Confidence Indicators</h3>
            <p className="text-blue-100">Advanced confidence metrics help clinicians understand the reliability of each finding.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-xl transition-transform duration-300 hover:scale-105 feature-card">
            <div className="text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Offline Capabilities</h3>
            <p className="text-blue-100">Function in remote areas without internet access, with automatic synchronization when connectivity returns.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-xl transition-transform duration-300 hover:scale-105 feature-card">
            <div className="text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable Models</h3>
            <p className="text-blue-100">Doctors can retrain models on their own data, improving accuracy for specific patient populations.</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-xl transition-transform duration-300 hover:scale-105 feature-card">
            <div className="text-blue-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
            <p className="text-blue-100">Enterprise-grade security ensures patient data is always protected to the highest standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Solutions Section Component
const Solutions = () => {
  // Animated text for the typing effect
  const impactPhrases = [
    "Democratizing healthcare access across Africa",
    "Bringing diagnostic imaging to remote communities",
    "Reducing healthcare inequality with AI and solar power",
    "Empowering healthcare workers with diagnostic support",
    "Saving lives through early detection and diagnosis"
  ];

  return (
    <div id="solutions" className="bg-gradient-to-b from-black to-purple-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-900 bg-opacity-30 rounded-full text-blue-400 text-sm font-medium tracking-wide uppercase mb-3">
            Global Impact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
            Healthcare Solutions for Everyone, Everywhere
          </h2>
          <p className="text-blue-300 text-lg max-w-3xl mx-auto mb-6">
            ZemedicAI's technology scales from individual clinics to large hospital systems and remote health posts, bringing healthcare to the most underserved regions.
          </p>
          <div className="h-8 text-xl font-medium text-white">
            <TypingAnimation phrases={impactPhrases} typingSpeed={60} className="min-h-8 inline-block" />
          </div>
        </div>
        
        {/* Africa Map with Deployment Locations */}
        <div className="mb-20 bg-black bg-opacity-40 p-6 rounded-xl border border-blue-900 shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Our African Deployment Initiative
            </span>
          </h3>
          <p className="text-center text-blue-300 max-w-3xl mx-auto mb-8">
            Through our network of solar-powered diagnostic booths, we're bringing advanced medical imaging to remote and underserved communities across Africa.
          </p>
          
          <AfricaMap />
        </div>
        
        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hospital Integration Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-purple-800 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
            <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800 relative z-10 h-full transform transition duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl">
              <div className="mb-4">
                <div className="p-3 bg-blue-900 bg-opacity-50 inline-block rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Hospital Integration</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Seamless integration with existing PACS and EHR systems</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct X-ray machine integration with real-time analysis</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multi-department workflow optimization</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced analytics and reporting for hospital administrators</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <a href="/hospital-integration" className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors duration-300">
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Solar-Powered Diagnostic Booths Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-blue-800 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
            <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800 relative z-10 h-full transform transition duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl">
              <div className="mb-4">
                <div className="p-3 bg-green-900 bg-opacity-50 inline-block rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">Solar-Powered Diagnostic Booths</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Self-contained diagnostic units for remote areas</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% solar powered with battery backup</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Offline operation with cloud synchronization</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Rapid deployment to underserved communities</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <a href="/solar-booths" className="inline-flex items-center text-green-300 hover:text-green-100 transition-colors duration-300">
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Health Solutions Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-800 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
            <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800 relative z-10 h-full transform transition duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl">
              <div className="mb-4">
                <div className="p-3 bg-purple-900 bg-opacity-50 inline-block rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Mobile Health Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Smartphone-based diagnostics for field healthcare workers</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Portable X-ray compatible systems</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Telemedicine integration for remote consultations</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Low-bandwidth operation in areas with limited connectivity</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <a href="/mobile-health" className="inline-flex items-center text-purple-300 hover:text-purple-100 transition-colors duration-300">
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Clinical Decision Support Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
            <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800 relative z-10 h-full transform transition duration-500 group-hover:translate-y-[-5px] group-hover:shadow-xl">
              <div className="mb-4">
                <div className="p-3 bg-indigo-900 bg-opacity-50 inline-block rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">Clinical Decision Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI-assisted diagnosis with interactive visualization</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Treatment recommendation engine</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Historical case comparison</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Continuous learning from clinician feedback</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <a href="/clinical-support" className="inline-flex items-center text-indigo-300 hover:text-indigo-100 transition-colors duration-300">
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Section Component
const Demo = () => {
  const [activeTab, setActiveTab] = useState('xray');
  
  return (
    <div id="demo" className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-blue-900 bg-opacity-30 rounded-full text-blue-400 text-sm font-medium tracking-wide uppercase mb-3">
            See it in action
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            AI-Powered Medical Imaging Analysis
          </h2>
          <p className="text-blue-300 text-lg">
            Experience how ZemedicAI analyzes medical images in real-time, highlighting findings with precise confidence indicators to assist healthcare professionals in making accurate diagnoses.
          </p>
        </div>
        
        {/* Platform Demo */}
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950 to-black p-1 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-950 via-blue-950 to-black rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-blue-800">
              <button
                onClick={() => setActiveTab('xray')}
                className={`px-6 py-4 text-sm font-medium flex items-center ${
                  activeTab === 'xray' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-blue-300 hover:text-blue-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Chest X-Ray Analysis
              </button>
              <button
                onClick={() => setActiveTab('mri')}
                className={`px-6 py-4 text-sm font-medium flex items-center ${
                  activeTab === 'mri' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-blue-300 hover:text-blue-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                MRI Brain Scan
              </button>
              <button
                onClick={() => setActiveTab('ct')}
                className={`px-6 py-4 text-sm font-medium flex items-center ${
                  activeTab === 'ct' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-blue-300 hover:text-blue-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                CT Lung Scan
              </button>
            </div>
            
            {/* Demo Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Image and Analysis Area */}
                <div className="lg:w-2/3">
                  <div className="relative mb-6">
                    <div className="aspect-w-16 aspect-h-12 bg-black rounded-xl overflow-hidden relative">
                      <img 
                        src={activeTab === 'xray' 
                          ? "/images/scans/chest-xray.jpg"
                          : activeTab === 'mri'
                            ? "/images/scans/brain-mri.jpg"
                            : "/images/scans/ct-scan.jpg"
                        } 
                        alt={`${activeTab} medical scan`} 
                        className="w-full h-full object-cover object-center"
                      />
                      
                      {/* AI Analysis Highlights */}
                      {activeTab === 'xray' && (
                        <>
                          <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-red-500 rounded-full animate-pulse-slow opacity-80"></div>
                          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-yellow-500 rounded-full animate-pulse-slow opacity-80" style={{animationDelay: "1s"}}></div>
                        </>
                      )}
                      
                      {activeTab === 'mri' && (
                        <>
                          <div className="absolute top-1/3 left-1/2 w-14 h-14 border-2 border-red-500 rounded-full animate-pulse-slow opacity-80"></div>
                          <div className="absolute top-1/2 left-1/3 w-10 h-10 border-2 border-blue-500 rounded-full animate-pulse-slow opacity-80" style={{animationDelay: "0.6s"}}></div>
                        </>
                      )}
                      
                      {activeTab === 'ct' && (
                        <>
                          <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-red-500 rounded-lg animate-pulse-slow opacity-80"></div>
                          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border-2 border-yellow-500 rounded-lg animate-pulse-slow opacity-80" style={{animationDelay: "0.8s"}}></div>
                        </>
                      )}
                      
                      {/* Analysis Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      
                      {/* Interface Elements */}
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-md px-3 py-1.5 text-xs text-blue-300 font-medium">
                        ZEMEDIC ANALYZER v2.5
                      </div>
                      
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="bg-blue-900 bg-opacity-50 backdrop-blur-sm rounded-md px-2 py-1.5 text-xs text-blue-300 flex items-center hover:bg-opacity-70 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          Zoom
                        </button>
                        <button className="bg-blue-900 bg-opacity-50 backdrop-blur-sm rounded-md px-2 py-1.5 text-xs text-blue-300 flex items-center hover:bg-opacity-70 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Export
                        </button>
                      </div>
                    </div>
                    
                    {/* Analysis Results Bar */}
                    <div className="bg-blue-950 bg-opacity-80 border border-blue-900 rounded-xl p-4 mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-white font-medium">
                            {activeTab === 'xray' 
                              ? "Pneumonia - Right Lower Lobe" 
                              : activeTab === 'mri' 
                                ? "Glioblastoma - Frontal Lobe" 
                                : "Pulmonary Nodule - Right Lung"}
                          </span>
                        </div>
                        <span className="text-red-400 font-semibold">Critical Finding</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{width: "94%"}}></div>
                        </div>
                        <span className="text-white font-bold min-w-[3rem] text-right">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Findings Panel */}
                <div className="lg:w-1/3 bg-blue-950 bg-opacity-30 border border-blue-900 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white text-lg font-bold">AI Analysis Results</h3>
                    <span className="text-xs text-blue-400 font-medium">ANALYZED IN 18.3s</span>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-white text-sm font-medium">
                            {activeTab === 'xray' 
                              ? "Pneumonia" 
                              : activeTab === 'mri' 
                                ? "Glioblastoma" 
                                : "Pulmonary Nodule"}
                          </span>
                        </div>
                        <span className="text-white font-semibold text-sm">94%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{width: "94%"}}></div>
                      </div>
                      <p className="text-blue-300 text-xs mt-1.5">
                        {activeTab === 'xray' 
                          ? "Located in right lower lobe with clear consolidation" 
                          : activeTab === 'mri' 
                            ? "Frontal lobe, approx. 4.2cm diameter, with surrounding edema" 
                            : "Right lung, 2.1cm diameter, irregular margins"}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2"></div>
                          <span className="text-white text-sm font-medium">
                            {activeTab === 'xray' 
                              ? "Pleural Effusion" 
                              : activeTab === 'mri' 
                                ? "Midline Shift" 
                                : "Ground-Glass Opacity"}
                          </span>
                        </div>
                        <span className="text-white font-semibold text-sm">82%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: "82%"}}></div>
                      </div>
                      <p className="text-blue-300 text-xs mt-1.5">
                        {activeTab === 'xray' 
                          ? "Small amount of fluid in right costophrenic angle" 
                          : activeTab === 'mri' 
                            ? "5mm shift from midline due to mass effect" 
                            : "Diffuse, affecting multiple lobes, consistent with infection"}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-white text-sm font-medium">
                            {activeTab === 'xray' 
                              ? "Cardiomegaly" 
                              : activeTab === 'mri' 
                                ? "Ventricular Enlargement" 
                                : "Lymphadenopathy"}
                          </span>
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {activeTab === 'xray' ? "12%" : activeTab === 'mri' ? "76%" : "64%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{width: activeTab === 'xray' ? "12%" : activeTab === 'mri' ? "76%" : "64%"}}
                        ></div>
                      </div>
                      <p className="text-blue-300 text-xs mt-1.5">
                        {activeTab === 'xray' 
                          ? "No significant cardiomegaly detected" 
                          : activeTab === 'mri' 
                            ? "Lateral ventricles enlarged due to obstructive hydrocephalus" 
                            : "Hilar and mediastinal lymph nodes enlarged, 1.5-2.0cm"}
                      </p>
                    </div>
                    
                    <div className="border-t border-blue-800 pt-4 mt-6">
                      <h4 className="text-white text-sm font-semibold mb-3">Diagnostic Suggestion</h4>
                      <p className="text-blue-300 text-sm">
                        {activeTab === 'xray' 
                          ? "Findings consistent with pneumonia in right lower lobe with small pleural effusion. Recommend treatment with antibiotics and follow-up imaging in 2 weeks to ensure resolution." 
                          : activeTab === 'mri' 
                            ? "Imaging consistent with high-grade glioma (glioblastoma). Urgent neurosurgical consultation recommended for biopsy and treatment planning." 
                            : "Findings suggestive of primary lung malignancy with lymph node involvement. Recommend CT-guided biopsy and oncology referral."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex">
                    <button className="flex-1 mr-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Full Report
                    </button>
                    <button className="flex-1 px-3 py-2 border border-blue-500 text-blue-400 text-sm rounded-lg hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Experience the Full Potential of ZemedicAI</h3>
            <p className="text-blue-300 max-w-2xl mx-auto mb-8">
              Upload your own medical images and witness the power of our AI analysis. Get started with a free trial today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/register" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 text-center font-semibold shadow-lg">
                Start Free Trial
              </a>
              <a href="#contact" className="px-8 py-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 text-center font-semibold">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonials Component
const Testimonials = () => {
  return (
    <div className="bg-gradient-to-b from-blue-950 to-black text-white py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-40 w-64 h-64 rounded-full bg-blue-600 blur-3xl opacity-10"></div>
        <div className="absolute right-10 bottom-20 w-80 h-80 rounded-full bg-purple-600 blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-blue-900 bg-opacity-30 rounded-full text-blue-400 text-sm font-medium tracking-wide uppercase mb-3">
            Customer Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Trusted by Leading Healthcare Providers</h2>
          <p className="text-blue-300 text-lg">
            See how ZemedicAI is transforming healthcare delivery in hospitals, clinics, and remote areas around the world.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Featured testimonial */}
          <div className="mb-16 bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-800 to-purple-900 p-8 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-blue-400">
                  <img 
                    src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f" 
                    alt="Dr. Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Dr. Sarah Johnson</h3>
                <p className="text-blue-300 mb-4">Chief Radiologist, Boston Medical Center</p>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex items-center">
                <div>
                  <svg className="text-blue-500 h-12 w-12 mb-6 opacity-30" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <blockquote className="text-xl md:text-2xl font-medium text-white mb-6 relative leading-relaxed">
                    "The confidence indicators are a game-changer for our radiology department. I can quickly assess the reliability of each finding, which helps me make better diagnostic decisions. The custom model training has allowed us to improve detection rates for our specific patient population by 23% in just three months."
                  </blockquote>
                  <p className="text-blue-300">
                    Since implementing ZemedicAI, our diagnostic accuracy has improved by 17%, and our average read time has decreased by 42%. This technology is revolutionizing how we deliver care.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-950 to-black p-1 rounded-xl transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-950 to-black rounded-xl p-8 h-full border border-blue-900">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-blue-600">
                    <img 
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54" 
                      alt="Dr. Rajiv Sharma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Dr. Rajiv Sharma</h4>
                    <p className="text-sm text-blue-300">Global Health Initiatives</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-blue-100 mb-4">
                  "ZemedicAI has revolutionized our rural healthcare initiative. The solar-powered booths allow us to provide diagnostic services in areas that previously had no access to medical imaging. The offline capabilities are exceptional."
                </p>
                <p className="text-blue-400 text-sm pt-4 border-t border-blue-900">
                  Deployed in 17 remote villages across India
                </p>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-blue-950 to-black p-1 rounded-xl transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-950 to-black rounded-xl p-8 h-full border border-blue-900">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-blue-600">
                    <img 
                      src="https://images.unsplash.com/photo-1642977195740-1204d9c401b5" 
                      alt="Dr. Michael Okafor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Dr. Michael Okafor</h4>
                    <p className="text-sm text-blue-300">Lagos University Hospital</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-blue-100 mb-4">
                  "We've integrated ZemedicAI with our hospital's PACS system, and the impact has been immediate. Our radiologists process more studies with greater accuracy, and our emergency department has seen significant improvements in throughput times."
                </p>
                <p className="text-blue-400 text-sm pt-4 border-t border-blue-900">
                  35% reduction in diagnostic waiting times
                </p>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-blue-950 to-black p-1 rounded-xl transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-950 to-black rounded-xl p-8 h-full border border-blue-900">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-blue-600">
                    <img 
                      src="https://randomuser.me/api/portraits/women/65.jpg" 
                      alt="Dr. Emma Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Dr. Emma Chen</h4>
                    <p className="text-sm text-blue-300">Pediatric Radiologist</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-blue-100 mb-4">
                  "As a pediatric specialist, I've been impressed with ZemedicAI's ability to adapt to the unique challenges of analyzing children's imaging studies. The model's accuracy in detecting subtle abnormalities has been remarkable, even in complex cases."
                </p>
                <p className="text-blue-400 text-sm pt-4 border-t border-blue-900">
                  Improved detection rates by 28% for pediatric patients
                </p>
              </div>
            </div>
          </div>
          
          {/* Logos section */}
          <div className="mt-20 pt-16 border-t border-blue-900">
            <h3 className="text-center text-lg font-medium text-blue-300 mb-10">Trusted by leading healthcare institutions worldwide</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* Hospital Logos - using placeholders */}
              <div className="flex items-center justify-center">
                <div className="text-blue-400 text-xl font-bold opacity-70 hover:opacity-100 transition duration-300">Mayo Clinic</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-blue-400 text-xl font-bold opacity-70 hover:opacity-100 transition duration-300">Cleveland Clinic</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-blue-400 text-xl font-bold opacity-70 hover:opacity-100 transition duration-300">Johns Hopkins</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-blue-400 text-xl font-bold opacity-70 hover:opacity-100 transition duration-300">Mass General</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-blue-400 text-xl font-bold opacity-70 hover:opacity-100 transition duration-300">Mount Sinai</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-blue-400 text-xl font-bold opacity-70 hover:opacity-100 transition duration-300">UCSF Health</div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-20 text-center">
            <a href="/register" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-300 text-lg font-semibold">
              Join Our Global Network
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Section Component
const Contact = () => {
  return (
    <div id="contact" className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-blue-300 max-w-2xl mx-auto">Interested in implementing ZemedicAI in your healthcare facility? Contact us to learn more.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-1 rounded-xl">
            <div className="bg-black rounded-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-blue-300 mb-2">Name</label>
                    <input type="text" id="name" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-blue-300 mb-2">Email</label>
                    <input type="email" id="email" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="organization" className="block text-blue-300 mb-2">Organization</label>
                  <input type="text" id="organization" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Hospital or Organization Name" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-blue-300 mb-2">Message</label>
                  <textarea id="message" rows="4" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Tell us about your needs and how ZemedicAI can help"></textarea>
                </div>
                
                <div>
                  <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-purple-900 to-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
            </div>
            <p className="text-blue-300 mb-4">
              AI-powered healthcare for everyone, everywhere. Our mission is to democratize access to advanced medical diagnostics.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/solutions/hospital-integration" className="text-blue-300 hover:text-white transition duration-300">Hospital Integration</Link></li>
              <li><Link to="/solutions/solar-booths" className="text-blue-300 hover:text-white transition duration-300">Solar-Powered Booths</Link></li>
              <li><Link to="/solutions/mobile-applications" className="text-blue-300 hover:text-white transition duration-300">Mobile Applications</Link></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">X-ray Integration</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Custom Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Documentation</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">API Reference</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Case Studies</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Research Papers</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Careers</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Press</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-300 hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-blue-400 text-sm">
          <p>&copy; 2025 ZemedicAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Login Component is imported from './components/Login'
                <input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-300">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" 
                  required 
                  className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  placeholder="Password" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded" 
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-300">Remember me</label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-200">Forgot your password?</a>
                </div>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Register Component
const Register = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    medicalLicenseId: "",
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Validate doctor registration
    if (isDoctor && !formData.medicalLicenseId) {
      setError("Medical License ID is required for doctor registration");
      setLoading(false);
      return;
    }
    
    // Validate terms acceptance
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setLoading(false);
      return;
    }
    
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: isDoctor ? "doctor" : "patient",
        medical_license_id: isDoctor ? formData.medicalLicenseId : undefined
      };
      
      // Register user
      await axios.post(`${API}/users`, userData);
      
      setSuccess(true);
      
      // After successful registration, automatically log in
      try {
        const params = new URLSearchParams();
        params.append("username", userData.email);
        params.append("password", userData.password);
        
        const loginResponse = await axios.post(`${API}/token`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        
        localStorage.setItem("token", loginResponse.data.access_token);
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        
      } catch (loginErr) {
        console.error("Auto-login failed:", loginErr);
        // If auto-login fails, still show success but require manual login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.detail || 
        "Registration failed. Please try again with a different email."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-blue-300">
            Already have an account? <Link to="/login" className="font-medium text-blue-400 hover:text-blue-200">Sign in</Link>
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-1 rounded-xl">
          <div className="bg-black bg-opacity-80 rounded-lg p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-900 bg-opacity-40 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-900 bg-opacity-40 border border-green-500 rounded-lg text-green-200 text-sm">
                Account created successfully! Redirecting to dashboard...
              </div>
            )}
            
            <div className="flex justify-center mb-6">
              <div className="relative w-full flex items-center justify-center">
                <span className="absolute left-0 text-sm text-blue-300">Patient</span>
                <div 
                  className={`w-14 h-7 flex items-center bg-gray-800 rounded-full mx-3 px-1 ${isDoctor ? 'justify-end' : 'justify-start'} cursor-pointer`}
                  onClick={() => setIsDoctor(!isDoctor)}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md ${isDoctor ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
                </div>
                <span className="absolute right-0 text-sm text-blue-300">Doctor</span>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-blue-300">First Name</label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    required 
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-blue-300">Last Name</label>
                  <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    required 
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-300">Email address</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-300">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="new-password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                />
              </div>
              
              {isDoctor && (
                <div>
                  <label htmlFor="medicalLicenseId" className="block text-sm font-medium text-blue-300">Medical License ID</label>
                  <input 
                    id="medicalLicenseId" 
                    name="medicalLicenseId" 
                    type="text" 
                    value={formData.medicalLicenseId}
                    onChange={handleChange}
                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600" 
                  />
                </div>
              )}
              
              <div className="flex items-center">
                <input 
                  id="agreeToTerms" 
                  name="agreeToTerms" 
                  type="checkbox" 
                  required 
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded" 
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-blue-300">
                  I agree to the <a href="#" className="text-blue-400 hover:text-blue-200">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-200">Privacy Policy</a>
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={loading || success}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : success ? "Account Created!" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



// Partners Section Component
const Partners = () => {
  // Logos with names for accessibility
  const partners = [
    { name: "Mayo Clinic", logo: "/images/partners/mayo-clinic.svg" },
    { name: "Stanford Health", logo: "/images/partners/stanford-health.svg" },
    { name: "Johns Hopkins", logo: "/images/partners/johns-hopkins.svg" },
    { name: "Cleveland Clinic", logo: "/images/partners/cleveland-clinic.svg" },
    { name: "Mount Sinai", logo: "/images/partners/mount-sinai.svg" }
  ];

  return (
    <div className="bg-black py-12 border-t border-blue-900">
      <div className="container mx-auto px-4">
        <p className="text-center text-blue-400 text-sm tracking-wider uppercase mb-8 font-medium letter-spacing-wider">Trusted by leading healthcare institutions</p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="h-16 w-36 bg-opacity-80 rounded-lg flex items-center justify-center p-2 transition-all duration-300 transform group-hover:scale-110">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`}
                  className="h-full w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-sm text-blue-300 opacity-80 group-hover:opacity-100">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <Hero />
              <Partners />
              <Features />
              <Solutions />
              <Demo />
              <Testimonials />
              <Contact />
              <Footer />
              <MedicalDisclaimer position="bottom" />
            </>
          } />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <NewDashboard />
            </ProtectedRoute>
          } />
          <Route path="/pricing" element={
            <>
              <Navigation />
              <Pricing />
              <Footer />
              <MedicalDisclaimer position="bottom" />
            </>
          } />
          <Route path="/hospital-integration" element={<HospitalIntegration />} />
          {/* Public solution pages */}
          <Route path="/solutions/hospital-integration" element={<HospitalIntegration />} />
          <Route path="/solutions/solar-booths" element={<SolarPoweredBooths />} />
          <Route path="/solutions/mobile-applications" element={<MobileApplications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;