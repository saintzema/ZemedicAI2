import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import MedicalDisclaimer from './components/MedicalDisclaimer';

// Backend URL from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                  <h1 className="text-3xl font-bold mb-6">Welcome to ZemedicAI</h1>
                  <p className="mb-4">Please <a href="/login" className="text-blue-500 hover:underline">login</a> to access the dashboard.</p>
                </div>
              </main>
              <MedicalDisclaimer position="bottom" />
            </div>
          } />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;