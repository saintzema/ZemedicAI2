import React from 'react';
import { Link } from 'react-router-dom';
import MedicalDisclaimer from './MedicalDisclaimer';

const HospitalIntegration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-purple-900 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="ZemedicAI Logo" className="h-10 w-10" />
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
            </Link>
            <Link to="/" className="text-blue-300 hover:text-white transition duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-950 to-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              Hospital Integration Solutions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Seamlessly integrate ZemedicAI with your existing hospital infrastructure for enhanced diagnostic capabilities and workflow optimization.
            </p>
          </div>
        </div>
      </div>
      
      {/* Integration Details */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-200">PACS Integration</h3>
                <p className="text-blue-100 mb-4">
                  ZemedicAI integrates with all major PACS (Picture Archiving and Communication System) vendors through standard DICOM protocols, enabling seamless access to your medical imaging database.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automatic routing of new studies for AI analysis</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Results transmitted back to PACS as secondary captures</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>HL7 integration for patient demographic data</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-200">EHR Integration</h3>
                <p className="text-blue-100 mb-4">
                  Link ZemedicAI directly to your Electronic Health Record system to ensure findings are incorporated into patient records automatically.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Compatible with Epic, Cerner, MEDITECH, and other major EHR systems</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>FHIR and API-based connectivity options</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Automated findings documentation in patient records</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-xl border border-blue-800 mb-16">
              <h3 className="text-2xl font-semibold mb-6 text-blue-200">Workflow Integration</h3>
              <p className="text-blue-100 mb-6">
                ZemedicAI enhances your radiology workflow by providing AI-powered analysis at key points in the diagnostic pathway:
              </p>
              
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-800"></div>
                
                <div className="space-y-8 relative">
                  <div className="ml-10 relative">
                    <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-800 z-10"></div>
                    <h4 className="text-xl font-semibold text-blue-200 mb-2">Image Acquisition</h4>
                    <p className="text-blue-100">
                      Direct integration with X-ray, CT, and MRI machines allows instant analysis as soon as images are captured.
                    </p>
                  </div>
                  
                  <div className="ml-10 relative">
                    <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-800 z-10"></div>
                    <h4 className="text-xl font-semibold text-blue-200 mb-2">Worklist Prioritization</h4>
                    <p className="text-blue-100">
                      Critical findings are automatically flagged and prioritized in radiologist worklists.
                    </p>
                  </div>
                  
                  <div className="ml-10 relative">
                    <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-800 z-10"></div>
                    <h4 className="text-xl font-semibold text-blue-200 mb-2">Diagnostic Assistance</h4>
                    <p className="text-blue-100">
                      Radiologists can view AI analysis alongside images, with interactive highlighting of findings.
                    </p>
                  </div>
                  
                  <div className="ml-10 relative">
                    <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-800 z-10"></div>
                    <h4 className="text-xl font-semibold text-blue-200 mb-2">Report Generation</h4>
                    <p className="text-blue-100">
                      AI findings can be incorporated directly into reports with a single click.
                    </p>
                  </div>
                  
                  <div className="ml-10 relative">
                    <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-800 z-10"></div>
                    <h4 className="text-xl font-semibold text-blue-200 mb-2">Clinical Follow-up</h4>
                    <p className="text-blue-100">
                      Findings are communicated to referring physicians with clear next-step recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-xl text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to integrate ZemedicAI into your hospital?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our team will work with your IT department to ensure a smooth implementation with minimal disruption to your existing workflows.
              </p>
              <Link to="/contact" className="inline-block px-8 py-4 bg-white text-blue-900 rounded-md font-semibold hover:bg-blue-100 transition duration-300 shadow-lg">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <MedicalDisclaimer position="bottom" />
    </div>
  );
};

export default HospitalIntegration;