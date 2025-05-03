import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";

// Components
import TypingAnimation from './components/TypingAnimation';
import AfricaMap from './components/AfricaMap';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import NewDashboard from './components/NewDashboard';
import ImageUpload from './components/ImageUpload';
import HospitalIntegration from './components/solutions/HospitalIntegration';
import SolarPoweredBooths from './components/solutions/SolarPoweredBooths';
import MobileApplications from './components/solutions/MobileApplications';
import Pricing from './components/Pricing';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Environment Variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
              <img src="/logo.png" alt="ZemedicAI Logo" className="h-full w-full object-contain" />
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
              <Link to="/hospital-integration" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Hospital Integration</Link>
              <Link to="/solar-booths" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Solar-Powered Booths</Link>
              <Link to="/mobile-applications" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Mobile Applications</Link>
              <a href="#solutions" className="block px-4 py-2 hover:bg-blue-900 text-blue-300 hover:text-white">Research Platform</a>
            </div>
          </div>
          <a href="#about" className="hover:text-blue-300 transition duration-300">About Us</a>
          <Link to="/pricing" className="hover:text-blue-300 transition duration-300">Pricing</Link>
          <a href="#contact" className="hover:text-blue-300 transition duration-300">Contact</a>
        </div>
        
        <div className="hidden lg:flex space-x-3">
          <Link to="/login" className="px-5 py-2 text-sm rounded-md border border-blue-500 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300">Log In</Link>
          <Link to="/signup" className="px-5 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">Sign Up</Link>
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
                <Link to="/hospital-integration" className="block py-2 text-sm text-blue-400 hover:text-white">Hospital Integration</Link>
                <Link to="/solar-booths" className="block py-2 text-sm text-blue-400 hover:text-white">Solar-Powered Booths</Link>
                <Link to="/mobile-applications" className="block py-2 text-sm text-blue-400 hover:text-white">Mobile Applications</Link>
                <a href="#solutions" className="block py-2 text-sm text-blue-400 hover:text-white">Research Platform</a>
              </div>
            </div>
            
            <a href="#about" className="block py-2 text-blue-300 hover:text-white">About Us</a>
            <Link to="/pricing" className="block py-2 text-blue-300 hover:text-white">Pricing</Link>
            <a href="#contact" className="block py-2 text-blue-300 hover:text-white">Contact</a>
            
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-blue-800">
              <Link to="/login" className="py-2 text-center text-blue-300 hover:text-white border border-blue-700 rounded-md">Log In</Link>
              <Link to="/signup" className="py-2 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-blue-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="ZemedicAI Logo" className="h-10 w-10" />
              <span className="text-xl font-bold">ZemedicAI</span>
            </Link>
            <p className="text-gray-400 mb-4">Transforming healthcare in Africa through AI-powered medical imaging analysis.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/hospital-integration" className="text-gray-400 hover:text-blue-400">Hospital Integration</Link></li>
              <li><Link to="/solar-booths" className="text-gray-400 hover:text-blue-400">Solar-Powered Booths</Link></li>
              <li><Link to="/mobile-applications" className="text-gray-400 hover:text-blue-400">Mobile Applications</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">X-ray Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Custom Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">123 Innovation Street, Tech Hub, Nairobi, Kenya</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">info@zemedicai.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">+254 123 456 789</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-500">&copy; 2023 ZemedicAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-blue-400">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-blue-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Hero Component
const Hero = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/20 z-10"></div>
      
      {/* Hero content */}
      <div className="relative z-20 pt-32 pb-16 md:pt-48 md:pb-32 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              <TypingAnimation 
                phrases={[
                  "AI-Powered Medical Imaging",
                  "Affordable Healthcare Analytics",
                  "Serving Africa's Diagnostic Needs"
                ]}
                speed={60}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300"
              />
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-blue-100 max-w-xl mx-auto lg:mx-0">
              Revolutionizing healthcare diagnostics in Africa with accessible AI-powered medical imaging analysis.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Get Started Free
              </Link>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 rounded-lg border-2 border-blue-500 text-white hover:bg-blue-900 hover:bg-opacity-30 font-semibold transition-colors duration-300"
              >
                How It Works
              </a>
            </div>
            <div className="mt-8 text-blue-300 text-sm flex items-center justify-center lg:justify-start">
              <span className="flex items-center">
                <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card required
              </span>
              <span className="mx-4">•</span>
              <span className="flex items-center">
                <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free 14-day trial
              </span>
            </div>
          </div>
          <div className="relative">
            <AfricaMap />
          </div>
        </div>
      </div>
    </div>
  );
};

// Partners Component
const Partners = () => {
  return (
    <div className="bg-gray-900 py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-gray-400 mb-8 text-sm uppercase tracking-wider">Trusted by hospitals and clinics across Africa</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          <div className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img src="/images/partners/logo1.svg" alt="Partner" className="h-full"/>
          </div>
          <div className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img src="/images/partners/logo2.svg" alt="Partner" className="h-full"/>
          </div>
          <div className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img src="/images/partners/logo3.svg" alt="Partner" className="h-full"/>
          </div>
          <div className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img src="/images/partners/logo4.svg" alt="Partner" className="h-full"/>
          </div>
          <div className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img src="/images/partners/logo5.svg" alt="Partner" className="h-full"/>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
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
          <Route path="/solar-booths" element={<SolarPoweredBooths />} />
          <Route path="/mobile-applications" element={<MobileApplications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;