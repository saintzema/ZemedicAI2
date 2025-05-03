import React, { useState, useEffect } from 'react';

const DashboardDoctors = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  
  // Mock data for doctors
  useEffect(() => {
    setTimeout(() => {
      const mockDoctors = [
        {
          id: 'doc-1',
          name: 'Dr. Sarah Johnson',
          specialty: 'Pulmonology',
          hospital: 'Metro General Hospital',
          rating: 4.9,
          reviews: 128,
          image: '/images/doctors/doctor-1.jpg',
          available: true,
          lastConsultation: '2023-06-01'
        },
        {
          id: 'doc-2',
          name: 'Dr. Michael Chen',
          specialty: 'Orthopedics',
          hospital: 'University Medical Center',
          rating: 4.7,
          reviews: 94,
          image: '/images/doctors/doctor-2.jpg',
          available: true,
          lastConsultation: '2023-05-15'
        },
        {
          id: 'doc-3',
          name: 'Dr. Emily Rodriguez',
          specialty: 'Neurology',
          hospital: 'Central Clinic',
          rating: 4.8,
          reviews: 112,
          image: '/images/doctors/doctor-3.jpg',
          available: false,
          lastConsultation: '2023-04-22'
        },
        {
          id: 'doc-4',
          name: 'Dr. Robert Park',
          specialty: 'Sports Medicine',
          hospital: 'Sports Medicine Center',
          rating: 4.6,
          reviews: 87,
          image: '/images/doctors/doctor-4.jpg',
          available: true,
          lastConsultation: null
        },
        {
          id: 'doc-5',
          name: 'Dr. Lisa Wong',
          specialty: 'Gastroenterology',
          hospital: 'Gastroenterology Center',
          rating: 4.9,
          reviews: 143,
          image: '/images/doctors/doctor-5.jpg',
          available: false,
          lastConsultation: null
        },
        {
          id: 'doc-6',
          name: 'Dr. David Patel',
          specialty: 'Neurology',
          hospital: 'Neurology Institute',
          rating: 4.8,
          reviews: 109,
          image: '/images/doctors/doctor-6.jpg',
          available: true,
          lastConsultation: null
        }
      ];
      
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter doctors based on search query and specialty
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by search query
    if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
       !doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) &&
       !doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by specialty
    if (specialtyFilter !== 'all' && doctor.specialty !== specialtyFilter) {
      return false;
    }
    
    return true;
  });
  
  // Get unique specialties for the filter dropdown
  const specialties = ['all', ...new Set(doctors.map(doctor => doctor.specialty))];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">My Doctors</h2>
        <p className="text-gray-400 text-sm">Connect with healthcare professionals monitoring your health</p>
      </div>
      
      {/* Search and filter */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Search Doctors
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, specialty, or hospital..."
                className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Filter by Specialty
            </label>
            <select 
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Specialties</option>
              {specialties.filter(spec => spec !== 'all').map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-xl font-medium text-white mb-2">No doctors found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            No doctors match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSpecialtyFilter('all');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-5">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={doctor.image || '/images/avatar-placeholder.jpg'} 
                      alt={doctor.name} 
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    {doctor.available && (
                      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-800"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{doctor.name}</h3>
                    <p className="text-blue-400 text-sm">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-300 text-xs ml-1">{doctor.rating} ({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Hospital:</span> {doctor.hospital}
                  </p>
                  
                  {doctor.lastConsultation && (
                    <p className="mt-1">
                      <span className="text-gray-400">Last consultation:</span> {doctor.lastConsultation}
                    </p>
                  )}
                </div>
                
                <div className="mt-5 flex space-x-3">
                  <button className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md transition-colors">
                    Message
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md transition-colors">
                    Share Scan
                  </button>
                  <button className="p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Find New Doctors Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-2">Find New Specialists</h3>
            <p className="text-blue-200 max-w-lg">
              Connect with specialists that can provide expert analysis of your medical scans and personalized care recommendations.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Search Doctors
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardDoctors;