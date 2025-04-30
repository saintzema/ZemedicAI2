import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import TypingAnimation from './components/TypingAnimation';
import AfricaMap from './components/AfricaMap';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import Dashboard from './components/Dashboard';
import HospitalIntegration from './components/HospitalIntegration';
import ImageUpload from './components/ImageUpload';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  
  if (isAuthenticated === null) {
    // Still checking authentication
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

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
              <a href="#solutions" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Hospital Integration</a>
              <a href="#solutions" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Solar-Powered Booths</a>
              <a href="#solutions" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Mobile Applications</a>
              <a href="#solutions" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Research Platform</a>
            </div>
          </div>
          <a href="#about" className="hover:text-blue-300 transition duration-300">About Us</a>
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
                <a href="#solutions" className="block py-2 text-sm text-blue-400 hover:text-white">Hospital Integration</a>
                <a href="#solutions" className="block py-2 text-sm text-blue-400 hover:text-white">Solar-Powered Booths</a>
                <a href="#solutions" className="block py-2 text-sm text-blue-400 hover:text-white">Mobile Applications</a>
                <a href="#solutions" className="block py-2 text-sm text-blue-400 hover:text-white">Research Platform</a>
              </div>
            </div>
            
            <a href="#about" className="block py-2 text-blue-300 hover:text-white">About Us</a>
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

// Login and Registration Components
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Using URLSearchParams to format the request body as application/x-www-form-urlencoded
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);
      
      const response = await axios.post(`${API}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        "Failed to log in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="inline-block">
            <img className="h-16 w-auto" src="/images/logo.svg" alt="ZemedicAI" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-blue-300">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-800">
          {error && (
            <div className="mb-4 bg-red-900 bg-opacity-20 border border-red-800 text-red-300 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-blue-950 border-blue-700 rounded border-blue-700 text-blue-600 focus:ring-blue-500 focus:border-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 text-base font-medium disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-blue-900 to-blue-950 text-blue-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-3 px-4 border border-blue-700 rounded-md shadow-sm bg-blue-950 text-sm font-medium text-blue-300 hover:bg-blue-900 hover:bg-opacity-50 transition duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              <div>
                <a href="#" className="w-full inline-flex justify-center py-3 px-4 border border-blue-700 rounded-md shadow-sm bg-blue-950 text-sm font-medium text-blue-300 hover:bg-blue-900 hover:bg-opacity-50 transition duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.99c-1.5 1.5-3.48 2.32-5.59 2.32s-4.09-.82-5.59-2.32C4.33 15.49 3.51 13.51 3.51 11.4c0-2.11.82-4.09 2.32-5.59C7.33 4.31 9.31 3.49 11.42 3.49c2.11 0 4.09.82 5.59 2.32 1.5 1.5 2.32 3.48 2.32 5.59 0 2.11-.82 4.09-2.32 5.59z" />
                    <path d="M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
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

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "patient",
    medicalLicenseId: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }
    
    // Validate doctor has medical license ID
    if (formData.role === "doctor" && !formData.medicalLicenseId) {
      setError("Medical license ID is required for doctor accounts");
      setLoading(false);
      return;
    }
    
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: formData.role,
        medical_license_id: formData.medicalLicenseId || undefined
      };
      
      await axios.post(`${API}/users`, userData);
      
      // Auto login after registration
      const params = new URLSearchParams();
      params.append("username", formData.email);
      params.append("password", formData.password);
      
      const loginResponse = await axios.post(`${API}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      localStorage.setItem("token", loginResponse.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="inline-block">
            <img className="h-16 w-auto" src="/images/logo.svg" alt="ZemedicAI" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-blue-300">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-800">
          {error && (
            <div className="mb-4 bg-red-900 bg-opacity-20 border border-red-800 text-red-300 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-200">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-200">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-200">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-blue-200">
                Account type
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>
            
            {formData.role === "doctor" && (
              <div>
                <label htmlFor="medicalLicenseId" className="block text-sm font-medium text-blue-200">
                  Medical License ID
                </label>
                <div className="mt-1">
                  <input
                    id="medicalLicenseId"
                    name="medicalLicenseId"
                    type="text"
                    value={formData.medicalLicenseId}
                    onChange={handleChange}
                    className="bg-blue-950 border border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 rounded-md text-white text-base placeholder-blue-500"
                  />
                </div>
                <p className="mt-1 text-sm text-blue-400">Required for doctor accounts to verify your credentials.</p>
              </div>
            )}

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 bg-blue-950 border-blue-700 rounded border-blue-700 text-blue-600 focus:ring-blue-500 focus:border-blue-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-blue-300">
                I agree to the{' '}
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition duration-300">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 text-base font-medium disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <MedicalDisclaimer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App bg-black text-white">
            <Navigation />
            <Hero />
            <div className="min-h-screen bg-black">
              {/* Other landing page sections would go here */}
              <div className="py-20 px-4 text-center">
                <h2 className="text-3xl font-bold text-blue-300">Welcome to ZemedicAI</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-300">
                  A revolutionary medical imaging analysis platform powered by AI.
                </p>
              </div>
            </div>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/hospital-integration" element={
          <ProtectedRoute>
            <HospitalIntegration />
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <ImageUpload />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;