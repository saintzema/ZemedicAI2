import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DashboardAnalyses = ({ user }) => {
  const [searchParams] = useSearchParams();
  const scanId = searchParams.get('id');
  
  const [activeTab, setActiveTab] = useState('analysis');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('detailed'); // 'detailed' or 'summary'
  
  // Mock analysis data
  const [analysisData, setAnalysisData] = useState({
    id: 'analysis-001',
    scan_id: scanId || 'scan-001',
    patient: {
      name: user.role === 'doctor' ? 'Alice Johnson' : `${user.first_name} ${user.last_name}`,
      age: 42,
      gender: 'Female',
      id: 'patient-001'
    },
    scan: {
      type: 'X-Ray',
      body_part: 'Chest',
      date: '2023-05-10T14:30:00Z',
      provider: 'General Hospital Radiology',
      technique: 'PA and lateral views',
      indications: 'Persistent cough, fatigue'
    },
    findings: [
      {
        id: 'finding-001',
        area: 'Upper Right Lung',
        description: 'Small (1.2cm) nodular opacity in the right upper lobe',
        confidence: 0.92,
        severity: 'Moderate',
        coordinates: {
          x: 35,
          y: 25,
          width: 8,
          height: 8
        },
        recommendations: [
          'Follow-up CT scan recommended in 3 months',
          'Monitor for changes in size or density'
        ]
      },
      {
        id: 'finding-002',
        area: 'Left Hilum',
        description: 'Mild hilar lymphadenopathy',
        confidence: 0.87,
        severity: 'Mild',
        coordinates: {
          x: 65,
          y: 45,
          width: 10,
          height: 10
        },
        recommendations: [
          'Clinical correlation with patient symptoms',
          'Consider PET scan if symptoms persist'
        ]
      }
    ],
    impressions: [
      'Possible early inflammatory process in the right upper lobe',
      'Hilar lymphadenopathy may be reactive or indicate infectious process',
      'No evidence of pleural effusion or pneumothorax',
      'Cardiac silhouette within normal limits',
      'Osseous structures intact without evidence of acute fracture'
    ],
    recommendations: [
      'Follow-up chest CT in 3 months',
      'Clinical correlation with patient symptoms',
      'Complete pulmonary function tests if symptoms persist'
    ],
    ai_model: {
      name: 'ZemedicAI Pulmonary v2.1',
      accuracy: 0.94,
      sensitivity: 0.91,
      specificity: 0.96
    },
    radiologist_report: {
      available: false,
      report_id: null,
      report_date: null,
      radiologist_name: null
    }
  });
  
  // Fetch analysis data
  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would fetch the data from the API
        // For demo purposes, we'll just simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If there's a scanId in the URL, we would use it to fetch the specific analysis
        if (scanId) {
          // Simulated API call
          // const response = await axios.get(`${API}/analyses/${scanId}`);
          // setAnalysisData(response.data);
          
          // Instead, we'll just update our mock data with the scan ID
          setAnalysisData(prevData => ({
            ...prevData,
            scan_id: scanId
          }));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analysis data:', err);
        setError('Failed to load analysis data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchAnalysisData();
  }, [scanId]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle zoom in
  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(prevZoom => prevZoom + 20);
    }
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    if (zoom > 40) {
      setZoom(prevZoom => prevZoom - 20);
    }
  };
  
  // Handle zoom reset
  const handleZoomReset = () => {
    setZoom(100);
  };
  
  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'mild':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) {
      return 'text-green-500';
    } else if (confidence >= 0.7) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  };
  
  // Render confidence badge
  const renderConfidenceBadge = (confidence) => {
    const percentage = (confidence * 100).toFixed(0);
    const color = getConfidenceColor(confidence);
    
    return (
      <span className={`${color} font-medium`}>
        {percentage}%
      </span>
    );
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-800 rounded mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg h-96"></div>
          <div className="bg-gray-800 rounded-lg h-96"></div>
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
        <h3 className="text-xl font-medium text-white mb-2">Failed to Load Analysis</h3>
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
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-white mb-4 lg:mb-0">
          {analysisData.scan.type} Analysis: {analysisData.scan.body_part}
        </h1>
        
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeTab === 'analysis'
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                activeTab === 'report'
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              Full Report
            </button>
          </div>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setView('detailed')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                view === 'detailed'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              Detailed
            </button>
            <button
              onClick={() => setView('summary')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                view === 'summary'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              Summary
            </button>
          </div>
          
          <div className="inline-flex items-center">
            <button 
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                showHeatmap ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
            </button>
          </div>
          
          <button
            className="px-4 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md transition-colors"
            onClick={() => window.print()}
          >
            <svg className="h-4 w-4 inline mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>
      
      {activeTab === 'analysis' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-white">Scan Image</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 hover:text-white"
                  aria-label="Zoom Out"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-gray-300 text-sm">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 hover:text-white"
                  aria-label="Zoom In"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  onClick={handleZoomReset}
                  className="p-1.5 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 hover:text-white"
                  aria-label="Reset Zoom"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="relative mx-auto w-full flex items-center justify-center overflow-hidden bg-black">
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }} className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516015222231-103d5dee8852"
                  alt="Chest X-Ray"
                  className="max-w-full max-h-[600px] object-contain"
                />
                
                {showHeatmap && (
                  <div className="absolute inset-0 pointer-events-none">
                    {analysisData.findings.map((finding) => (
                      <div
                        key={finding.id}
                        className="absolute rounded-full bg-red-500 bg-opacity-30 border-2 border-red-500 pulse-animation"
                        style={{
                          left: `${finding.coordinates.x}%`,
                          top: `${finding.coordinates.y}%`,
                          width: `${finding.coordinates.width}%`,
                          height: `${finding.coordinates.height}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-750 rounded p-3 text-sm">
                <p className="text-gray-400">Patient</p>
                <p className="text-white font-medium">{analysisData.patient.name}</p>
              </div>
              <div className="bg-gray-750 rounded p-3 text-sm">
                <p className="text-gray-400">Scan Date</p>
                <p className="text-white font-medium">{formatDate(analysisData.scan.date)}</p>
              </div>
              <div className="bg-gray-750 rounded p-3 text-sm">
                <p className="text-gray-400">Scan Type</p>
                <p className="text-white font-medium">{analysisData.scan.type} - {analysisData.scan.body_part}</p>
              </div>
              <div className="bg-gray-750 rounded p-3 text-sm">
                <p className="text-gray-400">AI Model</p>
                <p className="text-white font-medium">{analysisData.ai_model.name}</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Findings */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col">
            <div className="px-4 py-3 bg-gray-750 border-b border-gray-700">
              <h2 className="text-lg font-medium text-white">Findings</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {analysisData.findings.length === 0 ? (
                <div className="p-6 text-center">
                  <svg className="h-12 w-12 text-green-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-white">No Findings Detected</h3>
                  <p className="mt-1 text-gray-400">No abnormalities were detected in this scan.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {analysisData.findings.map((finding) => (
                    <div key={finding.id} className="p-4 hover:bg-gray-750">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-medium">{finding.area}</h3>
                          <p className="text-gray-300 mt-1">{finding.description}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)} bg-gray-700`}>
                            {finding.severity}
                          </span>
                          <div className="mt-1 text-xs">
                            Confidence: {renderConfidenceBadge(finding.confidence)}
                          </div>
                        </div>
                      </div>
                      
                      {view === 'detailed' && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-400">Recommendations:</h4>
                          <ul className="mt-1 text-sm text-gray-300 space-y-1 list-disc pl-5">
                            {finding.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 bg-gray-750 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-400">Total Findings:</span>
                  <span className="ml-1 text-white font-medium">{analysisData.findings.length}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Model Accuracy:</span>
                  <span className="ml-1 text-green-400 font-medium">{(analysisData.ai_model.accuracy * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Report Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Patient Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{analysisData.patient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white">{analysisData.patient.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-white">{analysisData.patient.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gender:</span>
                    <span className="text-white">{analysisData.patient.gender}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Scan Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{analysisData.scan.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Body Part:</span>
                    <span className="text-white">{analysisData.scan.body_part}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{formatDate(analysisData.scan.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provider:</span>
                    <span className="text-white">{analysisData.scan.provider}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Analysis Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Model:</span>
                    <span className="text-white">{analysisData.ai_model.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="text-green-400">{(analysisData.ai_model.accuracy * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sensitivity:</span>
                    <span className="text-blue-400">{(analysisData.ai_model.sensitivity * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Specificity:</span>
                    <span className="text-purple-400">{(analysisData.ai_model.specificity * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-white mb-3">Findings</h2>
            <div className="bg-gray-750 rounded-lg border border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="bg-gray-800">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Area
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Severity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {analysisData.findings.map((finding) => (
                    <tr key={finding.id} className="hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {finding.area}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {finding.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)} bg-gray-700`}>
                          {finding.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {renderConfidenceBadge(finding.confidence)}
                      </td>
                    </tr>
                  ))}
                  {analysisData.findings.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                        No findings detected
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-white mb-3">Impressions</h2>
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {analysisData.impressions.map((impression, index) => (
                    <li key={index}>{impression}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-white mb-3">Recommendations</h2>
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {analysisData.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg">
            <div className="flex items-start">
              <svg className="h-6 w-6 text-blue-400 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-white font-medium">AI Analysis Disclaimer</h3>
                <p className="mt-1 text-blue-300 text-sm">
                  This analysis was generated by ZemedicAI's artificial intelligence system. While our model has high accuracy, all findings should be reviewed by a qualified healthcare professional. This report is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAnalyses;
