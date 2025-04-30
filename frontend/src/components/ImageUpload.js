import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ImageUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageType, setImageType] = useState('xray');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadStep, setUploadStep] = useState(1); // 1: Upload, 2: Analysis, 3: Results
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (selectedFile) => {
    setError('');
    
    // Check if it's an image file
    if (!selectedFile.type.match('image.*') && !selectedFile.name.endsWith('.dcm')) {
      setError('Please upload an image file (JPEG, PNG) or DICOM file');
      return;
    }
    
    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview for image files
    if (selectedFile.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For DICOM files, use a placeholder
      setPreview('/images/scans/dicom-placeholder.jpg');
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError('');
    setUploadStep(2); // Move to analysis step
    
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('imageType', imageType);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      // Upload the file
      const response = await axios.post(`${API}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Process response
      setAnalysisResult(response.data);
      setUploadStep(3); // Move to results step
      
      // Call the callback with the analysis result
      if (onUploadComplete) {
        onUploadComplete(response.data);
      }
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.detail || 'Error uploading image. Please try again.');
      setUploadStep(1); // Return to upload step on error
    } finally {
      setUploading(false);
    }
  };
  
  // For demo purposes - simulates an upload without an actual API call
  const handleDemoUpload = () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError('');
    setUploadStep(2); // Move to analysis step
    
    // Simulate network delay
    setTimeout(() => {
      // Mock more detailed findings with highlighted regions and severity
      const mockFindings = imageType === 'xray' ? [
        {
          id: 'finding-1',
          name: 'Pneumonia',
          location: 'Right Lower Lobe',
          severity: 'Moderate',
          confidence: 0.94,
          recommendation: 'Antibiotic therapy recommended. Follow-up X-ray in 2 weeks.',
          coordinates: { x: 60, y: 70, radius: 30 }, // For highlighting on image
          lifestyle_recommendation: 'Rest and adequate hydration. Avoid smoking and pollutants.',
          next_steps: 'Schedule follow-up with pulmonologist within 2 weeks.'
        },
        {
          id: 'finding-2',
          name: 'Pleural Effusion',
          location: 'Right Side',
          severity: 'Mild',
          confidence: 0.78,
          recommendation: 'Monitor closely. Consider thoracentesis if symptoms worsen.',
          coordinates: { x: 70, y: 80, radius: 25 },
          lifestyle_recommendation: 'Maintain upright position when possible to improve breathing.',
          next_steps: 'If shortness of breath increases, seek immediate medical attention.'
        },
        {
          id: 'finding-3',
          name: 'Atelectasis',
          location: 'Left Lower Lobe',
          severity: 'Mild',
          confidence: 0.65,
          recommendation: 'Breathing exercises. Incentive spirometry.',
          coordinates: { x: 40, y: 75, radius: 20 },
          lifestyle_recommendation: 'Regular deep breathing exercises every hour while awake.',
          next_steps: 'Follow up with primary care physician in 2-3 weeks.'
        }
      ] : [
        {
          id: 'finding-1',
          name: 'Disc Herniation',
          location: 'L4-L5',
          severity: 'Moderate',
          confidence: 0.89,
          recommendation: 'Physical therapy. NSAIDs. Surgical consultation if neurological symptoms develop.',
          coordinates: { x: 50, y: 60, radius: 15 },
          lifestyle_recommendation: 'Avoid heavy lifting and maintain proper posture. Consider ergonomic improvements to work environment.',
          next_steps: 'Begin physical therapy within 1 week. Schedule neurosurgery consultation if symptoms worsen.'
        },
        {
          id: 'finding-2',
          name: 'Spinal Stenosis',
          location: 'L3-L4',
          severity: 'Mild',
          confidence: 0.76,
          recommendation: 'Conservative management. Physical therapy. Reassess in 1 month.',
          coordinates: { x: 50, y: 45, radius: 15 },
          lifestyle_recommendation: 'Maintain neutral spine positions. Avoid activities that extend the back excessively.',
          next_steps: 'Begin core strengthening program. Follow up with spine specialist in 4-6 weeks.'
        },
        {
          id: 'finding-3',
          name: 'Facet Joint Arthropathy',
          location: 'L5-S1',
          severity: 'Mild',
          confidence: 0.68,
          recommendation: 'Anti-inflammatory medication. Consider facet joint injections if pain persists.',
          coordinates: { x: 50, y: 75, radius: 10 },
          lifestyle_recommendation: 'Apply heat therapy for 15-20 minutes twice daily. Avoid prolonged sitting.',
          next_steps: 'If pain persists beyond 3 weeks, consider referral for interventional pain management.'
        }
      ];
      
      // Mock response with additional data
      const mockResponse = {
        id: 'mock-analysis-' + Date.now(),
        user_id: 'current-user',
        image_type: imageType,
        findings: mockFindings,
        confidence_scores: mockFindings.reduce((obj, finding) => {
          obj[finding.name] = finding.confidence;
          return obj;
        }, {}),
        overall_impression: imageType === 'xray' 
          ? 'Consistent with community-acquired pneumonia and small pleural effusion. No evidence of tuberculosis or malignancy.'
          : 'Degenerative changes in the lumbar spine with disc herniation and spinal stenosis. No evidence of fracture or malignancy.',
        image_url: preview,
        analyzed_image_url: preview, // In a real system, this would be the image with markings
        timestamp: new Date().toISOString()
      };
      
      // Set analysis result
      setAnalysisResult(mockResponse);
      setUploadStep(3); // Move to results step
      
      if (onUploadComplete) {
        onUploadComplete(mockResponse);
      }
      
      setUploading(false);
    }, 2000);
  };

  // Progress steps indicator
  const renderProgressSteps = () => (
    <div className="flex items-center justify-center mb-8">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
        uploadStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
      }`}>
        1
      </div>
      <div className={`h-1 w-16 ${uploadStep >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
        uploadStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
      }`}>
        2
      </div>
      <div className={`h-1 w-16 ${uploadStep >= 3 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
        uploadStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
      }`}>
        3
      </div>
    </div>
  );

  // Step 1: File Upload
  const renderUploadStep = () => (
    <>
      {/* Image Type Selection */}
      <div className="mb-6">
        <label className="block text-blue-300 mb-2">Image Type</label>
        <div className="flex flex-wrap gap-3">
          <button 
            type="button"
            onClick={() => setImageType('xray')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              imageType === 'xray' 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-800 text-blue-300 hover:bg-gray-700'
            }`}
          >
            X-Ray
          </button>
          <button 
            type="button"
            onClick={() => setImageType('mri')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              imageType === 'mri' 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-800 text-blue-300 hover:bg-gray-700'
            }`}
          >
            MRI
          </button>
          <button 
            type="button"
            onClick={() => setImageType('ct')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              imageType === 'ct' 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-800 text-blue-300 hover:bg-gray-700'
            }`}
          >
            CT Scan
          </button>
        </div>
      </div>
      
      {/* File Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
          dragActive 
            ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
            : 'border-gray-700 hover:border-blue-500 hover:bg-blue-900 hover:bg-opacity-10'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!preview ? (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-blue-300 mb-2">Drag and drop your {imageType.toUpperCase()} image here</p>
            <p className="text-blue-400 text-sm mb-4">Supported formats: JPEG, PNG, DICOM</p>
            <button
              type="button"
              onClick={triggerFileInput}
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Browse Files
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*,.dcm"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-64 max-w-full rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-blue-300 mb-4">
              {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            <button
              type="button"
              onClick={handleDemoUpload} // Use demo function for now
              disabled={uploading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : 'Analyze Image'}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-blue-400">
        <p>* DICOM image data will be anonymized before processing.</p>
        <p>* For demonstration purposes, you can upload any image to see how the AI analyzer works.</p>
      </div>
    </>
  );

  // Step 2: Processing
  const renderProcessingStep = () => (
    <div className="text-center py-12">
      <div className="inline-block relative mb-8">
        {preview && (
          <img 
            src={preview} 
            alt="Being analyzed" 
            className="max-h-64 max-w-full rounded-lg border border-gray-700 opacity-50"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-900 bg-opacity-70 rounded-full p-4 animate-pulse-slow">
            <svg className="animate-spin h-12 w-12 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Analyzing {imageType.toUpperCase()} Image</h3>
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
          <div className="bg-blue-600 h-2 rounded-full progress-animate"></div>
        </div>
        <div className="flex justify-between text-sm text-blue-400">
          <span>Loading DICOM data</span>
          <span>Applying AI model</span>
          <span>Generating report</span>
        </div>
      </div>
      <p className="text-blue-300 mt-6">
        Our AI is analyzing your {imageType.toUpperCase()} for potential findings...
      </p>
    </div>
  );

  // Step 3: Results
  const renderResultsStep = () => {
    if (!analysisResult) return null;
    
    const { findings, overall_impression, image_url } = analysisResult;
    
    const getSeverityColor = (severity) => {
      switch(severity.toLowerCase()) {
        case 'severe': return 'bg-red-500';
        case 'moderate': return 'bg-yellow-500';
        case 'mild': return 'bg-green-500';
        default: return 'bg-blue-500';
      }
    };
    
    const getConfidenceLabel = (confidence) => {
      if (confidence >= 0.9) return 'Very High';
      if (confidence >= 0.75) return 'High';
      if (confidence >= 0.6) return 'Moderate';
      if (confidence >= 0.4) return 'Low';
      return 'Very Low';
    };
    
    return (
      <div className="py-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Overall Impression</h3>
          <p className="text-blue-300">{overall_impression}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Image with annotations */}
          <div>
            <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Annotated Image</h3>
              <div className="relative">
                <img 
                  src={image_url} 
                  alt="Analyzed" 
                  className="w-full rounded-lg border border-gray-700"
                />
                {/* SVG overlays for findings */}
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {findings.map((finding) => (
                    <g key={finding.id}>
                      {/* Circle highlighter */}
                      <circle 
                        cx={finding.coordinates.x} 
                        cy={finding.coordinates.y} 
                        r={finding.coordinates.radius} 
                        fill="none" 
                        stroke={finding.severity === 'Moderate' ? '#f59e0b' : finding.severity === 'Severe' ? '#ef4444' : '#10b981'} 
                        strokeWidth="1.5" 
                        strokeDasharray="3,2" 
                        className="animate-pulse-slow"
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
                  ))}
                </svg>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button className="px-3 py-1 bg-gray-700 text-blue-300 rounded hover:bg-gray-600 text-sm">
                  Toggle Annotations
                </button>
                <button className="px-3 py-1 bg-gray-700 text-blue-300 rounded hover:bg-gray-600 text-sm">
                  Toggle Heatmap
                </button>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Image Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-blue-400">Type:</div>
                <div className="text-white">{imageType.toUpperCase()}</div>
                
                <div className="text-blue-400">Date Analyzed:</div>
                <div className="text-white">{new Date().toLocaleDateString()}</div>
                
                <div className="text-blue-400">Analysis ID:</div>
                <div className="text-white">{analysisResult.id.substring(0, 10)}...</div>
              </div>
            </div>
          </div>
          
          {/* Right column - Findings and recommendations */}
          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Findings ({findings.length})</h3>
              
              <div className="space-y-4">
                {findings.map((finding, index) => (
                  <div key={finding.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-600 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{index + 1}. {finding.name}</h4>
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
                      <span className="text-blue-400 block mb-1">Recommendation:</span>
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
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => {
                  setUploadStep(1);
                  setFile(null);
                  setPreview(null);
                  setAnalysisResult(null);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                New Analysis
              </button>
              
              <div className="space-x-3">
                <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
                  Download Report
                </button>
                <button className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors duration-200">
                  Share with Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Upload Medical Image</h2>
      
      {renderProgressSteps()}
      
      {error && (
        <div className="mb-6 p-3 bg-red-900 bg-opacity-20 border border-red-700 rounded-md text-red-300 text-sm">
          {error}
        </div>
      )}
      
      {uploadStep === 1 && renderUploadStep()}
      {uploadStep === 2 && renderProcessingStep()}
      {uploadStep === 3 && renderResultsStep()}
    </div>
  );
};

export default ImageUpload;