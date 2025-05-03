import React, { useState } from 'react';

const DashboardSupport = ({ user }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    category: '',
    description: '',
    attachments: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Handle input change for support ticket form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupportTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSupportTicket(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };
  
  // Remove an attachment
  const removeAttachment = (index) => {
    setSupportTicket(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };
  
  // Submit support ticket
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Support ticket submitted:', supportTicket);
      setSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setSupportTicket({
        subject: '',
        category: '',
        description: '',
        attachments: []
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  // FAQ data
  const faqCategories = [
    {
      id: 'general',
      name: 'General Questions',
      questions: [
        {
          question: 'What is ZemedicAI?',
          answer: 'ZemedicAI is an AI-powered platform for medical imaging analysis. We use advanced machine learning algorithms to help analyze various types of medical scans including X-rays, MRIs, and CT scans to assist healthcare professionals and patients with early detection and diagnosis.'
        },
        {
          question: 'How accurate is the AI analysis?',
          answer: 'Our AI models achieve over 90% accuracy on average across different types of scans and conditions. However, ZemedicAI is designed to be a supportive tool for healthcare professionals and should not replace professional medical advice. All analyses should be reviewed by qualified medical professionals.'
        },
        {
          question: 'Is my medical data secure?',
          answer: 'Yes, we take data security and privacy very seriously. All your medical data is encrypted both in transit and at rest. We comply with HIPAA regulations and other international healthcare data protection standards. You can manage your data sharing preferences in your account settings.'
        },
        {
          question: 'Can I use ZemedicAI on my mobile device?',
          answer: 'Yes, ZemedicAI is fully responsive and works on smartphones and tablets. We also offer dedicated mobile apps for iOS and Android for an optimized experience on mobile devices.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Subscription',
      questions: [
        {
          question: 'How do I change my subscription plan?',
          answer: 'You can change your subscription plan at any time by going to Dashboard > Subscription. There you\'ll find all available plans and can upgrade or downgrade as needed. Changes to your subscription will take effect at the start of your next billing cycle.'
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time from your Dashboard > Subscription page. If you cancel, you'll continue to have access to your current plan's features until the end of your current billing period.'
        },
        {
          question: 'How do I update my payment information?',
          answer: 'You can update your payment method by going to Dashboard > Subscription > Manage Payment Method. There you can add, update, or remove payment methods.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund. After this period, refunds are considered on a case-by-case basis.'
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical Support',
      questions: [
        {
          question: 'What file formats are supported for scan uploads?',
          answer: 'ZemedicAI supports standard medical imaging formats including DICOM, JPEG, PNG, and TIFF files. For optimal results, we recommend using the original DICOM files when available.'
        },
        {
          question: 'Why is my scan upload failing?',
          answer: 'Scan uploads might fail due to several reasons: file size exceeding the limit (100MB per file), unsupported file format, poor image quality, or network connectivity issues. Try compressing your file or using a different format. If problems persist, contact our support team.'
        },
        {
          question: 'How long does the AI analysis take?',
          answer: 'Most scans are analyzed within 1-2 minutes. However, processing time can vary based on the type of scan, file size, and current system load. Premium subscription users receive priority processing.'
        },
        {
          question: 'Can I integrate ZemedicAI with my existing healthcare systems?',
          answer: 'Yes, ZemedicAI offers API integration capabilities for healthcare providers on Professional, Premium, and Enterprise plans. Our APIs allow integration with EHR systems, PACS, and other healthcare platforms. Contact our integration team for detailed documentation and support.'
        }
      ]
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      questions: [
        {
          question: 'Who can see my medical data?',
          answer: 'By default, only you and the healthcare providers you explicitly share with can see your medical data. You can control your data sharing preferences in your Dashboard > Settings > Privacy & Data Settings.'
        },
        {
          question: 'How is my data used to improve the service?',
          answer: 'With your consent, anonymized scan data may be used to train and improve our AI models. This helps make our analysis more accurate for all users. You can opt out of this data sharing in your Privacy Settings at any time without affecting your service quality.'
        },
        {
          question: 'Can I delete all my data from your systems?',
          answer: 'Yes, you can request a complete deletion of your data from our systems through Dashboard > Settings > Danger Zone > Delete Account. This will permanently remove all your data including scans, analyses, and account information.'
        },
        {
          question: 'Is ZemedicAI compliant with healthcare regulations?',
          answer: 'Yes, ZemedicAI is compliant with healthcare regulations including HIPAA in the US, GDPR in Europe, and other regional healthcare data protection standards. Our platform undergoes regular security audits and compliance assessments.'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;
  
  // Support ticket categories
  const ticketCategories = [
    { value: '', label: 'Select a category' },
    { value: 'account', label: 'Account Issues' },
    { value: 'billing', label: 'Billing & Subscription' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'analysis', label: 'Analysis Results' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'integration', label: 'API & Integration' },
    { value: 'other', label: 'Other' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Support & Help</h2>
        <p className="text-gray-400 text-sm">Get help with ZemedicAI services and features</p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            Frequently Asked Questions
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contact' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            Contact Support
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'resources' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            Resources & Documentation
          </button>
        </nav>
      </div>
      
      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          {/* Search FAQs */}
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-3.5">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* FAQ Accordion */}
          {filteredFaqs.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-white mb-2">No matching questions found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                We couldn't find any FAQs matching your search query. Try using different keywords or contact our support team.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  Clear Search
                </button>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFaqs.map(category => (
                <div key={category.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="bg-gray-750 p-4 border-b border-gray-700">
                    <h3 className="text-lg font-medium text-white">{category.name}</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    {category.questions.map((faq, idx) => (
                      <details key={idx} className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer text-blue-400 hover:text-blue-300 list-none">
                          <span>{faq.question}</span>
                          <span className="transition group-open:rotate-180">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </summary>
                        <p className="text-gray-300 mt-3 group-open:animate-fadeIn">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Still Need Help */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold text-white mb-2">Still Need Help?</h3>
                <p className="text-blue-200 max-w-lg">
                  Can't find an answer to your question? Our support team is available to assist you.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Contact Support Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Contact Methods */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-3">Contact Options</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-900 rounded-full text-blue-300 mt-1">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-medium">Email Support</h4>
                      <p className="text-gray-400 text-sm">Typical response in 24 hours</p>
                      <a href="mailto:support@zemedicai.com" className="text-blue-400 hover:text-blue-300 text-sm block mt-1">
                        support@zemedicai.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-900 rounded-full text-blue-300 mt-1">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-medium">Live Chat</h4>
                      <p className="text-gray-400 text-sm">Available weekdays 9AM-5PM EST</p>
                      <button className="text-blue-400 hover:text-blue-300 text-sm block mt-1">
                        Start Chat Session
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-900 rounded-full text-blue-300 mt-1">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-medium">Phone Support</h4>
                      <p className="text-gray-400 text-sm">Premium & Enterprise customers only</p>
                      <a href="tel:+18005551234" className="text-blue-400 hover:text-blue-300 text-sm block mt-1">
                        +1 (800) 555-1234
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support Hours */}
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-3">Support Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday:</span>
                    <span className="text-white">9:00 AM - 8:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday:</span>
                    <span className="text-white">10:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday:</span>
                    <span className="text-white">Closed</span>
                  </div>
                  <div className="pt-2 text-gray-400 border-t border-gray-700 mt-2">
                    <p>Premium and Enterprise customers have access to 24/7 emergency support.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Support Ticket Form */}
            <div className="md:col-span-2">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Submit a Support Ticket</h3>
                
                {submitSuccess ? (
                  <div className="bg-green-900 bg-opacity-30 text-green-300 p-4 rounded-lg mb-4">
                    <div className="flex">
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p>Your support ticket has been submitted successfully! Our team will respond to you shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Subject
                      </label>
                      <input 
                        type="text" 
                        name="subject"
                        value={supportTicket.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Category
                      </label>
                      <select 
                        name="category"
                        value={supportTicket.category}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {ticketCategories.map(category => (
                          <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea 
                        name="description"
                        value={supportTicket.description}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please provide as much detail as possible about your issue"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Attachments (Optional)
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-750 hover:border-gray-500">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 text-gray-400 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-xs text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              Max 5 files (10MB each) - Images, PDFs, or documents
                            </p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange}
                            multiple
                            accept="image/*,.pdf,.doc,.docx,.txt"
                          />
                        </label>
                      </div>
                      
                      {/* Attachment List */}
                      {supportTicket.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-gray-400">Attached Files:</p>
                          <div className="flex flex-wrap gap-2">
                            {supportTicket.attachments.map((file, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-center bg-gray-750 rounded px-3 py-1.5 text-sm text-gray-300"
                              >
                                <span className="truncate max-w-xs">{file.name}</span>
                                <button 
                                  type="button"
                                  onClick={() => removeAttachment(idx)}
                                  className="ml-2 text-gray-400 hover:text-gray-300"
                                >
                                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-700">
                      <button 
                        type="submit"
                        disabled={submitting}
                        className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors disabled:bg-blue-800 disabled:opacity-70 flex items-center justify-center"
                      >
                        {submitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Submitting...
                          </>
                        ) : 'Submit Ticket'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Documentation */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="p-3 rounded-full bg-blue-900 text-blue-300 mb-4 inline-block">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive guides and documentation for all ZemedicAI features and functionality.
                </p>
                <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  Browse Documentation
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Video Tutorials */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="p-3 rounded-full bg-red-900 text-red-300 mb-4 inline-block">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Video Tutorials</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Step-by-step video guides for using ZemedicAI features and interpreting analysis results.
                </p>
                <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  Watch Tutorials
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* API Reference */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="p-3 rounded-full bg-green-900 text-green-300 mb-4 inline-block">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">API Reference</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Technical documentation for integrating ZemedicAI into your healthcare systems.
                </p>
                <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  API Documentation
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Knowledge Base */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="p-3 rounded-full bg-purple-900 text-purple-300 mb-4 inline-block">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Knowledge Base</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Articles, guides, and best practices for getting the most out of ZemedicAI.
                </p>
                <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  Browse Articles
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Webinars */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="p-3 rounded-full bg-yellow-900 text-yellow-300 mb-4 inline-block">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Webinars & Training</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Live and recorded training sessions for healthcare professionals using ZemedicAI.
                </p>
                <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  View Schedule
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Community Forum */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
              <div className="p-6">
                <div className="p-3 rounded-full bg-indigo-900 text-indigo-300 mb-4 inline-block">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Community Forum</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Connect with other ZemedicAI users to share experiences and best practices.
                </p>
                <a href="#" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                  Join Discussion
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Featured Resources */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-750 p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Featured Resources</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="p-2 bg-blue-900 text-blue-300 rounded-md">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Getting Started with ZemedicAI</h4>
                  <p className="text-gray-400 text-sm mt-1">A complete walkthrough of setting up your account and uploading your first scan.</p>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                    Watch Video (5:23)
                  </a>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="p-2 bg-blue-900 text-blue-300 rounded-md">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Understanding Analysis Results</h4>
                  <p className="text-gray-400 text-sm mt-1">Learn how to interpret ZemedicAI analysis results and use them effectively in clinical settings.</p>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                    Read Guide
                  </a>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="p-2 bg-blue-900 text-blue-300 rounded-md">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Upcoming Webinar: AI in Medical Imaging</h4>
                  <p className="text-gray-400 text-sm mt-1">Join our expert panel discussing the latest advancements in AI-powered medical imaging analysis.</p>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                    Register (July 25, 2023)
                  </a>
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