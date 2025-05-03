import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const DashboardAnalyses = ({ user }) => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const location = useLocation();
  
  // Get analysis ID from URL params if available
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const analysisId = searchParams.get('id');
    
    // Fetch analyses (mock data for now)
    setTimeout(() => {
      const mockAnalyses = [
        {
          id: 'scan-1',
          date: '2023-06-15',
          type: 'X-Ray',
          region: 'Chest',
          status: 'Analyzed',
          findings: [
            { 
              name: 'Pneumonia', 
              location: 'Right Lower Lobe', 
              severity: 'Moderate',
              confidence: 0.94,
              recommendation: 'Antibiotic therapy recommended. Follow-up X-ray in 2 weeks.',
              coordinates: { x: 60, y: 70, radius: 30 },
              lifestyle_recommendation: 'Rest and adequate hydration. Avoid smoking and pollutants.',
              next_steps: 'Schedule follow-up with pulmonologist within 2 weeks.'
            },
            { 
              name: 'Pleural Effusion', 
              location: 'Right Side', 
              severity: 'Mild',
              confidence: 0.78,
              recommendation: 'Monitor closely. Consider thoracentesis if symptoms worsen.',
              coordinates: { x: 70, y: 80, radius: 25 },
              lifestyle_recommendation: 'Maintain upright position when possible to improve breathing.',
              next_steps: 'If shortness of breath increases, seek immediate medical attention.'
            }
          ],
          image_url: '/images/scans/chest-xray-1.jpg',
          doctor: 'Dr. Sarah Johnson',
          overall_impression: 'Consistent with community-acquired pneumonia and small pleural effusion. No evidence of tuberculosis or malignancy.'
        },
        {
          id: 'scan-2',
          date: '2023-05-28',
          type: 'MRI',
          region: 'Lumbar Spine',
          status: 'Analyzed',
          findings: [
            { 
              name: 'Disc Herniation', 
              location: 'L4-L5', 
              severity: 'Moderate',
              confidence: 0.89,
              recommendation: 'Physical therapy. NSAIDs. Surgical consultation if neurological symptoms develop.',
              coordinates: { x: 50, y: 60, radius: 15 },
              lifestyle_recommendation: 'Avoid heavy lifting and maintain proper posture.',
              next_steps: 'Begin physical therapy within 1 week.'
            },
            { 
              name: 'Spinal Stenosis', 
              location: 'L3-L4', 
              severity: 'Mild',
              confidence: 0.76,
              recommendation: 'Conservative management. Physical therapy. Reassess in 1 month.',
              coordinates: { x: 50, y: 45, radius: 15 },
              lifestyle_recommendation: 'Maintain neutral spine positions.',
              next_steps: 'Follow up with spine specialist in 4-6 weeks.'
            },
            { 
              name: 'Facet Joint Arthropathy', 
              location: 'L5-S1', 
              severity: 'Mild',
              confidence: 0.68,
              recommendation: 'Anti-inflammatory medication. Consider facet joint injections if pain persists.',
              coordinates: { x: 50, y: 75, radius: 10 },
              lifestyle_recommendation: 'Apply heat therapy for 15-20 minutes twice daily.',
              next_steps: 'If pain persists beyond 3 weeks, consider referral for pain management.'
            }
          ],
          image_url: '/images/scans/mri-spine-1.jpg',
          doctor: 'Dr. Michael Chen',
          overall_impression: 'Degenerative changes in the lumbar spine with disc herniation and spinal stenosis. No evidence of fracture or malignancy.'
        },
        {
          id: 'scan-3',
          date: '2023-04-10',
          type: 'CT Scan',
          region: 'Head',
          status: 'Analyzed',
          findings: [
            { 
              name: 'Sinusitis', 
              location: 'Maxillary Sinuses', 
              severity: 'Moderate',
              confidence: 0.91,
              recommendation: 'Nasal steroids and antibiotic therapy if bacterial infection suspected.',
              coordinates: { x: 50, y: 40, radius: 20 },
              lifestyle_recommendation: 'Use humidifier and saline nasal rinses.',
              next_steps: 'Follow up with ENT if symptoms persist beyond 2 weeks of treatment.'
            }
          ],
          image_url: '/images/scans/head-ct-1.jpg',
          doctor: 'Dr. Emily Rodriguez',
          overall_impression: 'Bilateral maxillary sinusitis. No evidence of intracranial pathology.'
        }
      ];
      
      setAnalyses(mockAnalyses);
      
      // If there's an analysis ID in the URL, select that analysis
      if (analysisId) {
        const selected = mockAnalyses.find(a => a.id === analysisId);
        if (selected) {
          setSelectedAnalysis(selected);
        }
      } else if (mockAnalyses.length > 0) {
        // Otherwise select the first analysis
        setSelectedAnalysis(mockAnalyses[0]);
      }
      
      setLoading(false);
    }, 1000);
  }, [location.search]);
  
  // Function to determine severity badge color
  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'severe': return 'bg-red-500';
      case 'moderate': return 'bg-yellow-500';
      case 'mild': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };
  
  // Function to get confidence label
  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.75) return 'High';
    if (confidence >= 0.6) return 'Moderate';
    if (confidence >= 0.4) return 'Low';
    return 'Very Low';
  };
  
  // Filter analyses by type
  const filteredAnalyses = filter === 'all' 
    ? analyses 
    : analyses.filter(analysis => analysis.type.toLowerCase() === filter.toLowerCase());
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-white">Scan Analyses</h2>
          <p className="text-gray-400 text-sm">View and analyze your medical scan results</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('x-ray')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'x-ray' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            X-Rays
          </button>
          <button 
            onClick={() => setFilter('mri')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'mri' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            MRIs
          </button>
          <button 
            onClick={() => setFilter('ct scan')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'ct scan' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            CT Scans
          </button>
        </div>
      </div>
      
      {filteredAnalyses.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-750 rounded-xl p-12 border border-gray-700">
          <svg className="h-16 w-16 text-gray-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-medium text-white mb-2">No analyses found</h3>
          <p className="text-gray-400 text-center mb-6">You don't have any {filter !== 'all' ? filter + ' ' : ''}scan analyses yet.</p>
          <Link to="/dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors">
            Upload a Scan
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Your Analyses</h3>
              <div className="space-y-3">
                {filteredAnalyses.map((analysis) => (
                  <button
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selectedAnalysis?.id === analysis.id 
                        ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    } transition-colors`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white text-sm">{analysis.type} - {analysis.region}</h4>
                        <p className="text-gray-400 text-xs mt-1">{analysis.date}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-300">
                        {analysis.findings.length} {analysis.findings.length === 1 ? 'finding' : 'findings'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Selected Analysis Details */}
          {selectedAnalysis && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">{selectedAnalysis.type} - {selectedAnalysis.region}</h3>
                    <p className="text-gray-400 text-sm mt-1">Date: {selectedAnalysis.date} | Reviewed by: {selectedAnalysis.doctor}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">Overall Impression</h4>
                  <p className="text-gray-300 text-sm">{selectedAnalysis.overall_impression}</p>
                </div>
                
                <div className="relative">
                  <img 
                    src={selectedAnalysis.image_url} 
                    alt={`${selectedAnalysis.type} of ${selectedAnalysis.region}`} 
                    className="w-full h-auto rounded-lg" 
                  />
                  
                  {/* SVG overlays for findings */}
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {selectedAnalysis.findings.map((finding) => {
                      if (!showHeatmap) {
                        return (
                          <g key={finding.name}>
                            {/* Circle highlighter */}
                            <circle  
                              cx={finding.coordinates.x}  
                              cy={finding.coordinates.y}  
                              r={finding.coordinates.radius}  
                              fill="none"  
                              stroke={finding.severity === 'Moderate' ? '#f59e0b' : finding.severity === 'Severe' ? '#ef4444' : '#10b981'}  
                              strokeWidth="1.5"  
                              strokeDasharray="3,2"  
                              className="animate-pulse" 
                            /> 
                            
                            {/* Annotation label */}
                            <text  
                              x={finding.coordinates.x}  
                              y={finding.coordinates.y - finding.coordinates.radius - 2}  
                              fill="#ffffff"  
                              fontSize="3"  
                              textAnchor="middle" 
                              className="font-bold" 
                            > 
                              {finding.name} 
                            </text> 
                          </g>
                        );
                      } else {
                        // Heat map visualization
                        return (
                          <g key={finding.name}>
                            <circle  
                              cx={finding.coordinates.x}  
                              cy={finding.coordinates.y}  
                              r={finding.coordinates.radius * 1.2}  
                              fill="url(#heatGradient)"  
                              opacity="0.7"
                            />
                          </g>
                        );
                      }
                    })}
                    
                    {/* Heatmap gradient definition */}
                    <defs>
                      <radialGradient id="heatGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button 
                      onClick={() => setShowHeatmap(!showHeatmap)} 
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        showHeatmap ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 bg-opacity-80'
                      }`}
                    >
                      {showHeatmap ? 'Show Markers' : 'Show Heatmap'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Findings & Recommendations</h3>
                
                <div className="space-y-4">
                  {selectedAnalysis.findings.map((finding, idx) => (
                    <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{idx + 1}. {finding.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getSeverityColor(finding.severity)}`}>
                          {finding.severity}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                        <div>
                          <span className="text-blue-400">Location: </span>
                          <span className="text-blue-200">{finding.location}</span>
                        </div>
                        
                        <div>
                          <span className="text-blue-400">Confidence: </span>
                          <span className="text-blue-200">{(finding.confidence * 100).toFixed(1)}% ({getConfidenceLabel(finding.confidence)})</span>
                        </div>
                      </div>
                      
                      <div className="text-sm mb-2">
                        <span className="text-blue-400 block mb-1">Medical Recommendation:</span>
                        <p className="text-blue-200">{finding.recommendation}</p>
                      </div>
                      
                      <div className="mt-3 border-t border-gray-700 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-400 block mb-1">Lifestyle Suggestions:</span>
                          <p className="text-blue-200">{finding.lifestyle_recommendation}</p>
                        </div>
                        
                        <div>
                          <span className="text-blue-400 block mb-1">Next Steps:</span>
                          <p className="text-blue-200">{finding.next_steps}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAnalyses;