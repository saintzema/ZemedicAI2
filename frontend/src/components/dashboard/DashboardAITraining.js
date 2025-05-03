import React, { useState } from 'react';

const DashboardAITraining = ({ user }) => {
  const [activeTab, setActiveTab] = useState('models');
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  
  // Mock data for AI models
  const models = [
    {
      id: 'model-1',
      name: 'Chest X-Ray Analysis Model',
      type: 'Classification',
      accuracy: 0.94,
      lastTrained: '2023-06-10',
      lastUsed: '2023-06-20',
      trainingData: 1254,
      status: 'active',
      specialization: ['pneumonia', 'tuberculosis', 'lung cancer']
    },
    {
      id: 'model-2',
      name: 'Brain MRI Segmentation',
      type: 'Segmentation',
      accuracy: 0.89,
      lastTrained: '2023-05-25',
      lastUsed: '2023-06-18',
      trainingData: 842,
      status: 'active',
      specialization: ['tumors', 'hemorrhage', 'infarction']
    },
    {
      id: 'model-3',
      name: 'Bone Fracture Detection',
      type: 'Detection',
      accuracy: 0.92,
      lastTrained: '2023-04-15',
      lastUsed: '2023-06-15',
      trainingData: 976,
      status: 'active',
      specialization: ['fractures', 'dislocations']
    },
    {
      id: 'model-4',
      name: 'COVID-19 Detection',
      type: 'Classification',
      accuracy: 0.91,
      lastTrained: '2023-03-30',
      lastUsed: '2023-06-05',
      trainingData: 1532,
      status: 'inactive',
      specialization: ['covid-19', 'pneumonia']
    }
  ];
  
  // Mock data for training jobs
  const trainingJobs = [
    {
      id: 'job-1',
      modelName: 'Chest X-Ray Analysis Model',
      status: 'completed',
      startDate: '2023-06-10',
      endDate: '2023-06-11',
      accuracy: 0.94,
      improvement: '+0.02',
      dataSize: 1254
    },
    {
      id: 'job-2',
      modelName: 'Brain MRI Segmentation',
      status: 'completed',
      startDate: '2023-05-25',
      endDate: '2023-05-26',
      accuracy: 0.89,
      improvement: '+0.03',
      dataSize: 842
    },
    {
      id: 'job-3',
      modelName: 'Custom Heart CT Analysis',
      status: 'failed',
      startDate: '2023-05-15',
      endDate: '2023-05-15',
      accuracy: null,
      improvement: null,
      dataSize: 324,
      error: 'Insufficient data for model convergence'
    },
    {
      id: 'job-4',
      modelName: 'Bone Fracture Detection',
      status: 'completed',
      startDate: '2023-04-15',
      endDate: '2023-04-16',
      accuracy: 0.92,
      improvement: '+0.04',
      dataSize: 976
    }
  ];
  
  // Simulate training progress
  const startTraining = () => {
    setTrainingInProgress(true);
    setTrainingProgress(0);
    
    const interval = setInterval(() => {
      setTrainingProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTrainingInProgress(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 2000);
  };
  
  // Function to get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-900 text-green-300';
      case 'inactive': return 'bg-red-900 text-red-300';
      case 'training': return 'bg-blue-900 text-blue-300';
      case 'completed': return 'bg-green-900 text-green-300';
      case 'failed': return 'bg-red-900 text-red-300';
      case 'pending': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };
  
  // Format accuracy as percentage
  const formatAccuracy = (accuracy) => {
    return accuracy ? `${(accuracy * 100).toFixed(1)}%` : 'N/A';
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-white">AI Model Training</h2>
          <p className="text-gray-400 text-sm">Customize and train AI models for your specific needs</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create New Model</span>
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center space-x-1">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Metrics</span>
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('models')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'models' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            My Models
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'jobs' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            Training Jobs
          </button>
          <button 
            onClick={() => setActiveTab('datasets')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'datasets' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            Datasets
          </button>
        </nav>
      </div>
      
      {/* Models Tab */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          {trainingInProgress && (
            <div className="bg-blue-900 bg-opacity-20 rounded-xl p-6 border border-blue-800">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-white">Model Training in Progress</h3>
                  <p className="text-blue-300 mt-1">
                    Custom Chest X-Ray Analysis Model - Estimated time remaining: ~{Math.ceil((100 - trainingProgress) / 10) * 2} minutes
                  </p>
                </div>
                <div className="w-full md:w-64">
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-4 bg-blue-600 rounded-full" 
                      style={{ width: `${trainingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm text-right mt-1">{trainingProgress}% complete</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Model Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Last Trained
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {models.map(model => (
                    <tr key={model.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{model.name}</div>
                            <div className="text-sm text-gray-400">
                              {model.specialization.join(', ')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{model.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{formatAccuracy(model.accuracy)}</div>
                        <div className="text-xs text-gray-400">{model.trainingData} samples</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{formatDate(model.lastTrained)}</div>
                        <div className="text-xs text-gray-400">Last used: {formatDate(model.lastUsed)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(model.status)}`}>
                          {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={startTraining}
                          disabled={trainingInProgress}
                          className="text-blue-400 hover:text-blue-300 mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Retrain
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 mr-3">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Accuracy by Model</h3>
              <div className="space-y-4">
                {models
                  .filter(model => model.status === 'active')
                  .sort((a, b) => b.accuracy - a.accuracy)
                  .map(model => (
                    <div key={model.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{model.name}</span>
                        <span className="text-sm text-gray-300">{formatAccuracy(model.accuracy)}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${model.accuracy * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Usage Statistics</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Analyses</p>
                  <p className="text-2xl text-white">1,245</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Average Processing Time</p>
                  <p className="text-2xl text-white">24.3s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Training Hours</p>
                  <p className="text-2xl text-white">68h</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button 
                  onClick={startTraining}
                  disabled={trainingInProgress}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors disabled:opacity-70 disabled:bg-blue-700 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Start New Training
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Import Pre-trained Model
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Create AI Ensemble
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Training Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Job ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Model Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Training Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Performance
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {trainingJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{job.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{job.modelName}</div>
                        <div className="text-xs text-gray-400">{job.dataSize} samples</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{formatDate(job.startDate)}</div>
                        <div className="text-xs text-gray-400">
                          {job.endDate ? `to ${formatDate(job.endDate)}` : 'In progress'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {job.accuracy ? (
                          <div>
                            <div className="text-sm text-gray-300">{formatAccuracy(job.accuracy)}</div>
                            <div className={`text-xs ${
                              job.improvement.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {job.improvement}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-red-400">
                            {job.error || 'N/A'}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-400 hover:text-blue-300">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Datasets Tab */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Data Collections</h3>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Dataset</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-blue-900 rounded-full text-blue-300">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-blue-300 bg-blue-900 bg-opacity-50 py-1 px-2 rounded-full">
                    1,254 samples
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Chest X-Ray Collection</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Annotated chest X-rays for pneumonia, tuberculosis and lung cancer detection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Last updated: Jun 10, 2023</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Browse
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-purple-900 rounded-full text-purple-300">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-purple-300 bg-purple-900 bg-opacity-50 py-1 px-2 rounded-full">
                    842 samples
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Brain MRI Collection</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Segmented brain MRIs for tumor, hemorrhage and infarction detection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Last updated: May 25, 2023</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Browse
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-green-900 rounded-full text-green-300">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-green-300 bg-green-900 bg-opacity-50 py-1 px-2 rounded-full">
                    976 samples
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Bone X-Ray Collection</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Annotated bone X-rays for fracture and dislocation detection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Last updated: Apr 15, 2023</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Browse
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-red-900 rounded-full text-red-300">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-red-300 bg-red-900 bg-opacity-50 py-1 px-2 rounded-full">
                    1,532 samples
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">COVID-19 Collection</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Chest X-rays and CT scans for COVID-19 and pneumonia detection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Last updated: Mar 30, 2023</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Browse
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-yellow-900 rounded-full text-yellow-300">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-yellow-300 bg-yellow-900 bg-opacity-50 py-1 px-2 rounded-full">
                    324 samples
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Heart CT Collection</h4>
                <p className="text-gray-400 text-sm mb-4">
                  CT scans for heart conditions and abnormalities detection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Last updated: Feb 15, 2023</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Browse
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-900 bg-opacity-30 rounded-lg p-5 border-2 border-dashed border-blue-500 hover:bg-blue-900 hover:bg-opacity-40 transition-colors flex flex-col items-center justify-center text-center cursor-pointer">
                <div className="p-3 rounded-full bg-blue-900 bg-opacity-50 text-blue-300 mb-4">
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-white mb-1">Create New Dataset</h4>
                <p className="text-blue-300 text-sm">
                  Upload and annotate a new collection of medical images
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-6">Data Upload & Preparation</h3>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 md:w-1/2">
                <h4 className="text-md font-medium text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload New Images
                </h4>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg className="w-10 h-10 text-gray-400 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="pt-1 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        DICOM, JPEG, PNG (max. 50MB per file)
                      </p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*,.dcm" />
                  </label>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-5 border border-gray-700 md:w-1/2">
                <h4 className="text-md font-medium text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Data Labeling & Annotation
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Use our annotation tools to mark areas of interest in your medical images for more accurate AI training.
                </p>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors">
                  Open Annotation Tool
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Create Model Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => setShowUploadModal(false)}
            ></div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Create New AI Model</h3>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Model Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Lung Nodule Detection"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Model Type
                    </label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select model type</option>
                      <option value="classification">Classification</option>
                      <option value="detection">Detection</option>
                      <option value="segmentation">Segmentation</option>
                      <option value="regression">Regression</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Base Architecture
                    </label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select base architecture</option>
                      <option value="resnet50">ResNet-50</option>
                      <option value="densenet121">DenseNet-121</option>
                      <option value="efficientnet">EfficientNet</option>
                      <option value="unet">U-Net</option>
                      <option value="vit">Vision Transformer</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Training Dataset
                    </label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select dataset</option>
                      <option value="chest-xray">Chest X-Ray Collection (1,254 samples)</option>
                      <option value="brain-mri">Brain MRI Collection (842 samples)</option>
                      <option value="bone-xray">Bone X-Ray Collection (976 samples)</option>
                      <option value="covid-19">COVID-19 Collection (1,532 samples)</option>
                      <option value="heart-ct">Heart CT Collection (324 samples)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Advanced Options
                    </label>
                    <div className="bg-gray-750 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="transferLearning" 
                            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <label htmlFor="transferLearning" className="ml-2 text-sm text-gray-300">
                            Use transfer learning
                          </label>
                        </div>
                        
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="dataAugmentation" 
                            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <label htmlFor="dataAugmentation" className="ml-2 text-sm text-gray-300">
                            Enable data augmentation
                          </label>
                        </div>
                        
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="ensembleLearning" 
                            className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <label htmlFor="ensembleLearning" className="ml-2 text-sm text-gray-300">
                            Use ensemble learning
                          </label>
                        </div>
                        
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                    startTraining();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                >
                  Create & Start Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAITraining;