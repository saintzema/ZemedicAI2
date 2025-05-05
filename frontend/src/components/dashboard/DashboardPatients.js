import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPatients = ({ user }) => {
  // Only allow doctors to access this component
  if (user.role !== 'doctor') {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Access Restricted</h3>
        <p className="text-red-300 mb-4">This section is only available to users with doctor role.</p>
        <button 
          onClick={() => window.history.back()} 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Fetch patients data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch this data from the API
        // For demo purposes, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock patients data
        const mockPatients = [
          {
            id: 'patient-001',
            first_name: 'John',
            last_name: 'Doe',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            age: 45,
            gender: 'Male',
            status: 'active',
            recent_activity: '2023-05-22T09:30:00Z',
            contact: {
              email: 'john.doe@example.com',
              phone: '+1 (555) 123-4567',
              address: '123 Main St, New York, NY 10001'
            },
            vitals: {
              heart_rate: 72,
              blood_pressure: '120/80',
              temperature: 98.6,
              respiratory_rate: 16,
              oxygen_saturation: 98
            },
            medical_history: {
              conditions: ['Hypertension', 'Type 2 Diabetes'],
              allergies: ['Penicillin'],
              medications: ['Lisinopril 10mg', 'Metformin 500mg'],
              surgeries: ['Appendectomy (2010)']
            },
            last_visit: '2023-05-15T10:30:00Z',
            next_appointment: '2023-06-20T14:00:00Z',
            scans: [
              {
                id: 'scan-001',
                type: 'Chest X-Ray',
                date: '2023-05-15T10:30:00Z',
                findings: 'Normal'
              },
              {
                id: 'scan-002',
                type: 'Abdominal Ultrasound',
                date: '2023-03-10T11:15:00Z',
                findings: 'Mild fatty liver'
              }
            ]
          },
          {
            id: 'patient-002',
            first_name: 'Alice',
            last_name: 'Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            age: 32,
            gender: 'Female',
            status: 'active',
            recent_activity: '2023-05-21T15:45:00Z',
            contact: {
              email: 'alice.johnson@example.com',
              phone: '+1 (555) 234-5678',
              address: '456 Park Ave, New York, NY 10022'
            },
            vitals: {
              heart_rate: 68,
              blood_pressure: '115/75',
              temperature: 98.4,
              respiratory_rate: 14,
              oxygen_saturation: 99
            },
            medical_history: {
              conditions: ['Asthma', 'Anxiety'],
              allergies: ['Dust', 'Pollen'],
              medications: ['Albuterol', 'Sertraline 50mg'],
              surgeries: []
            },
            last_visit: '2023-05-10T09:00:00Z',
            next_appointment: '2023-06-10T11:30:00Z',
            scans: [
              {
                id: 'scan-003',
                type: 'Chest X-Ray',
                date: '2023-05-10T09:00:00Z',
                findings: 'Normal'
              }
            ]
          },
          {
            id: 'patient-003',
            first_name: 'Robert',
            last_name: 'Smith',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            age: 58,
            gender: 'Male',
            status: 'critical',
            recent_activity: '2023-05-23T08:15:00Z',
            contact: {
              email: 'robert.smith@example.com',
              phone: '+1 (555) 345-6789',
              address: '789 Broadway, New York, NY 10003'
            },
            vitals: {
              heart_rate: 82,
              blood_pressure: '145/90',
              temperature: 99.1,
              respiratory_rate: 18,
              oxygen_saturation: 96
            },
            medical_history: {
              conditions: ['Coronary Artery Disease', 'Hyperlipidemia', 'COPD'],
              allergies: ['Sulfa drugs'],
              medications: ['Atorvastatin 40mg', 'Aspirin 81mg', 'Metoprolol 50mg'],
              surgeries: ['Coronary Stent Placement (2018)']
            },
            last_visit: '2023-05-22T08:15:00Z',
            next_appointment: '2023-05-29T10:00:00Z',
            scans: [
              {
                id: 'scan-004',
                type: 'Chest X-Ray',
                date: '2023-05-22T08:15:00Z',
                findings: 'Pulmonary opacity in right lower lobe, possible pneumonia'
              },
              {
                id: 'scan-005',
                type: 'Cardiac CT',
                date: '2023-01-15T13:30:00Z',
                findings: 'Moderate coronary calcification'
              }
            ]
          },
          {
            id: 'patient-004',
            first_name: 'Emily',
            last_name: 'Davis',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            age: 29,
            gender: 'Female',
            status: 'inactive',
            recent_activity: '2023-03-05T14:00:00Z',
            contact: {
              email: 'emily.davis@example.com',
              phone: '+1 (555) 456-7890',
              address: '101 5th Ave, New York, NY 10011'
            },
            vitals: {
              heart_rate: 70,
              blood_pressure: '110/70',
              temperature: 98.5,
              respiratory_rate: 15,
              oxygen_saturation: 99
            },
            medical_history: {
              conditions: ['Migraine'],
              allergies: [],
              medications: ['Sumatriptan PRN'],
              surgeries: []
            },
            last_visit: '2023-03-05T14:00:00Z',
            next_appointment: null,
            scans: []
          },
          {
            id: 'patient-005',
            first_name: 'Michael',
            last_name: 'Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            age: 41,
            gender: 'Male',
            status: 'attention',
            recent_activity: '2023-05-18T11:30:00Z',
            contact: {
              email: 'michael.wilson@example.com',
              phone: '+1 (555) 567-8901',
              address: '222 W 23rd St, New York, NY 10011'
            },
            vitals: {
              heart_rate: 75,
              blood_pressure: '128/85',
              temperature: 98.8,
              respiratory_rate: 17,
              oxygen_saturation: 97
            },
            medical_history: {
              conditions: ['Chronic Low Back Pain', 'Insomnia'],
              allergies: ['NSAIDs'],
              medications: ['Cyclobenzaprine 10mg', 'Trazodone 50mg'],
              surgeries: []
            },
            last_visit: '2023-05-18T11:30:00Z',
            next_appointment: '2023-06-15T09:30:00Z',
            scans: [
              {
                id: 'scan-006',
                type: 'Lumbar Spine MRI',
                date: '2023-05-18T11:30:00Z',
                findings: 'L4-L5 disc herniation with moderate spinal stenosis'
              }
            ]
          }
        ];
        
        setPatients(mockPatients);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to load patients');
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'None scheduled';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filter patients based on search query and status filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      !searchQuery || 
      patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medical_history.conditions.some(condition => 
        condition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesStatus = 
      statusFilter === 'all' ||
      patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get status badge based on patient status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
            Inactive
          </span>
        );
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
            Critical
          </span>
        );
      case 'attention':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
            Needs Attention
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
            Unknown
          </span>
        );
    }
  };
  
  // Get activity time display
  const getActivityTimeDisplay = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-800 rounded mb-6"></div>
        <div className="grid grid-cols-1 gap-4">
          <div className="h-16 bg-gray-800 rounded-lg"></div>
          <div className="h-16 bg-gray-800 rounded-lg"></div>
          <div className="h-16 bg-gray-800 rounded-lg"></div>
          <div className="h-16 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Patients</h3>
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
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">My Patients</h1>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="critical">Critical</option>
            <option value="attention">Needs Attention</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            onClick={() => alert('This would show a patient registration form')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Patient
          </button>
        </div>
      </div>
      
      {selectedPatient ? (
        <div>
          {/* Patient Profile */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-white">Patient Profile</h2>
                <div className="ml-3">
                  {getStatusBadge(selectedPatient.status)}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPatient(null);
                  setActiveTab('overview');
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                  <img
                    src={selectedPatient.avatar}
                    alt={`${selectedPatient.first_name} ${selectedPatient.last_name}`}
                    className="h-40 w-40 object-cover rounded-full border-4 border-gray-700"
                  />
                  <h3 className="text-xl font-bold text-white mt-4">
                    {selectedPatient.first_name} {selectedPatient.last_name}
                  </h3>
                  <p className="text-gray-400">{selectedPatient.age} Years, {selectedPatient.gender}</p>
                  
                  <div className="mt-6 flex flex-col space-y-3 w-full max-w-xs">
                    <button
                      onClick={() => alert('This would open a message composition interface')}
                      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Send Message
                    </button>
                    <button
                      onClick={() => alert('This would open an appointment scheduling interface')}
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                    >
                      <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Appointment
                    </button>
                    {selectedPatient.status === 'inactive' ? (
                      <button
                        onClick={() => alert('This would mark the patient as active')}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
                      >
                        <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Mark as Active
                      </button>
                    ) : (
                      <button
                        onClick={() => alert('This would create a new note or observation')}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
                      >
                        <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Add Note
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-8">
                  {/* Patient Profile Tabs */}
                  <div className="border-b border-gray-700 mb-6">
                    <div className="flex space-x-8">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === 'overview'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('medical-history')}
                        className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === 'medical-history'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        Medical History
                      </button>
                      <button
                        onClick={() => setActiveTab('scans')}
                        className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === 'scans'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        Scans & Reports
                      </button>
                    </div>
                  </div>
                  
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">Contact Information</h4>
                          <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white">{selectedPatient.contact.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Phone</p>
                                <p className="text-white">{selectedPatient.contact.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Address</p>
                                <p className="text-white">{selectedPatient.contact.address}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">Upcoming Appointments</h4>
                          <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                            {selectedPatient.next_appointment ? (
                              <div>
                                <p className="text-white font-medium">{formatDate(selectedPatient.next_appointment)}</p>
                                <p className="text-gray-400 text-sm mt-1">Follow-up appointment</p>
                                <div className="mt-3 flex space-x-2">
                                  <button className="text-sm text-blue-400 hover:text-blue-300">
                                    Reschedule
                                  </button>
                                  <span className="text-gray-600">|</span>
                                  <button className="text-sm text-red-400 hover:text-red-300">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-gray-400">No upcoming appointments</p>
                                <button
                                  onClick={() => alert('This would open an appointment scheduling interface')}
                                  className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                                >
                                  Schedule new appointment
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-white mb-2">Current Vitals</h4>
                        <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                              <p className="text-sm text-gray-400">Heart Rate</p>
                              <p className="text-white font-medium">{selectedPatient.vitals.heart_rate} bpm</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Blood Pressure</p>
                              <p className="text-white font-medium">{selectedPatient.vitals.blood_pressure} mmHg</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Temperature</p>
                              <p className="text-white font-medium">{selectedPatient.vitals.temperature}°F</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Respiratory Rate</p>
                              <p className="text-white font-medium">{selectedPatient.vitals.respiratory_rate} breaths/min</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Oxygen Saturation</p>
                              <p className="text-white font-medium">{selectedPatient.vitals.oxygen_saturation}%</p>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-gray-400">
                            Last updated: {formatDate(selectedPatient.last_visit)}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Recent Activity</h4>
                        <div className="bg-gray-750 rounded-lg border border-gray-700">
                          <div className="p-4 border-b border-gray-700">
                            <div className="flex items-start">
                              <div className="p-2 bg-blue-900 bg-opacity-50 rounded-full mr-3">
                                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-white font-medium">Medical Records Updated</p>
                                <p className="text-gray-400 text-sm mt-1">
                                  New scan results and visit notes added
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {getActivityTimeDisplay(selectedPatient.recent_activity)}
                                </p>
                              </div>
                            </div>
                          </div>
                          {selectedPatient.next_appointment && (
                            <div className="p-4 border-b border-gray-700">
                              <div className="flex items-start">
                                <div className="p-2 bg-green-900 bg-opacity-50 rounded-full mr-3">
                                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-white font-medium">Appointment Scheduled</p>
                                  <p className="text-gray-400 text-sm mt-1">
                                    Follow-up appointment scheduled for {formatDate(selectedPatient.next_appointment)}
                                  </p>
                                  <p className="text-gray-500 text-xs mt-1">
                                    3 days ago
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className="p-2 bg-purple-900 bg-opacity-50 rounded-full mr-3">
                                <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-white font-medium">Patient Visit</p>
                                <p className="text-gray-400 text-sm mt-1">
                                  Check-up and consultation completed
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {getActivityTimeDisplay(selectedPatient.last_visit)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Medical History Tab */}
                  {activeTab === 'medical-history' && (
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-white mb-2">Medical Conditions</h4>
                        <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                          {selectedPatient.medical_history.conditions.length > 0 ? (
                            <ul className="space-y-2">
                              {selectedPatient.medical_history.conditions.map((condition, index) => (
                                <li key={index} className="flex items-center">
                                  <svg className="h-4 w-4 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  <span className="text-white">{condition}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-400">No known medical conditions</p>
                          )}
                          <button
                            onClick={() => alert('This would open a form to add a new condition')}
                            className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                          >
                            Add condition
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-white mb-2">Allergies</h4>
                        <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                          {selectedPatient.medical_history.allergies.length > 0 ? (
                            <ul className="space-y-2">
                              {selectedPatient.medical_history.allergies.map((allergy, index) => (
                                <li key={index} className="flex items-center">
                                  <svg className="h-4 w-4 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                  <span className="text-white">{allergy}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-400">No known allergies</p>
                          )}
                          <button
                            onClick={() => alert('This would open a form to add a new allergy')}
                            className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                          >
                            Add allergy
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-white mb-2">Current Medications</h4>
                        <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                          {selectedPatient.medical_history.medications.length > 0 ? (
                            <ul className="space-y-2">
                              {selectedPatient.medical_history.medications.map((medication, index) => (
                                <li key={index} className="flex items-center">
                                  <svg className="h-4 w-4 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="text-white">{medication}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-400">No current medications</p>
                          )}
                          <button
                            onClick={() => alert('This would open a form to add a new medication')}
                            className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                          >
                            Add medication
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-white mb-2">Surgical History</h4>
                        <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                          {selectedPatient.medical_history.surgeries.length > 0 ? (
                            <ul className="space-y-2">
                              {selectedPatient.medical_history.surgeries.map((surgery, index) => (
                                <li key={index} className="flex items-center">
                                  <svg className="h-4 w-4 text-purple-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                  </svg>
                                  <span className="text-white">{surgery}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-400">No surgical history</p>
                          )}
                          <button
                            onClick={() => alert('This would open a form to add a new surgery')}
                            className="mt-3 text-sm text-blue-400 hover:text-blue-300"
                          >
                            Add surgery
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Scans Tab */}
                  {activeTab === 'scans' && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-white">Medical Imaging & Reports</h4>
                        <button
                          onClick={() => alert('This would open the scan upload interface')}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Upload New Scan
                        </button>
                      </div>
                      
                      {selectedPatient.scans.length > 0 ? (
                        <div className="space-y-4">
                          {selectedPatient.scans.map((scan) => (
                            <div key={scan.id} className="bg-gray-750 rounded-lg border border-gray-700 overflow-hidden">
                              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                                <div>
                                  <h5 className="text-md font-medium text-white">{scan.type}</h5>
                                  <p className="text-sm text-gray-400">{formatDate(scan.date)}</p>
                                </div>
                                <Link 
                                  to={`/dashboard/analyses?id=${scan.id}`}
                                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors text-sm"
                                >
                                  View Analysis
                                </Link>
                              </div>
                              <div className="p-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h6 className="text-white font-medium mb-1">Findings</h6>
                                    <p className="text-gray-300">{scan.findings}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => alert('This would download the scan')}
                                      className="p-2 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 hover:text-white"
                                    >
                                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => alert('This would open sharing options')}
                                      className="p-2 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 hover:text-white"
                                    >
                                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-750 rounded-lg p-6 text-center border border-gray-700">
                          <svg className="h-12 w-12 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-400 mb-2">No Scans Available</h3>
                          <p className="text-gray-500 mb-4">There are no scans or medical reports for this patient yet.</p>
                          <button
                            onClick={() => alert('This would open the scan upload interface')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                          >
                            Upload First Scan
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {/* Patients Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Next Appointment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Medical Conditions
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover"
                              src={patient.avatar}
                              alt={`${patient.first_name} ${patient.last_name}`}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{patient.first_name} {patient.last_name}</div>
                            <div className="text-sm text-gray-400">{patient.age} y/o, {patient.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(patient.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{getActivityTimeDisplay(patient.recent_activity)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {patient.next_appointment ? (
                            <span>{formatDate(patient.next_appointment).split(',')[0]}</span>
                          ) : (
                            <span className="text-gray-500">None scheduled</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {patient.medical_history.conditions.slice(0, 2).map((condition, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900 text-blue-300"
                            >
                              {condition}
                            </span>
                          ))}
                          {patient.medical_history.conditions.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
                              +{patient.medical_history.conditions.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => alert(`This would message ${patient.first_name} ${patient.last_name}`)}
                          className="text-green-400 hover:text-green-300"
                        >
                          Message
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="h-10 w-10 text-gray-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-400 mb-1">No patients found</p>
                        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPatients;
