import React, { useState } from 'react';

const DashboardSupport = ({ user }) => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactFormData, setContactFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // FAQs data
  const faqsData = [
    {
      id: 1,
      category: 'account',
      question: 'How do I change my password?',
      answer: 'You can change your password by going to Settings > Account > Security. Click on "Change Password" and follow the prompts to set a new password. Make sure to use a strong password that includes uppercase letters, lowercase letters, numbers, and symbols.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'To update your profile information, navigate to the Profile section in your dashboard. Click on the "Edit Profile" button at the top of the page. You can then modify your personal information, address, emergency contacts, and medical information. Remember to click "Save Changes" when you\'re done.'
    },
    {
      id: 3,
      category: 'account',
      question: 'Can I change my email address?',
      answer: 'Yes, you can change your email address in the Profile section. Go to Profile > Personal Information and click "Edit Profile." Update your email address and click "Save Changes." Note that you\'ll need to verify your new email address before the change takes effect.'
    },
    {
      id: 4,
      category: 'scanning',
      question: 'What types of medical scans can I upload?',
      answer: 'ZemedicAI supports various medical imaging formats including DICOM, JPEG, PNG, and PDF. You can upload X-rays, CT scans, MRIs, ultrasounds, and other common medical imaging formats. For best results, use the original DICOM format whenever possible.'
    },
    {
      id: 5,
      category: 'scanning',
      question: 'How accurate are the AI analyses?',
      answer: 'Our AI models achieve high accuracy rates, typically between 85-95% depending on the type of scan and condition being analyzed. However, all analyses should be reviewed by a qualified healthcare professional. We provide confidence scores with each finding to help you understand the reliability of the analysis.'
    },
    {
      id: 6,
      category: 'scanning',
      question: 'How long does it take to analyze a scan?',
      answer: 'Most scans are analyzed within 20-60 seconds, depending on the type of scan and current system load. More complex analyses or very high-resolution images may take slightly longer. You\'ll receive a notification when your analysis is complete.'
    },
    {
      id: 7,
      category: 'scanning',
      question: 'How do I use the Google Health API integration?',
      answer: 'To use the Google Health API integration, click on the "API Key" button in the top navigation bar of your dashboard. Enter your Google Health API key in the popup modal and click "Save." Once configured, ZemedicAI will automatically use the Google Health API for enhanced analysis capabilities when you upload new scans.'
    },
    {
      id: 8,
      category: 'billing',
      question: 'How do I upgrade my subscription plan?',
      answer: 'You can upgrade your subscription by going to Dashboard > Subscription. Review the available plans and click "Upgrade" on your preferred option. Follow the prompts to complete the payment process. Your new subscription benefits will be available immediately after the upgrade is processed.'
    },
    {
      id: 9,
      category: 'billing',
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied with our service, contact our support team within 30 days of your purchase, and we\'ll process a full refund. No questions asked.'
    },
    {
      id: 10,
      category: 'privacy',
      question: 'How is my medical data protected?',
      answer: 'We take data security very seriously. All your data is encrypted both during transmission and at rest using industry-standard encryption protocols. We comply with HIPAA regulations and employ strict access controls. You can adjust your data sharing preferences in Settings > Privacy.'
    },
    {
      id: 11,
      category: 'privacy',
      question: 'Who can see my medical scans and analyses?',
      answer: 'By default, only you and the healthcare providers you explicitly authorize can access your scans and analyses. You can manage access permissions in Settings > Privacy > Data Sharing. We never share your identifiable medical data with third parties without your explicit consent.'
    },
    {
      id: 12,
      category: 'technical',
      question: 'Which browsers are supported?',
      answer: 'ZemedicAI supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome or Firefox. Internet Explorer is not supported. Make sure your browser is updated to the latest version for optimal performance and security.'
    }
  ];
  
  // Resources data
  const resourcesData = [
    {
      id: 1,
      title: 'User Guide',
      description: 'Comprehensive guide to using all features of ZemedicAI',
      icon: (
        <svg className="h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: '#'
    },
    {
      id: 2,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: (
        <svg className="h-8 w-8 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      link: '#'
    },
    {
      id: 3,
      title: 'Medical Terminology Glossary',
      description: 'Definitions of common medical terms used in scan analyses',
      icon: (
        <svg className="h-8 w-8 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '#'
    },
    {
      id: 4,
      title: 'API Documentation',
      description: 'Technical documentation for developers integrating with ZemedicAI',
      icon: (
        <svg className="h-8 w-8 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: '#'
    },
    {
      id: 5,
      title: 'Best Practices for Medical Imaging',
      description: 'Guidelines for capturing high-quality medical images',
      icon: (
        <svg className="h-8 w-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '#'
    },
    {
      id: 6,
      title: 'Security & Privacy Guide',
      description: 'Information about how we protect your data',
      icon: (
        <svg className="h-8 w-8 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      link: '#'
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = faqsData.filter(faq => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return faq.question.toLowerCase().includes(query) || 
           faq.answer.toLowerCase().includes(query) ||
           faq.category.toLowerCase().includes(query);
  });
  
  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    // Validate form
    if (!contactFormData.subject.trim() || !contactFormData.message.trim()) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Submit form (simulated)
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Your message has been sent. Our support team will get back to you soon.');
      
      // Reset form
      setContactFormData({
        subject: '',
        message: '',
        priority: 'normal'
      });
      
      setSubmitting(false);
    }, 1500);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value
    });
  };
  
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Support Center</h1>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Support Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'faqs'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Contact Support
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'resources'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Resources
          </button>
        </div>
      </div>
      
      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="p-6">
            {/* FAQ Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSearchQuery('')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  !searchQuery
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSearchQuery('account')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchQuery === 'account'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setSearchQuery('scanning')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchQuery === 'scanning'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Scanning
              </button>
              <button
                onClick={() => setSearchQuery('billing')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchQuery === 'billing'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Billing
              </button>
              <button
                onClick={() => setSearchQuery('privacy')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchQuery === 'privacy'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Privacy
              </button>
              <button
                onClick={() => setSearchQuery('technical')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchQuery === 'technical'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Technical
              </button>
            </div>
            
            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-gray-750 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left text-white hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <svg 
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 py-4 border-t border-gray-700 text-gray-300">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-gray-750 rounded-lg p-8 text-center">
                  <svg 
                    className="h-12 w-12 text-gray-600 mx-auto mb-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-400 mb-2">No results found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              )}
            </div>
            
            {/* Need More Help */}
            <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-white">Need more help?</h3>
                  <p className="text-blue-300 mt-1">
                    Our support team is ready to assist you with any questions.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Contact Support Tab */}
      {activeTab === 'contact' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Contact Support</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                {/* Contact Form */}
                <form onSubmit={handleContactSubmit}>
                  {/* Success Message */}
                  {successMessage && (
                    <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4 text-green-300 flex items-center">
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {successMessage}
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {errorMessage && (
                    <div className="mb-6 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4 text-red-300 flex items-center">
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errorMessage}
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={contactFormData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Billing Question">Billing Question</option>
                        <option value="Account Management">Account Management</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="API Integration">API Integration</option>
                        <option value="Data Privacy">Data Privacy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactFormData.message}
                        onChange={handleInputChange}
                        rows="6"
                        required
                        placeholder="Please describe your issue or question in detail..."
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-400 mb-1">
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={contactFormData.priority}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low - General question</option>
                        <option value="normal">Normal - Need assistance</option>
                        <option value="high">High - System issue affecting work</option>
                        <option value="urgent">Urgent - Critical issue</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="col-span-1">
                {/* Contact Information */}
                <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-900 bg-opacity-50 rounded-full mr-3">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a href="mailto:support@zemedic.ai" className="text-blue-400 hover:text-blue-300">
                          support@zemedic.ai
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 bg-green-900 bg-opacity-50 rounded-full mr-3">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <a href="tel:+18005551234" className="text-gray-300 hover:text-white">
                          +1 (800) 555-1234
                        </a>
                        <p className="text-xs text-gray-500 mt-1">
                          Mon-Fri, 9AM-6PM ET
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-900 bg-opacity-50 rounded-full mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Live Chat</p>
                        <button className="text-purple-400 hover:text-purple-300">
                          Start a live chat
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          Available 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h4 className="font-medium text-white mb-2">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Resources</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData.map((resource) => (
                <a 
                  key={resource.id} 
                  href={resource.link}
                  className="block bg-gray-750 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  <div className="mb-4">
                    {resource.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-400">{resource.description}</p>
                </a>
              ))}
            </div>
            
            {/* Webinars Section */}
            <div className="mt-10">
              <h3 className="text-xl font-medium text-white mb-6">Upcoming Webinars</h3>
              
              <div className="bg-gray-750 rounded-lg border border-gray-700 overflow-hidden mb-6">
                <div className="p-6 flex flex-col md:flex-row items-start">
                  <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 text-center md:mr-6 mb-4 md:mb-0 md:w-40 flex-shrink-0">
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-sm text-blue-300">June 2023</div>
                    <div className="text-xs text-gray-400 mt-1">1:00 PM ET</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-white mb-2">Getting Started with ZemedicAI</h4>
                    <p className="text-gray-400 mb-4">
                      Join us for a comprehensive introduction to ZemedicAI, covering basic features, uploading scans, and interpreting analysis results.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row items-start">
                  <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 text-center md:mr-6 mb-4 md:mb-0 md:w-40 flex-shrink-0">
                    <div className="text-2xl font-bold text-white">22</div>
                    <div className="text-sm text-purple-300">June 2023</div>
                    <div className="text-xs text-gray-400 mt-1">2:00 PM ET</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-white mb-2">Advanced AI Features for Medical Professionals</h4>
                    <p className="text-gray-400 mb-4">
                      This technical webinar will dive deep into our AI models, customization options, and how to integrate ZemedicAI with your clinical workflow.
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSupport;
