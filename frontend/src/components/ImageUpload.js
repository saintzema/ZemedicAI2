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
  
  return (
    <div className="image-upload-container">
      {/* Image Type Selection */}
      <div className="mb-6">
        <label className="block text-blue-300 text-sm font-medium mb-2">
          Image Type
        </label>
        <div className="flex space-x-4">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-blue-300 mb-1">{file.name}</p>
            <p className="text-blue-400 text-xs mb-4">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {imageType.toUpperCase()}
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
      
      {error && (
        <div className="mt-4 p-3 bg-red-900 bg-opacity-20 border border-red-700 rounded-md text-red-300 text-sm">
          {error}
        </div>
      )}
      
      <div className="mt-4 text-xs text-blue-400">
        <p>* DICOM image data will be anonymized before processing.</p>
        <p>* For demonstration purposes, you can upload any image to see how the AI analyzer works.</p>
      </div>
    </div>
  );
};

export default ImageUpload;