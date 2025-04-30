import { useState, useEffect } from 'react';

const AfricaMap = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Location data with health statistics
  const locations = {
    'nigeria': {
      name: 'Nigeria',
      population: '206 million',
      doctorRatio: '1:2,753',
      radiologistRatio: '1:566,000',
      healthcareAccess: '43%',
      challenge: 'Limited access to diagnostic imaging in rural areas'
    },
    'kenya': {
      name: 'Kenya',
      population: '53.8 million',
      doctorRatio: '1:16,000',
      radiologistRatio: '1:389,000',
      healthcareAccess: '58%',
      challenge: 'Shortage of radiologists and imaging equipment'
    },
    'south-africa': {
      name: 'South Africa',
      population: '59.3 million',
      doctorRatio: '1:1,266',
      radiologistRatio: '1:62,000',
      healthcareAccess: '84%',
      challenge: 'Inequality in healthcare distribution between urban and rural areas'
    },
    'ghana': {
      name: 'Ghana',
      population: '31 million',
      doctorRatio: '1:8,431',
      radiologistRatio: '1:480,000',
      healthcareAccess: '60%',
      challenge: 'Limited diagnostic resources in northern regions'
    },
    'tanzania': {
      name: 'Tanzania',
      population: '59.7 million',
      doctorRatio: '1:25,000',
      radiologistRatio: '1:694,000',
      healthcareAccess: '37%',
      challenge: 'Severe shortage of radiological expertise outside major cities'
    },
    'ethiopia': {
      name: 'Ethiopia',
      population: '115 million',
      doctorRatio: '1:17,000',
      radiologistRatio: '1:830,000',
      healthcareAccess: '28%',
      challenge: 'Critical shortage of diagnostic equipment in rural areas'
    },
    'senegal': {
      name: 'Senegal',
      population: '16.7 million',
      doctorRatio: '1:17,000',
      radiologistRatio: '1:470,000',
      healthcareAccess: '50%',
      challenge: 'Limited diagnostic capacity outside of Dakar'
    },
    'morocco': {
      name: 'Morocco',
      population: '36.9 million',
      doctorRatio: '1:2,000',
      radiologistRatio: '1:90,000',
      healthcareAccess: '70%',
      challenge: 'Unequal distribution of healthcare services'
    }
  };

  useEffect(() => {
    const handleLocationClick = (e) => {
      const id = e.target.id || '';
      if (id.startsWith('location-')) {
        const country = id.replace('location-', '');
        setActiveLocation(country);
        
        // Set tooltip position based on event coordinates
        const rect = e.target.getBoundingClientRect();
        setTooltipPosition({ 
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY 
        });
      }
    };
    
    // Find and add click handlers to all location points
    const locationElements = document.querySelectorAll('[id^="location-"]');
    locationElements.forEach(element => {
      element.style.cursor = 'pointer';
      element.addEventListener('click', handleLocationClick);
      
      // Add pulse animation
      element.classList.add('location-point');
    });
    
    // Clean up
    return () => {
      locationElements.forEach(element => {
        element.removeEventListener('click', handleLocationClick);
      });
    };
  }, []);
  
  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const id = e.target.id || '';
      if (!id.startsWith('location-') && activeLocation) {
        setActiveLocation(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeLocation]);

  return (
    <div className="africa-map-container relative">
      <div className="flex justify-center">
        <object 
          data="/images/africa-map.svg" 
          type="image/svg+xml"
          className="w-full max-w-2xl"
          aria-label="Interactive map of Africa showing ZemedicAI deployment locations"
        >
          Your browser does not support SVG
        </object>
      </div>
      
      {activeLocation && locations[activeLocation] && (
        <div 
          className="absolute z-10 bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4 rounded-lg shadow-xl border border-blue-400 max-w-xs transform transition-all duration-300 ease-in-out"
          style={{
            left: `calc(${tooltipPosition.x}px - 150px)`,
            top: `calc(${tooltipPosition.y}px - 220px)`,
            opacity: 1,
            animation: 'fadeIn 0.3s'
          }}
        >
          <h4 className="text-lg font-bold mb-2 text-blue-200">{locations[activeLocation].name}</h4>
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span className="text-blue-300">Population:</span>
              <span className="font-semibold">{locations[activeLocation].population}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-300">Doctor to Patient:</span>
              <span className="font-semibold">{locations[activeLocation].doctorRatio}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-300">Radiologist Ratio:</span>
              <span className="font-semibold">{locations[activeLocation].radiologistRatio}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-300">Healthcare Access:</span>
              <span className="font-semibold">{locations[activeLocation].healthcareAccess}</span>
            </p>
            <div className="pt-2 mt-2 border-t border-blue-700">
              <p className="text-xs italic text-blue-200">{locations[activeLocation].challenge}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-4 text-blue-300 text-sm">
        <p>Click on a location marker to see healthcare statistics</p>
      </div>
    </div>
  );
};

export default AfricaMap;