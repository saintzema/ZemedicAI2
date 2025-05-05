import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DashboardProfile = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'patient');
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    date_of_birth: '',
    gender: '',
    emergency_contact: {
      name: '',
      relationship: '',
      phone: ''
    },
    medical_info: {
      allergies: '',
      conditions: '',
      medications: '',
      blood_type: ''
    },
    profile_picture: null
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch the profile from the API
        // For demo purposes, we'll use mock data
        
        // Get role for different demo data
        const role = localStorage.getItem('userRole') || 'patient';
        setUserRole(role);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock profile data
        const mockProfile = {
          first_name: role === 'doctor' ? 'Sarah' : 'John',
          last_name: role === 'doctor' ? 'Johnson' : 'Doe',
          email: role === 'doctor' ? 'dr.sarah@zemedicai.com' : 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          address: {
            street: role === 'doctor' ? '456 Medical Plaza' : '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'United States'
          },
          date_of_birth: role === 'doctor' ? '1975-06-12' : '1985-01-15',
          gender: role === 'doctor' ? 'Female' : 'Male',
          emergency_contact: {
            name: 'Jane Doe',
            relationship: 'Spouse',
            phone: '+1 (555) 987-6543'
          },
          medical_info: {
            allergies: 'Penicillin',
            conditions: 'Asthma, Hypertension',
            medications: 'Lisinopril, Albuterol',
            blood_type: 'O+'
          },
          profile_picture: role === 'doctor' 
            ? 'https://randomuser.me/api/portraits/women/28.jpg' 
            : 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        setProfile(mockProfile);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  // Handle input change
  const handleInputChange = (section, field, value) => {
    if (section) {
      setProfile({
        ...profile,
        [section]: {
          ...profile[section],
          [field]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [field]: value
      });
    }
  };
  
  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({
          ...profile,
          profile_picture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Save profile changes
  const saveProfile = async () => {
    try {
      setSaving(true);
      
      // In a real application, we would send the profile to the API
      // For demo purposes, we'll just simulate the API call
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Exit edit mode
      setEditMode(false);
      setSaving(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile changes');
      setSaving(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-800 rounded mb-6"></div>
        <div className="h-64 bg-gray-800 rounded-lg mb-6"></div>
        <div className="h-64 bg-gray-800 rounded-lg"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Profile</h3>
        <p className="text-red-300 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Profile</h1>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={saveProfile}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors disabled:opacity-50"
              disabled={saving}
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4 text-green-300 flex items-center">
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMessage}
        </div>
      )}
      
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
          <div className="relative">
            <img
              src={profile.profile_picture || '/images/avatar-placeholder.jpg'}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="h-32 w-32 rounded-full object-cover border-4 border-gray-700"
            />
            {editMode && (
              <div className="absolute bottom-0 right-0">
                <label htmlFor="profile-image" className="cursor-pointer">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors shadow-md">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
          </div>
          
          <div className="ml-0 md:ml-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              {editMode ? (
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={profile.first_name}
                    onChange={(e) => handleInputChange(null, 'first_name', e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white w-32 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={profile.last_name}
                    onChange={(e) => handleInputChange(null, 'last_name', e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white w-32 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Last Name"
                  />
                </div>
              ) : (
                `${profile.first_name} ${profile.last_name}`
              )}
            </h2>
            <p className="text-gray-400 mt-1">
              {userRole === 'doctor' ? 'Doctor' : 'Patient'}
            </p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start">
              <div className="flex items-center mr-4 text-sm text-gray-300 mb-2 md:mb-0">
                <svg className="h-4 w-4 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.email}
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <svg className="h-4 w-4 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {editMode ? (
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white w-40 ml-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone Number"
                  />
                ) : (
                  profile.phone
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Navigation */}
      <div className="border-b border-gray-700 mb-6">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveSection('personal')}
            className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'personal'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveSection('address')}
            className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'address'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Address
          </button>
          <button
            onClick={() => setActiveSection('emergency')}
            className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'emergency'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Emergency Contact
          </button>
          <button
            onClick={() => setActiveSection('medical')}
            className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'medical'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Medical Information
          </button>
        </div>
      </div>
      
      {/* Personal Information */}
      {activeSection === 'personal' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Personal Information</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange(null, 'email', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{profile.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    type="text"
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{profile.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-400 mb-1">
                  Date of Birth
                </label>
                {editMode ? (
                  <input
                    type="date"
                    id="dob"
                    value={profile.date_of_birth}
                    onChange={(e) => handleInputChange(null, 'date_of_birth', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{formatDate(profile.date_of_birth)}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-400 mb-1">
                  Gender
                </label>
                {editMode ? (
                  <select
                    id="gender"
                    value={profile.gender}
                    onChange={(e) => handleInputChange(null, 'gender', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.gender}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Address */}
      {activeSection === 'address' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Address</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-400 mb-1">
                  Street Address
                </label>
                {editMode ? (
                  <input
                    type="text"
                    id="street"
                    value={profile.address.street}
                    onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{profile.address.street}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-1">
                    City
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      id="city"
                      value={profile.address.city}
                      onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-white">{profile.address.city}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-400 mb-1">
                    State / Province
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      id="state"
                      value={profile.address.state}
                      onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-white">{profile.address.state}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="postal_code" className="block text-sm font-medium text-gray-400 mb-1">
                    Postal Code
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      id="postal_code"
                      value={profile.address.postal_code}
                      onChange={(e) => handleInputChange('address', 'postal_code', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-white">{profile.address.postal_code}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-1">
                    Country
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      id="country"
                      value={profile.address.country}
                      onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-white">{profile.address.country}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Emergency Contact */}
      {activeSection === 'emergency' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Emergency Contact</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="emergency_name" className="block text-sm font-medium text-gray-400 mb-1">
                  Contact Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    id="emergency_name"
                    value={profile.emergency_contact.name}
                    onChange={(e) => handleInputChange('emergency_contact', 'name', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{profile.emergency_contact.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="emergency_relationship" className="block text-sm font-medium text-gray-400 mb-1">
                  Relationship
                </label>
                {editMode ? (
                  <input
                    type="text"
                    id="emergency_relationship"
                    value={profile.emergency_contact.relationship}
                    onChange={(e) => handleInputChange('emergency_contact', 'relationship', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{profile.emergency_contact.relationship}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="emergency_phone" className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    type="text"
                    id="emergency_phone"
                    value={profile.emergency_contact.phone}
                    onChange={(e) => handleInputChange('emergency_contact', 'phone', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{profile.emergency_contact.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Medical Information */}
      {activeSection === 'medical' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Medical Information</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-400 mb-1">
                  Allergies
                </label>
                {editMode ? (
                  <textarea
                    id="allergies"
                    value={profile.medical_info.allergies}
                    onChange={(e) => handleInputChange('medical_info', 'allergies', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  ></textarea>
                ) : (
                  <p className="text-white">{profile.medical_info.allergies || 'None'}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="conditions" className="block text-sm font-medium text-gray-400 mb-1">
                  Medical Conditions
                </label>
                {editMode ? (
                  <textarea
                    id="conditions"
                    value={profile.medical_info.conditions}
                    onChange={(e) => handleInputChange('medical_info', 'conditions', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  ></textarea>
                ) : (
                  <p className="text-white">{profile.medical_info.conditions || 'None'}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="medications" className="block text-sm font-medium text-gray-400 mb-1">
                  Current Medications
                </label>
                {editMode ? (
                  <textarea
                    id="medications"
                    value={profile.medical_info.medications}
                    onChange={(e) => handleInputChange('medical_info', 'medications', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  ></textarea>
                ) : (
                  <p className="text-white">{profile.medical_info.medications || 'None'}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="blood_type" className="block text-sm font-medium text-gray-400 mb-1">
                  Blood Type
                </label>
                {editMode ? (
                  <select
                    id="blood_type"
                    value={profile.medical_info.blood_type}
                    onChange={(e) => handleInputChange('medical_info', 'blood_type', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.medical_info.blood_type || 'Unknown'}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-400 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Privacy Notice</h3>
                  <p className="mt-1 text-blue-300 text-sm">
                    Your medical information is kept confidential and only shared with healthcare providers you authorize. You can adjust your data sharing preferences in the Privacy Settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;
