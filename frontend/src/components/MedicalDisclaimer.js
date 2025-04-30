import { useState } from 'react';

const MedicalDisclaimer = ({ position = "bottom", className = "" }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className={`medical-disclaimer ${position} ${className}`}>
      <div className="bg-gray-900 bg-opacity-95 border border-purple-800 rounded-lg p-4 shadow-lg max-w-2xl mx-auto text-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-yellow-300 font-medium mb-1">Medical Disclaimer</p>
            <p className="text-blue-200">
              ZemedicAI is designed to assist healthcare professionals and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)} 
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-white transition duration-150"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
      
      <style jsx="true">{`
        .medical-disclaimer {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          width: calc(100% - 2rem);
          max-width: 42rem;
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .medical-disclaimer.bottom {
          bottom: 1.5rem;
        }
        
        .medical-disclaimer.top {
          top: 5rem;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        @media (max-width: 640px) {
          .medical-disclaimer {
            width: calc(100% - 1rem);
          }
        }
      `}</style>
    </div>
  );
};

export default MedicalDisclaimer;