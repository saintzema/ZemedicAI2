import React, { useState, useEffect } from 'react';

const DashboardDoctors = ({ user }) => {
  // Only allow patients to access this component
  if (user.role !== 'patient') {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-6 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-white mb-2">Access Restricted</h3>
        <p className="text-red-300 mb-4">This section is only available to users with patient role.</p>
        <button 
          onClick={() => window.history.back()} 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch this data from the API
        // For demo purposes, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock doctors data
        const mockDoctors = [
          {
            id: 'doc-001',
            first_name: 'Sarah',
            last_name: 'Johnson',
            specialty: 'Radiology',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            hospital: 'General Medical Center',
            is_primary: true,
            bio: 'Board-certified radiologist with over 15 years of experience specializing in chest and abdominal imaging. Dr. Johnson is dedicated to providing accurate and timely diagnostic services.',
            education: [
              {
                degree: 'MD',
                institution: 'Harvard Medical School',
                year: '2002'
              },
              {
                degree: 'Residency in Diagnostic Radiology',
                institution: 'Massachusetts General Hospital',
                year: '2006'
              },
              {
                degree: 'Fellowship in Thoracic Radiology',
                institution: 'Johns Hopkins Hospital',
                year: '2008'
              }
            ],
            contact: {
              email: 'sarah.johnson@generalmedicine.com',
              phone: '+1 (555) 234-5678',
              office_hours: 'Mon-Fri: 9AM-5PM'
            },
            last_appointment: '2023-05-15T10:30:00Z',
            next_appointment: '2023-06-20T14:00:00Z'
          },
          {
            id: 'doc-002',
            first_name: 'David',
            last_name: 'Chen',
            specialty: 'Neurology',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            hospital: 'Riverside Neuroscience Institute',
            is_primary: false,
            bio: 'Neurologist with specialized training in brain imaging interpretation and neurological disorders. Dr. Chen combines cutting-edge research with compassionate patient care.',
            education: [
              {
                degree: 'MD',
                institution: 'Stanford University School of Medicine',
                year: '2005'
              },
              {
                degree: 'Residency in Neurology',
                institution: 'UCSF Medical Center',
                year: '2009'
              },
              {
                degree: 'Fellowship in Neuroimaging',
                institution: 'Mayo Clinic',
                year: '2011'
              }
            ],
            contact: {
              email: 'david.chen@riverside.neuro.org',
              phone: '+1 (555) 987-6543',
              office_hours: 'Mon, Wed, Fri: 8AM-4PM'
            },
            last_appointment: '2023-04-20T15:45:00Z',
            next_appointment: null
          },
          {
            id: 'doc-003',
            first_name: 'Emily',
            last_name: 'Wilson',
            specialty: 'Endocrinology',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            hospital: 'City Endocrine Center',
            is_primary: false,
            bio: 'Endocrinologist focused on thyroid disorders and metabolic health. Dr. Wilson emphasizes preventative care and long-term management of endocrine conditions.',
            education: [
              {
                degree: 'MD',
                institution: 'Johns Hopkins University School of Medicine',
                year: '2007'
              },
              {
                degree: 'Residency in Internal Medicine',
                institution: 'Cleveland Clinic',
                year: '2010'
              },
              {
                degree: 'Fellowship in Endocrinology',
                institution: 'Duke University Medical Center',
                year: '2012'
              }
            ],
            contact: {
              email: 'emily.wilson@cityendocrine.org',
              phone: '+1 (555) 345-6789',
              office_hours: 'Tue, Thu: 9AM-6PM'
            },
            last_appointment: '2023-03-12T11:15:00Z',
            next_appointment: '2023-06-25T10:00:00Z'
          },
          {
            id: 'doc-004',
            first_name: 'Robert',
            last_name: 'Anderson',
            specialty: 'Orthopedics',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            hospital: 'Sports Medicine & Orthopedic Center',
            is_primary: false,
            bio: 'Orthopedic surgeon specializing in joint disorders and sports injuries. Dr. Anderson works with professional athletes and has extensive experience in minimally invasive procedures.',
            education: [
              {
                degree: 'MD',
                institution: 'University of Pennsylvania School of Medicine',
                year: '2004'
              },
              {
                degree: 'Residency in Orthopedic Surgery',
                institution: 'Hospital for Special Surgery',
                year: '2009'
              },
              {
                degree: 'Fellowship in Sports Medicine',
                institution: 'Andrews Sports Medicine & Orthopaedic Center',
                year: '2010'
              }
            ],
            contact: {
              email: 'robert.anderson@sportsmed.org',
              phone: '+1 (555) 789-0123',
              office_hours: 'Mon, Wed, Fri: 7AM-3PM'
            },
            last_appointment: '2023-05-05T09:00:00Z',
            next_appointment: null
          }
        ];
        
        setDoctors(mockDoctors);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load your doctors');
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle sending message to doctor
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!contactMessage.trim()) {
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage(`Message sent successfully to Dr. ${selectedDoctor.last_name}`);
      setContactMessage('');
      setSubmitting(false);
      
      setTimeout(() => {
        setShowContactModal(false);
        setSuccessMessage('');
      }, 2000);
    }, 1500);
  };
  
  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      doctor.first_name.toLowerCase().includes(query) ||
      doctor.last_name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query) ||
      doctor.hospital.toLowerCase().includes(query)
    );
  });
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-800 rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-800 rounded-lg"></div>
          <div className="h-64 bg-gray-800 rounded-lg"></div>
          <div className="h-64 bg-gray-800 rounded-lg"></div>
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
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Doctors</h3>
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
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">My Doctors</h1>
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors..."
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
      </div>
      
      {selectedDoctor ? (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">Doctor Profile</h2>
            <button
              onClick={() => setSelectedDoctor(null)}
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
                  src={selectedDoctor.avatar}
                  alt={`Dr. ${selectedDoctor.first_name} ${selectedDoctor.last_name}`}
                  className="h-48 w-48 object-cover rounded-full border-4 border-gray-700"
                />
                <h3 className="text-xl font-bold text-white mt-4">
                  Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                </h3>
                <p className="text-gray-400">{selectedDoctor.specialty}</p>
                
                {selectedDoctor.is_primary && (
                  <span className="mt-2 px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-medium">
                    Primary Care Physician
                  </span>
                )}
                
                <div className="mt-6 flex flex-col space-y-3 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setContactMessage('');
                      setShowContactModal(true);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Send Message
                  </button>
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                  >
                    <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule Appointment
                  </button>
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors"
                  >
                    <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Share Medical Records
                  </button>
                </div>
              </div>
              
              <div className="md:w-2/3 md:pl-8">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Biography</h4>
                  <p className="text-gray-300">{selectedDoctor.bio}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Contact Information</h4>
                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium">{selectedDoctor.contact.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white font-medium">{selectedDoctor.contact.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Hospital</p>
                        <p className="text-white font-medium">{selectedDoctor.hospital}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Office Hours</p>
                        <p className="text-white font-medium">{selectedDoctor.contact.office_hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">Education & Training</h4>
                  <div className="space-y-3">
                    {selectedDoctor.education.map((edu, index) => (
                      <div key={index} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                        <p className="text-white font-medium">{edu.degree}</p>
                        <p className="text-gray-400">{edu.institution}, {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Appointments</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-900 bg-opacity-50 rounded-full mr-3">
                          <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">Last Appointment</p>
                          <p className="text-sm text-gray-400 mt-1">{formatDate(selectedDoctor.last_appointment)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start">
                        <div className="p-2 bg-green-900 bg-opacity-50 rounded-full mr-3">
                          <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">Next Appointment</p>
                          <p className="text-sm text-gray-400 mt-1">{formatDate(selectedDoctor.next_appointment)}</p>
                          {selectedDoctor.next_appointment && (
                            <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                              Add to Calendar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div 
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="px-6 py-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">Dr. {doctor.last_name}</h3>
                    {doctor.is_primary && (
                      <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-medium">
                        Primary
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={doctor.avatar}
                      alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                      className="h-14 w-14 object-cover rounded-full mr-4"
                    />
                    <div>
                      <p className="text-white font-medium">{doctor.first_name} {doctor.last_name}</p>
                      <p className="text-gray-400 text-sm">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Hospital</p>
                    <p className="text-white">{doctor.hospital}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Next Appointment</p>
                    <p className="text-white">{formatDate(doctor.next_appointment)}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDoctor(doctor);
                      }}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors text-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDoctor(doctor);
                        setContactMessage('');
                        setShowContactModal(true);
                      }}
                      className="flex items-center justify-center px-3 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md transition-colors text-sm"
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-gray-800 rounded-lg p-8 text-center">
              <svg 
                className="h-12 w-12 text-gray-600 mx-auto mb-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No doctors found</h3>
              <p className="text-gray-500">No doctors match your search criteria. Try adjusting your search.</p>
            </div>
          )}
          
          {/* Add New Doctor Card */}
          <div 
            onClick={() => alert('This feature would allow adding a new doctor to your care team')}
            className="bg-gray-800 rounded-lg border border-dashed border-gray-600 overflow-hidden hover:border-blue-500 cursor-pointer transition-colors p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="p-4 bg-blue-900 bg-opacity-20 rounded-full mb-4">
              <svg className="h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Add New Doctor</h3>
            <p className="text-gray-400 mb-4">
              Add a new healthcare provider to your care team
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
            >
              Add Doctor
            </button>
          </div>
        </div>
      )}
      
      {/* Contact Doctor Modal */}
      {showContactModal && selectedDoctor && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-md w-full">
            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Contact Dr. {selectedDoctor.last_name}</h3>
                <button
                  onClick={() => {
                    setShowContactModal(false);
                    setSuccessMessage('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSendMessage}>
                <div className="p-6">
                  {/* Success Message */}
                  {successMessage && (
                    <div className="mb-4 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-3 text-green-300 flex items-center">
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {successMessage}
                    </div>
                  )}
                  
                  <p className="text-gray-300 mb-4">
                    Send a message to Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}. They will typically respond within 24-48 hours.
                  </p>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows="6"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      For urgent matters, please call {selectedDoctor.contact.phone}
                    </p>
                    
                    <button
                      type="submit"
                      disabled={submitting || !contactMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDoctors;
