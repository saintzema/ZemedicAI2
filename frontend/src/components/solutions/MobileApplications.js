import React from 'react';
import { Link } from 'react-router-dom';
import MedicalDisclaimer from '../MedicalDisclaimer';

const MobileApplications = () => {
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
              Mobile Applications
            </h1>
            <div className="h-1 w-20 bg-blue-500 mb-6"></div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Bringing ZemedicAI's powerful medical imaging analysis to iOS and Android devices for healthcare professionals on the move.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Image */}
      <div className="relative -mt-8 mb-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561" 
              alt="Mobile Application" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center px-4 py-2 bg-blue-700 rounded-full text-white">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>iOS & Android</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-purple-700 rounded-full text-white">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-green-700 rounded-full text-white">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <span>Offline Capabilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* App Features */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mobile App Features</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Our mobile applications bring ZemedicAI's powerful capabilities to healthcare professionals anywhere, anytime.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Capture & Analyze</h3>
              <p className="text-blue-300">Take photos of existing X-rays or scans and receive AI analysis directly on your mobile device within seconds.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-purple-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Patient History</h3>
              <p className="text-blue-300">Access complete patient histories, including previous scans, analyses, and treatment plans, all securely stored.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-green-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Secure Messaging</h3>
              <p className="text-blue-300">Collaborate with colleagues securely through HIPAA-compliant messaging with image sharing capabilities.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-yellow-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Offline Mode</h3>
              <p className="text-blue-300">Work in areas with limited connectivity with full access to core AI capabilities and synchronized when back online.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-red-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Urgent Notifications</h3>
              <p className="text-blue-300">Receive immediate alerts for critical findings that require urgent attention, with customizable thresholds.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-xl border border-blue-800 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <div className="text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Report Generation</h3>
              <p className="text-blue-300">Create and share detailed reports with findings, visualizations, and recommended follow-up actions.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* App Screenshots */}
      <div className="py-20 bg-gradient-to-b from-black to-blue-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The ZemedicAI App</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Designed for healthcare professionals with a focus on intuitive interaction and efficient workflows.</p>
          </div>
          
          <div className="flex flex-nowrap overflow-x-auto px-4 pb-8 space-x-6">
            <div className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-900 to-purple-950 rounded-3xl overflow-hidden shadow-xl p-3">
              <div className="bg-black rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5" 
                  alt="App Screenshot - Dashboard" 
                  className="w-full h-auto"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-white font-bold">Dashboard</h3>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-900 to-purple-950 rounded-3xl overflow-hidden shadow-xl p-3">
              <div className="bg-black rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28" 
                  alt="App Screenshot - Scan Analysis" 
                  className="w-full h-auto"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-white font-bold">Scan Analysis</h3>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-900 to-purple-950 rounded-3xl overflow-hidden shadow-xl p-3">
              <div className="bg-black rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
                  alt="App Screenshot - Patient Records" 
                  className="w-full h-auto"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-white font-bold">Patient Records</h3>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-900 to-purple-950 rounded-3xl overflow-hidden shadow-xl p-3">
              <div className="bg-black rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
                  alt="App Screenshot - Reporting" 
                  className="w-full h-auto"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-white font-bold">Reporting</h3>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-3">
            <a href="#" className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5383 12.0001C17.5383 11.5306 17.4513 11.0787 17.2953 10.6442L12.1855 15.7541V16.8732L14.9821 16.8732C14.5649 17.9922 13.6957 18.9005 12.1855 18.9005C10.3459 18.9005 8.85126 17.4059 8.85126 15.5663C8.85126 13.7267 10.3459 12.2321 12.1855 12.2321C12.7269 12.2321 13.229 12.3618 13.6609 12.5973L14.7336 11.5247C14.0205 11.0524 13.1405 10.7698 12.1855 10.7698C9.53716 10.7698 7.38892 12.918 7.38892 15.5663C7.38892 18.2147 9.53716 20.3629 12.1855 20.3629C14.6205 20.3629 16.5818 18.5581 16.5818 15.5663L16.5818 14.8358L12.1855 14.8358V16.2942H15.1195C15.0094 16.5603 14.8621 16.8058 14.6821 17.0262C14.0611 17.7928 13.1781 18.2942 12.1855 18.2942C10.6826 18.2942 9.45759 17.0692 9.45759 15.5663C9.45759 14.0634 10.6826 12.8384 12.1855 12.8384C12.904 12.8384 13.5611 13.1073 14.0553 13.5595C14.5496 14.0116 14.8513 14.646 14.8834 15.3495L17.2953 12.9395C17.4513 12.505 17.5383 12.0696 17.5383 12.0001Z"/>
              </svg>
              <span>Google Play</span>
            </a>
            <a href="#" className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.8512 5.65622C15.5113 4.85522 15.9519 3.77429 15.8161 2.70117C14.8828 2.74443 13.7467 3.33544 13.0668 4.13644C12.4611 4.82322 11.9233 5.92596 12.083 6.95246C13.148 7.02408 14.1911 6.45721 14.8512 5.65622Z"/>
                <path d="M16.8717 10.998C16.8458 9.08826 18.4126 8.16222 18.4861 8.11446C17.5722 6.7647 16.1542 6.56258 15.6163 6.54037C14.3818 6.40587 13.1995 7.29968 12.5727 7.29968C11.9262 7.29968 10.9547 6.56258 9.91784 6.58479C8.59383 6.60701 7.36248 7.36603 6.68643 8.58664C5.2871 11.0721 6.33488 14.7482 7.65889 16.6357C8.33494 17.5517 9.11617 18.579 10.1353 18.5345C11.1119 18.49 11.4956 17.8844 12.6853 17.8844C13.8553 17.8844 14.2167 18.5345 15.2301 18.5123C16.2768 18.49 16.9528 17.5739 17.6092 16.6579C18.3915 15.6197 18.6927 14.6147 18.715 14.5669C18.6927 14.5447 16.8999 13.8242 16.8717 10.998Z"/>
              </svg>
              <span>App Store</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="py-20 bg-blue-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-blue-500 opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-purple-500 opacity-20"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/3 mb-10 lg:mb-0 lg:pr-12">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Dr. James Wilson" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl mb-6"
                />
                <h3 className="text-2xl font-bold text-white mb-1">Dr. James Wilson</h3>
                <p className="text-blue-200 mb-4">Chief Radiologist, Memorial Hospital</p>
                <div className="flex text-yellow-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="lg:w-2/3">
                <svg className="h-10 w-10 text-blue-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-2xl font-medium text-white mb-8">
                  "The ZemedicAI mobile app has transformed how I work. Being able to capture and analyze an X-ray while at a patient's bedside has cut my diagnostic time by 65%. The offline capabilities mean I can use it even in rural clinics with poor connectivity, and the AI analysis is as accurate as having a second radiologist's opinion instantly available."
                </blockquote>
                <a href="#" className="inline-flex items-center text-blue-300 hover:text-blue-200">
                  <span>Read full case study</span>
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience ZemedicAI On-The-Go</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">Download our mobile application to transform how you deliver care. Available now for iOS and Android devices.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.8512 5.65622C15.5113 4.85522 15.9519 3.77429 15.8161 2.70117C14.8828 2.74443 13.7467 3.33544 13.0668 4.13644C12.4611 4.82322 11.9233 5.92596 12.083 6.95246C13.148 7.02408 14.1911 6.45721 14.8512 5.65622Z"/>
                <path d="M16.8717 10.998C16.8458 9.08826 18.4126 8.16222 18.4861 8.11446C17.5722 6.7647 16.1542 6.56258 15.6163 6.54037C14.3818 6.40587 13.1995 7.29968 12.5727 7.29968C11.9262 7.29968 10.9547 6.56258 9.91784 6.58479C8.59383 6.60701 7.36248 7.36603 6.68643 8.58664C5.2871 11.0721 6.33488 14.7482 7.65889 16.6357C8.33494 17.5517 9.11617 18.579 10.1353 18.5345C11.1119 18.49 11.4956 17.8844 12.6853 17.8844C13.8553 17.8844 14.2167 18.5345 15.2301 18.5123C16.2768 18.49 16.9528 17.5739 17.6092 16.6579C18.3915 15.6197 18.6927 14.6147 18.715 14.5669C18.6927 14.5447 16.8999 13.8242 16.8717 10.998Z"/>
              </svg>
              Download on App Store
            </a>
            <a href="#" className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5383 12.0001C17.5383 11.5306 17.4513 11.0787 17.2953 10.6442L12.1855 15.7541V16.8732L14.9821 16.8732C14.5649 17.9922 13.6957 18.9005 12.1855 18.9005C10.3459 18.9005 8.85126 17.4059 8.85126 15.5663C8.85126 13.7267 10.3459 12.2321 12.1855 12.2321C12.7269 12.2321 13.229 12.3618 13.6609 12.5973L14.7336 11.5247C14.0205 11.0524 13.1405 10.7698 12.1855 10.7698C9.53716 10.7698 7.38892 12.918 7.38892 15.5663C7.38892 18.2147 9.53716 20.3629 12.1855 20.3629C14.6205 20.3629 16.5818 18.5581 16.5818 15.5663L16.5818 14.8358L12.1855 14.8358V16.2942H15.1195C15.0094 16.5603 14.8621 16.8058 14.6821 17.0262C14.0611 17.7928 13.1781 18.2942 12.1855 18.2942C10.6826 18.2942 9.45759 17.0692 9.45759 15.5663C9.45759 14.0634 10.6826 12.8384 12.1855 12.8384C12.904 12.8384 13.5611 13.1073 14.0553 13.5595C14.5496 14.0116 14.8513 14.646 14.8834 15.3495L17.2953 12.9395C17.4513 12.505 17.5383 12.0696 17.5383 12.0001Z"/>
              </svg>
              Get it on Google Play
            </a>
          </div>
        </div>
      </div>
      
      <MedicalDisclaimer position="bottom" />
    </div>
  );
};

export default MobileApplications;