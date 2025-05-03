import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPatients = ({ user }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Fetch patients (mock data for now)
  useEffect(() => {
    setTimeout(() => {
      const mockPatients = [
        {
          id: 'pat-1',
          name: 'James Wilson',
          age: 48,
          gender: 'Male',
          condition: 'Pneumonia',
          status: 'Active',
          lastScan: '2023-06-15',
          scanType: 'X-Ray',
          lastVisit: '2023-06-01',
          nextAppointment: '2023-06-30',
          email: 'james.wilson@example.com',
          phone: '(555) 123-4567',
          alerts: 2
        },
        {
          id: 'pat-2',
          name: 'Emily Johnson',
          age: 35,
          gender: 'Female',
          condition: 'Lumbar Herniation',
          status: 'Active',
          lastScan: '2023-05-28',
          scanType: 'MRI',
          lastVisit: '2023-05-30',
          nextAppointment: '2023-07-15',
          email: 'emily.johnson@example.com',
          phone: '(555) 234-5678',
          alerts: 0
        },
        {
          id: 'pat-3',
          name: 'Robert Chen',
          age: 62,
          gender: 'Male',
          condition: 'Sinusitis',
          status: 'Recovering',
          lastScan: '2023-04-10',
          scanType: 'CT Scan',
          lastVisit: '2023-04-15',
          nextAppointment: '2023-06-25',
          email: 'robert.chen@example.com',
          phone: '(555) 345-6789',
          alerts: 1
        },
        {
          id: 'pat-4',
          name: 'Sarah Martinez',
          age: 29,
          gender: 'Female',
          condition: 'Wrist Fracture',
          status: 'Recovered',
          lastScan: '2023-03-22',
          scanType: 'X-Ray',
          lastVisit: '2023-05-10',
          nextAppointment: null,
          email: 'sarah.martinez@example.com',
          phone: '(555) 456-7890',
          alerts: 0
        },
        {
          id: 'pat-5',
          name: 'David Kim',
          age: 54,
          gender: 'Male',
          condition: 'Osteoarthritis',
          status: 'Active',
          lastScan: '2023-02-14',
          scanType: 'MRI',
          lastVisit: '2023-05-20',
          nextAppointment: '2023-07-05',
          email: 'david.kim@example.com',
          phone: '(555) 567-8901',
          alerts: 3
        },
        {
          id: 'pat-6',
          name: 'Lisa Brown',
          age: 41,
          gender: 'Female',
          condition: 'Bronchitis',
          status: 'Recovering',
          lastScan: '2023-01-05',
          scanType: 'X-Ray',
          lastVisit: '2023-06-05',
          nextAppointment: '2023-07-01',
          email: 'lisa.brown@example.com',
          phone: '(555) 678-9012',
          alerts: 0
        },
        {
          id: 'pat-7',
          name: 'Michael Zhang',
          age: 39,
          gender: 'Male',
          condition: 'Gastritis',
          status: 'Active',
          lastScan: '2022-11-18',
          scanType: 'Ultrasound',
          lastVisit: '2023-05-25',
          nextAppointment: '2023-06-27',
          email: 'michael.zhang@example.com',
          phone: '(555) 789-0123',
          alerts: 1
        }
      ];
      
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter patients based on search query and status
  const filteredPatients = patients.filter(patient => {
    // Filter by search query
    if (searchQuery && !patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
       !patient.condition.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && patient.status !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  // Status badge color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-blue-900 text-blue-300';
      case 'Recovering': return 'bg-green-900 text-green-300';
      case 'Recovered': return 'bg-teal-900 text-teal-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-white">Patients</h2>
          <p className="text-gray-400 text-sm">Manage and monitor your patients</p>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Patient</span>
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center space-x-1">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Search Patients
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, condition..."
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
              Filter by Status
            </label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Recovering">Recovering</option>
              <option value="Recovered">Recovered</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Patients Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Scan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Next Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Alerts
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-300 font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{patient.name}</div>
                        <div className="text-sm text-gray-400">{patient.age} years, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div>
                      {patient.lastScan}
                    </div>
                    <div className="text-gray-400">
                      {patient.scanType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {patient.nextAppointment || 'None scheduled'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {patient.alerts > 0 ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-900 text-red-300">
                        {patient.alerts} Alert{patient.alerts !== 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-400">
                        No Alerts
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/dashboard/patients/${patient.id}`} 
                      className="text-blue-400 hover:text-blue-300 mr-3"
                    >
                      View
                    </Link>
                    <button className="text-blue-400 hover:text-blue-300">
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-400">No patients match your filter criteria.</p>
          </div>
        )}
        
        {filteredPatients.length > 0 && (
          <div className="px-6 py-4 bg-gray-750 border-t border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing {filteredPatients.length} of {patients.length} patients
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-800 bg-opacity-40">
              <svg className="h-8 w-8 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">{patients.length}</h2>
              <p className="text-blue-200">Total Patients</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-800 bg-opacity-40">
              <svg className="h-8 w-8 text-purple-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">12</h2>
              <p className="text-purple-200">Appointments This Week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-800 bg-opacity-40">
              <svg className="h-8 w-8 text-red-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">7</h2>
              <p className="text-red-200">Alerts Requiring Attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPatients;