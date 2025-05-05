import React, { useState, useEffect } from 'react';

const DashboardAITraining = ({ user }) => {
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
  
  // State for models
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [trainingJobs, setTrainingJobs] = useState([]);
  const [showNewModelModal, setShowNewModelModal] = useState(false);
  
  // State for new model form
  const [newModelData, setNewModelData] = useState({
    name: '',
    specialization: '',
    datasetSize: '',
    baseModel: 'ZemedicAI Core v2.1',
    description: ''
  });
  
  // State for training progress simulation
  const [simulatedTraining, setSimulatedTraining] = useState(null);
  
  // Fetch models data
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch this data from the API
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock models data
        const mockModels = [
          {
            id: 'model-001',
            name: 'Pulmonary Analysis Model',
            specialization: 'Chest X-rays',
            version: '1.3',
            status: 'active',
            accuracy: 0.94,
            created_at: '2023-03-15T10:30:00Z',
            last_updated: '2023-05-20T14:45:00Z',
            training_samples: 15600,
            owner: user.first_name,
            metrics: {
              sensitivity: 0.92,
              specificity: 0.95,
              f1_score: 0.93,
              auc: 0.96
            },
            capabilities: [
              'Pneumonia detection',
              'Tuberculosis screening',
              'Nodule identification',
              'Pleural effusion analysis'
            ]
          },
          {
            id: 'model-002',
            name: 'Neurological Assessment',
            specialization: 'Brain MRI',
            version: '2.1',
            status: 'active',
            accuracy: 0.91,
            created_at: '2023-01-10T09:15:00Z',
            last_updated: '2023-05-18T11:20:00Z',
            training_samples: 12800,
            owner: user.first_name,
            metrics: {
              sensitivity: 0.89,
              specificity: 0.93,
              f1_score: 0.91,
              auc: 0.94
            },
            capabilities: [
              'Tumor detection',
              'Stroke assessment',
              'Hemorrhage identification',
              'White matter lesion analysis'
            ]
          },
          {
            id: 'model-003',
            name: 'Musculoskeletal Analysis',
            specialization: 'Joint X-rays',
            version: '1.0',
            status: 'training',
            accuracy: 0.87,
            created_at: '2023-05-01T16:45:00Z',
            last_updated: '2023-05-01T16:45:00Z',
            training_samples: 9200,
            owner: user.first_name,
            metrics: {
              sensitivity: 0.85,
              specificity: 0.88,
              f1_score: 0.86,
              auc: 0.90
            },
            capabilities: [
              'Fracture detection',
              'Arthritis assessment',
              'Joint space measurement',
              'Bone density analysis'
            ]
          }
        ];
        
        // Mock training jobs
        const mockTrainingJobs = [
          {
            id: 'job-001',
            model_id: 'model-003',
            status: 'in_progress',
            progress: 68,
            started_at: '2023-05-22T09:30:00Z',
            estimated_completion: '2023-05-23T15:00:00Z',
            epochs_completed: 17,
            total_epochs: 25,
            loss: 0.0831,
            accuracy: 0.872
          },
          {
            id: 'job-002',
            model_id: 'model-001',
            status: 'completed',
            progress: 100,
            started_at: '2023-05-19T14:15:00Z',
            completed_at: '2023-05-20T06:30:00Z',
            epochs_completed: 30,
            total_epochs: 30,
            loss: 0.0518,
            accuracy: 0.943
          },
          {
            id: 'job-003',
            model_id: 'model-002',
            status: 'completed',
            progress: 100,
            started_at: '2023-05-17T11:45:00Z',
            completed_at: '2023-05-18T04:20:00Z',
            epochs_completed: 35,
            total_epochs: 35,
            loss: 0.0624,
            accuracy: 0.912
          }
        ];
        
        setModels(mockModels);
        setTrainingJobs(mockTrainingJobs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to load AI models');
        setLoading(false);
      }
    };
    
    fetchModels();
  }, [user]);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining
  const calculateTimeRemaining = (estimatedCompletion) => {
    const now = new Date();
    const completionDate = new Date(estimatedCompletion);
    const diffMs = completionDate - now;
    
    if (diffMs <= 0) return 'Completing soon...';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m remaining`;
    } else {
      return `${diffMins}m remaining`;
    }
  };
  
  // Handle new model form input change
  const handleNewModelInputChange = (e) => {
    const { name, value } = e.target;
    setNewModelData({
      ...newModelData,
      [name]: value
    });
  };
  
  // Create new model
  const handleCreateModel = () => {
    // Validate form
    if (!newModelData.name || !newModelData.specialization || !newModelData.baseModel) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real application, we would send the data to the API
    // For demo purposes, we'll just simulate adding a new model
    
    const newModel = {
      id: `model-${(models.length + 1).toString().padStart(3, '0')}`,
      name: newModelData.name,
      specialization: newModelData.specialization,
      version: '1.0',
      status: 'draft',
      accuracy: 0,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      training_samples: parseInt(newModelData.datasetSize) || 0,
      owner: user.first_name,
      metrics: {
        sensitivity: 0,
        specificity: 0,
        f1_score: 0,
        auc: 0
      },
      capabilities: [],
      description: newModelData.description
    };
    
    // Add new model to state
    setModels([...models, newModel]);
    
    // Reset form and close modal
    setNewModelData({
      name: '',
      specialization: '',
      datasetSize: '',
      baseModel: 'ZemedicAI Core v2.1',
      description: ''
    });
    setShowNewModelModal(false);
    
    // Select the new model
    setSelectedModel(newModel);
  };
  
  // Start training simulation
  const startTraining = (modelId) => {
    const model = models.find(m => m.id === modelId);
    if (!model) return;
    
    // Update model status
    const updatedModels = models.map(m => 
      m.id === modelId ? { ...m, status: 'training' } : m
    );
    setModels(updatedModels);
    
    // Create new training job
    const newJob = {
      id: `job-${(trainingJobs.length + 1).toString().padStart(3, '0')}`,
      model_id: modelId,
      status: 'in_progress',
      progress: 0,
      started_at: new Date().toISOString(),
      estimated_completion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      epochs_completed: 0,
      total_epochs: 30,
      loss: 0.5,
      accuracy: 0.5
    };
    
    setTrainingJobs([newJob, ...trainingJobs]);
    
    // Start simulation
    setSimulatedTraining({
      jobId: newJob.id,
      modelId: modelId,
      interval: setInterval(() => {
        setTrainingJobs(prevJobs => {
          const updatedJobs = prevJobs.map(job => {
            if (job.id === newJob.id) {
              const newProgress = Math.min(job.progress + 1, 100);
              const epochsCompleted = Math.floor((newProgress / 100) * job.total_epochs);
              const accuracy = 0.5 + (newProgress / 100) * 0.4; // Starts at 0.5, goes up to 0.9
              const loss = 0.5 - (newProgress / 100) * 0.45; // Starts at 0.5, goes down to 0.05
              
              return {
                ...job,
                progress: newProgress,
                epochs_completed: epochsCompleted,
                accuracy: accuracy,
                loss: loss,
                status: newProgress === 100 ? 'completed' : 'in_progress',
                completed_at: newProgress === 100 ? new Date().toISOString() : undefined
              };
            }
            return job;
          });
          
          // If training is complete, update model
          const job = updatedJobs.find(j => j.id === newJob.id);
          if (job && job.progress === 100) {
            clearInterval(simulatedTraining.interval);
            setSimulatedTraining(null);
            
            // Update model status and metrics
            setModels(prevModels => prevModels.map(m => 
              m.id === modelId ? {
                ...m,
                status: 'active',
                accuracy: job.accuracy,
                last_updated: job.completed_at,
                metrics: {
                  sensitivity: job.accuracy - 0.02,
                  specificity: job.accuracy + 0.01,
                  f1_score: job.accuracy - 0.01,
                  auc: job.accuracy + 0.02
                }
              } : m
            ));
          }
          
          return updatedJobs;
        });
      }, 500) // Update every 500ms for demo
    });
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
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load AI Models</h3>
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
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">AI Model Training</h1>
          <p className="text-gray-400">
            Create and train custom AI models for medical imaging analysis
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowNewModelModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Model
          </button>
        </div>
      </div>
      
      {selectedModel ? (
        <div>
          {/* Model details */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-white">Model Details</h2>
                <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedModel.status === 'active' ? 'bg-green-900 text-green-300' :
                  selectedModel.status === 'training' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {selectedModel.status.charAt(0).toUpperCase() + selectedModel.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => setSelectedModel(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{selectedModel.name}</h3>
                    <span className="ml-2 text-sm text-gray-400">v{selectedModel.version}</span>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-300">
                      {selectedModel.description || `This model is specialized in analyzing ${selectedModel.specialization} images, providing accurate diagnostics and identifying abnormalities with high precision.`}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-750 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Specialization</p>
                      <p className="text-white font-medium">{selectedModel.specialization}</p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Training Samples</p>
                      <p className="text-white font-medium">{selectedModel.training_samples.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Created</p>
                      <p className="text-white font-medium">{formatDate(selectedModel.created_at)}</p>
                    </div>
                    <div className="bg-gray-750 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Last Updated</p>
                      <p className="text-white font-medium">{formatDate(selectedModel.last_updated)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-white mb-3">Model Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.capabilities.map((capability, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-900 bg-opacity-40 text-blue-300 rounded-full text-sm"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {selectedModel.status !== 'training' && (
                      <button
                        onClick={() => startTraining(selectedModel.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors"
                      >
                        Start Training
                      </button>
                    )}
                    <button
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors"
                    >
                      Export Model
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors"
                    >
                      Edit Configuration
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Accuracy</span>
                        <span className="text-sm text-white">{(selectedModel.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${selectedModel.accuracy * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Sensitivity</span>
                        <span className="text-sm text-white">{(selectedModel.metrics.sensitivity * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${selectedModel.metrics.sensitivity * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Specificity</span>
                        <span className="text-sm text-white">{(selectedModel.metrics.specificity * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${selectedModel.metrics.specificity * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">F1 Score</span>
                        <span className="text-sm text-white">{(selectedModel.metrics.f1_score * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${selectedModel.metrics.f1_score * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">AUC-ROC</span>
                        <span className="text-sm text-white">{(selectedModel.metrics.auc * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-500 rounded-full"
                          style={{ width: `${selectedModel.metrics.auc * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedModel.status === 'active' && (
                    <div className="mt-6 p-4 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="text-white font-medium">Model Ready for Use</p>
                          <p className="text-sm text-green-300 mt-1">
                            This model is trained and ready to analyze medical images.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedModel.status === 'training' && (
                    <div className="mt-6 p-4 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-white font-medium">Training in Progress</p>
                          <p className="text-sm text-yellow-300 mt-1">
                            This model is currently being trained. Performance metrics will update once training is complete.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedModel.status === 'draft' && (
                    <div className="mt-6 p-4 bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-white font-medium">Model in Draft Stage</p>
                          <p className="text-sm text-blue-300 mt-1">
                            This model is in draft stage. Start training to analyze medical images.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Training Jobs */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-medium text-white">Training History</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Started
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Epochs
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Loss
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {trainingJobs
                    .filter(job => job.model_id === selectedModel.id)
                    .map((job) => (
                      <tr key={job.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{formatDate(job.started_at)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === 'completed' ? 'bg-green-900 text-green-300' :
                            job.status === 'in_progress' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {job.status === 'completed' ? 'Completed' :
                             job.status === 'in_progress' ? 'In Progress' :
                             'Failed'}
                          </span>
                          {job.status === 'in_progress' && (
                            <div className="text-xs text-gray-400 mt-1">
                              {calculateTimeRemaining(job.estimated_completion)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2 max-w-[150px]">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                            </div>
                            <span className="text-sm text-white">{job.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{job.epochs_completed} / {job.total_epochs}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{(job.accuracy * 100).toFixed(1)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{job.loss.toFixed(4)}</div>
                        </td>
                      </tr>
                    ))}
                  
                  {!trainingJobs.some(job => job.model_id === selectedModel.id) && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                        No training history for this model
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* AI Models Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {models.map((model) => (
              <div 
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="px-6 py-4 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white truncate">{model.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      model.status === 'active' ? 'bg-green-900 text-green-300' :
                      model.status === 'training' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Specialization</p>
                    <p className="text-white font-medium">{model.specialization}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Accuracy</span>
                      <span className="text-sm text-white">{(model.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${model.accuracy * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Training Samples</p>
                    <p className="text-white font-medium">{model.training_samples.toLocaleString()}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-white font-medium">{formatDate(model.last_updated)}</p>
                  </div>
                  
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedModel(model);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Create New Model Card */}
            <div 
              onClick={() => setShowNewModelModal(true)}
              className="bg-gray-800 rounded-lg border border-dashed border-gray-600 overflow-hidden hover:border-blue-500 cursor-pointer transition-colors p-6 flex flex-col items-center justify-center text-center h-[357px]"
            >
              <div className="p-4 bg-blue-900 bg-opacity-20 rounded-full mb-4">
                <svg className="h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Create New Model</h3>
              <p className="text-gray-400 mb-4">
                Start building a custom AI model tailored to your specific needs
              </p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
          
          {/* Training Jobs */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-medium text-white">Recent Training Jobs</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Started
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {trainingJobs.map((job) => {
                    const model = models.find(m => m.id === job.model_id);
                    return (
                      <tr key={job.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{model?.name || 'Unknown Model'}</div>
                          <div className="text-xs text-gray-400">{model?.specialization || ''}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{formatDate(job.started_at)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === 'completed' ? 'bg-green-900 text-green-300' :
                            job.status === 'in_progress' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {job.status === 'completed' ? 'Completed' :
                             job.status === 'in_progress' ? 'In Progress' :
                             'Failed'}
                          </span>
                          {job.status === 'in_progress' && (
                            <div className="text-xs text-gray-400 mt-1">
                              {calculateTimeRemaining(job.estimated_completion)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                            </div>
                            <span className="text-sm text-white">{job.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{(job.accuracy * 100).toFixed(1)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => setSelectedModel(model)}
                            className="text-blue-400 hover:text-blue-300 mr-3"
                          >
                            View Model
                          </button>
                          {job.status === 'in_progress' && (
                            <button
                              className="text-red-400 hover:text-red-300"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  
                  {trainingJobs.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                        No training jobs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* New Model Modal */}
      {showNewModelModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-xl w-full">
            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Create New AI Model</h3>
                <button
                  onClick={() => setShowNewModelModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Model Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newModelData.name}
                      onChange={handleNewModelInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Cardiac MRI Analyzer"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-400 mb-1">
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="specialization"
                      name="specialization"
                      value={newModelData.specialization}
                      onChange={handleNewModelInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Chest X-rays">Chest X-rays</option>
                      <option value="Brain MRI">Brain MRI</option>
                      <option value="Abdominal CT">Abdominal CT</option>
                      <option value="Joint X-rays">Joint X-rays</option>
                      <option value="Cardiac MRI">Cardiac MRI</option>
                      <option value="Mammography">Mammography</option>
                      <option value="Dental X-rays">Dental X-rays</option>
                      <option value="Ultrasound Images">Ultrasound Images</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="baseModel" className="block text-sm font-medium text-gray-400 mb-1">
                      Base Model <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="baseModel"
                      name="baseModel"
                      value={newModelData.baseModel}
                      onChange={handleNewModelInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="ZemedicAI Core v2.1">ZemedicAI Core v2.1</option>
                      <option value="ZemedicAI Radiology v1.5">ZemedicAI Radiology v1.5</option>
                      <option value="ZemedicAI Neurology v2.0">ZemedicAI Neurology v2.0</option>
                      <option value="ZemedicAI Cardiology v1.2">ZemedicAI Cardiology v1.2</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="datasetSize" className="block text-sm font-medium text-gray-400 mb-1">
                      Initial Dataset Size <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="datasetSize"
                      name="datasetSize"
                      value={newModelData.datasetSize}
                      onChange={handleNewModelInputChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 5000"
                      min="1000"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum recommended: 1,000 samples. For optimal performance: 10,000+ samples.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newModelData.description}
                      onChange={handleNewModelInputChange}
                      rows="3"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the purpose and capabilities of your model..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowNewModelModal(false)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateModel}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Create Model
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAITraining;
