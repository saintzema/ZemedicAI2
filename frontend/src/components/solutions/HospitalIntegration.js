import React from 'react';
import { Link } from 'react-router-dom';
import MedicalDisclaimer from '../MedicalDisclaimer';

const HospitalIntegration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-950 to-purple-900 shadow-lg py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 flex items-center justify-center">
              <img src="/images/logo.svg" alt="ZemedicAI Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-blue-300 transition duration-300">Home</Link>
            <Link to="/solutions" className="text-blue-300 hover:text-white transition duration-300">Solutions</Link>
            <Link to="/login" className="px-4 py-1 text-sm rounded-md border border-blue-500 text-white hover:bg-blue-900 hover:bg-opacity-30 transition duration-300">Log In</Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-blue-600 blur-3xl opacity-20"></div>
          <div className="absolute left-1/4 top-1/3 w-80 h-80 rounded-full bg-purple-600 blur-3xl opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Hospital Integration Solutions
            </h1>
            <div className="h-1 w-20 bg-blue-500 mb-6"></div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Seamlessly integrate ZemedicAI with your existing hospital infrastructure for enhanced diagnostic capabilities and workflow optimization.
            </p>
          </div>
        </div>
      </div>
      
      {/* Integration Features */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">EMR/EHR Integration</h3>
              <p className="text-blue-300">Seamlessly connect with major electronic medical record systems including Epic, Cerner, and Meditech. Ensure patient data flows securely between systems.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">PACS Connectivity</h3>
              <p className="text-blue-300">Direct connection to hospital PACS (Picture Archiving and Communication System) for automated AI analysis of medical images in your existing workflow.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">HIPAA Compliant</h3>
              <p className="text-blue-300">Fully HIPAA-compliant solutions with end-to-end encryption, audit trails, and role-based access controls to maintain security and privacy.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Integration Process */}
      <div className="py-20 bg-gradient-to-b from-black to-blue-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Integration Process</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Our hospital integration follows a proven methodology to ensure minimal disruption and maximum effectiveness.</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-800"></div>
            
            <div className="flex flex-col space-y-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Assessment</h3>
                  <p className="text-blue-300">Our technical team evaluates your current infrastructure, integration points, and workflow to design a custom solution.</p>
                </div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 border-4 border-blue-700 z-10 md:mx-8">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 border-4 border-blue-700 z-10 md:mx-8">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Implementation</h3>
                  <p className="text-blue-300">Experienced engineers deploy and configure secure API connections between ZemedicAI and your hospital systems.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Testing</h3>
                  <p className="text-blue-300">Rigorous testing ensures proper data flow, security compliance, and functionality across all integrated systems.</p>
                </div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 border-4 border-blue-700 z-10 md:mx-8">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 border-4 border-blue-700 z-10 md:mx-8">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Training & Support</h3>
                  <p className="text-blue-300">Comprehensive training for staff and ongoing 24/7 technical support ensure smooth adoption and operation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Case Study */}
      <div className="py-20 bg-blue-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12">
                <div className="mb-6">
                  <span className="px-3 py-1 bg-blue-700 text-white text-sm rounded-full">Case Study</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">University Medical Center</h3>
                <p className="text-blue-200 mb-6">University Medical Center integrated ZemedicAI with their existing PACS and Epic EHR system, resulting in:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">42% reduction in report turnaround times</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">18% increase in early diagnosis of critical conditions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">$1.2M annual cost savings through workflow optimization</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a href="#" className="px-6 py-3 bg-white text-blue-900 font-medium rounded-md hover:bg-blue-100 transition duration-300">Read Full Case Study</a>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514" 
                  alt="Hospital Integration" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-900 opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-blue-950 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Hospital's Diagnostic Capabilities?</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">Schedule a consultation with our integration specialists to learn how ZemedicAI can enhance your hospital's workflow with green energy and AI technology.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold">Schedule Consultation</a>
            <a href="#" className="px-8 py-4 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 font-semibold">Download Brochure</a>
          </div>
        </div>
      </div>
      
      <MedicalDisclaimer position="bottom" />
    </div>
  );
};

export default HospitalIntegration;