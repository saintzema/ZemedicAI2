import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Solutions from './components/Solutions';
import Demo from './components/Demo';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import NewDashboard from './components/Dashboard';
import HospitalIntegration from './components/solutions/HospitalIntegration';
import SolarPoweredBooths from './components/solutions/SolarPoweredBooths';
import MobileApplications from './components/solutions/MobileApplications';
import Partners from './components/Partners';
import MedicalDisclaimer from './components/MedicalDisclaimer';

// Backend URL from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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