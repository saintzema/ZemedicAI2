import React, { useState, useEffect } from 'react';

const APIKeyModal = ({ onSubmit, onSkip, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    // Load saved API key when component mounts
    const savedKey = localStorage.getItem('googleHealthApiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!apiKey.trim()) {
      // If the field is empty, clear the saved key
      localStorage.removeItem('googleHealthApiKey');
      onSubmit('');
      return;
    }
    
    // Validate the API key format (this is a simple validation, adjust as needed)
    if (apiKey.length < 20) {
      setError('API key appears to be invalid. Google Health API keys are typically longer.');
      return;
    }
    
    // Simulate saving the key
    setSaving(true);
    
    setTimeout(() => {
      try {
        // Store API key in localStorage
        localStorage.setItem('googleHealthApiKey', apiKey);
        
        // Notify parent component
        onSubmit(apiKey);
      } catch (err) {
        console.error('Error saving API key:', err);
        setError('Failed to save API key. Please try again.');
      } finally {
        setSaving(false);
      }
    }, 500); // Simulated delay
  };
  
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative max-w-md w-full mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Google Health API Key</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4">
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-4">
                  Enter your Google Health API key to enable advanced medical image analysis capabilities. Your API key will be stored securely in your browser.
                </p>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-900 bg-opacity-20 border border-red-700 rounded-md text-red-300 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="relative">
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-1">
                    API Key
                  </label>
                  <div className="flex">
                    <input
                      type={showKey ? "text" : "password"}
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your Google Health API key"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="px-3 bg-gray-700 border border-l-0 border-gray-600 rounded-r-md text-gray-400 hover:text-white"
                    >
                      {showKey ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="mt-2 text-gray-400 text-xs">
                  Don't have an API key? <a href="https://cloud.google.com/healthcare-api/docs" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Learn how to get one</a>.
                </p>
              </div>
              
              <div className="bg-blue-900 bg-opacity-30 border border-blue-800 rounded-md p-4 text-sm text-blue-300">
                <div className="flex">
                  <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Important Note</p>
                    <p className="mt-1">
                      Your API key will be stored locally in your browser and sent securely with each analysis request. Google may charge for API usage according to their pricing terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-750 border-t border-gray-700 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  // Clear the API key
                  setApiKey('');
                  localStorage.removeItem('googleHealthApiKey');
                  onSave('');
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Remove Key
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : "Save API Key"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default APIKeyModal;
