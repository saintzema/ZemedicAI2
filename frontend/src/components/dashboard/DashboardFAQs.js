import React, { useState } from 'react';

const DashboardFAQs = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
  };

  const faqs = [
    {
      question: "How accurate is ZemedicAI's analysis?",
      answer: "ZemedicAI's analysis is highly accurate, with a validated accuracy rate of over 95% for most common conditions. Our AI models are continuously trained on large datasets and validated by experienced medical professionals. However, all results should always be reviewed by a healthcare professional for final diagnosis."
    },
    {
      question: "How is my medical data protected?",
      answer: "We take data security very seriously. All your medical data is encrypted both in transit and at rest using industry-standard encryption protocols. We comply with HIPAA, GDPR, and other relevant healthcare data protection regulations. You can control who has access to your data through your privacy settings."
    },
    {
      question: "Can I share my scan results with my doctor?",
      answer: "Yes, you can easily share your scan results with any healthcare provider. From your scan history, select the scan you wish to share, click the 'Share' button, and either send a secure link via email or generate a PDF report that you can download and share."
    },
    {
      question: "What file formats are supported for scan uploads?",
      answer: "ZemedicAI supports various medical imaging formats including DICOM, JPEG, PNG, and PDF. For best results, we recommend using the original DICOM files when available, as they contain important metadata that can improve analysis accuracy."
    },
    {
      question: "How long does it take to analyze a scan?",
      answer: "Most scan analyses are completed within 1-5 minutes, depending on the complexity of the scan and current system load. Very large scans or complex 3D imaging might take longer. You'll receive a notification when your analysis is complete."
    },
    {
      question: "Can I use ZemedicAI on mobile devices?",
      answer: "Yes, ZemedicAI is fully responsive and works on smartphones and tablets. We also offer dedicated mobile apps for iOS and Android with additional features like direct camera capture for certain types of external scans."
    },
    {
      question: "What types of medical scans can ZemedicAI analyze?",
      answer: "ZemedicAI can analyze a wide range of medical imaging including X-rays, CT scans, MRIs, ultrasounds, and dermatological images. We're continuously expanding our capabilities to cover more specialized imaging types."
    },
    {
      question: "Is ZemedicAI FDA approved?",
      answer: "ZemedicAI has received FDA clearance for several of our analysis modules as clinical decision support tools. However, our service is designed to assist healthcare professionals, not replace them. All results should be confirmed by qualified medical professionals."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from the Subscription page in your dashboard. If you cancel, you'll still have access to your subscription features until the end of your current billing period. Your medical data and history will remain accessible in read-only mode after your subscription ends."
    },
    {
      question: "Can I download my medical history?",
      answer: "Yes, you can download your complete medical history and all your scan data at any time. Go to Settings > Privacy & Data, and select 'Export My Data'. You'll receive a complete archive of all your information in standard formats."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-600">
              Find answers to the most common questions about ZemedicAI. If you can't find what you're looking for, please contact our support team.
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <svg 
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg shadow-md border border-blue-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Still Have Questions?</h2>
          
          <p className="text-gray-600 mb-6">
            Our support team is available to help you with any questions or issues you might have about ZemedicAI.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Email Support</h3>
                  <p className="mt-1 text-gray-600">
                    Send us an email and we'll get back to you within 24 hours.
                  </p>
                  <a href="mailto:support@zemedicai.com" className="mt-2 inline-flex text-blue-600 hover:text-blue-800">
                    support@zemedicai.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Live Chat</h3>
                  <p className="mt-1 text-gray-600">
                    Chat with our support team in real-time during business hours.
                  </p>
                  <button className="mt-2 inline-flex items-center text-green-600 hover:text-green-800">
                    Start Chat
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              You can also check our <a href="#" className="text-blue-600 hover:text-blue-800">knowledge base</a> for detailed tutorials and guides on using ZemedicAI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFAQs;