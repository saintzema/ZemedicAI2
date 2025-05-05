import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('annually'); // 'monthly' or 'annually'
  
  // Pricing tiers with both monthly and annual prices
  const pricingTiers = [
    {
      name: 'Basic',
      description: 'Essential features for individuals',
      monthlyPrice: 9,
      annualPrice: 5, // per month, billed annually ($60/year)
      features: [
        '10 analyses per month',
        'Standard accuracy algorithms',
        'Basic findings reports',
        'Email support',
        'Mobile app access',
        '7-day scan history'
      ],
      recommended: false,
      ctaText: 'Start Free Trial'
    },
    {
      name: 'Professional',
      description: 'Advanced tools for healthcare professionals',
      monthlyPrice: 39,
      annualPrice: 29, // per month, billed annually ($348/year)
      features: [
        '100 analyses per month',
        'Enhanced accuracy algorithms',
        'Detailed findings with recommendations',
        'Priority email & chat support',
        'Mobile app with offline capability',
        '90-day scan history',
        'Patient sharing capabilities',
        'Export to DICOM/PACS'
      ],
      recommended: true,
      ctaText: 'Get Started'
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for organizations',
      monthlyPrice: 99,
      annualPrice: 79, // per month, billed annually ($948/year)
      features: [
        'Unlimited analyses',
        'Highest accuracy AI algorithms',
        'Custom AI model training',
        'Comprehensive diagnostic assistance',
        '24/7 dedicated support',
        'Full history archive',
        'Advanced analytics dashboard',
        'EMR/EHR integration',
        'Multi-user accounts',
        'Custom API access'
      ],
      recommended: false,
      ctaText: 'Contact Sales'
    }
  ];
  
  // Calculate savings percentage
  const calculateSavings = (monthlyPrice, annualPrice) => {
    return Math.round(((monthlyPrice - annualPrice) / monthlyPrice) * 100);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black">
      {/* Navigation */}
      <nav className="text-white bg-gradient-to-r from-blue-950 to-purple-900 shadow-xl py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 flex items-center justify-center">
              <svg className="h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">ZemedicAI</span>
          </Link>
          
          <div className="hidden lg:flex space-x-10">
            <a href="/#features" className="hover:text-blue-300 transition duration-300">Features</a>
            <a href="/#solutions" className="hover:text-blue-300 transition duration-300">Solutions</a>
            <a href="/#about" className="hover:text-blue-300 transition duration-300">About Us</a>
            <a href="/#contact" className="hover:text-blue-300 transition duration-300">Contact</a>
          </div>
          
          <div className="hidden lg:flex space-x-3">
            <Link to="/login" className="px-5 py-2 text-sm rounded-md border border-blue-500 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300">
              Log In
            </Link>
            <Link to="/signup" className="px-5 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md">
              Sign Up
            </Link>
          </div>
          
          <div className="lg:hidden">
            <Link to="/" className="text-white hover:text-blue-300 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            Choose the perfect plan that fits your needs, whether you're an individual practitioner or a large healthcare organization.
          </p>
          
          {/* Billing cycle toggle */}
          <div className="flex justify-center items-center mb-10">
            <span className={`mr-3 text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-blue-300'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                billingCycle === 'annually' ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span 
                className={`inline-block h-6 w-6 rounded-full bg-white transition-transform duration-300 ${
                  billingCycle === 'annually' ? 'translate-x-9' : 'translate-x-1'
                }`} 
              />
            </button>
            <span className={`ml-3 text-sm font-medium ${billingCycle === 'annually' ? 'text-white' : 'text-blue-300'}`}>
              Annual <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full ml-1">Save up to 44%</span>
            </span>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`rounded-2xl overflow-hidden border ${
                tier.recommended 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-700'
              } bg-gray-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              {tier.recommended && (
                <div className="bg-blue-600 py-1.5 text-center text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-gray-400">{tier.description}</p>
                <div className="mt-6">
                  <div className="flex items-end">
                    <span className="text-5xl font-extrabold text-white">
                      ${billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice}
                    </span>
                    <span className="text-lg ml-2 pb-1.5 text-gray-400">/mo</span>
                  </div>
                  {billingCycle === 'annually' && (
                    <div className="mt-1 flex items-center">
                      <span className="text-green-400 text-sm font-medium">
                        Save {calculateSavings(tier.monthlyPrice, tier.annualPrice)}%
                      </span>
                      <span className="ml-2 text-sm text-gray-400">
                        ${tier.annualPrice * 12}/year
                      </span>
                    </div>
                  )}
                </div>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href={tier.name === 'Enterprise' ? '/contact-sales' : '/signup'}
                    className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                      tier.recommended 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                        : 'bg-blue-900 hover:bg-blue-800 text-white'
                    } transition-colors duration-300`}
                  >
                    {tier.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-2">Can I switch plans later?</h3>
              <p className="text-gray-300">Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect on your next billing cycle.</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-2">Is there a free trial available?</h3>
              <p className="text-gray-300">Yes, all plans include a 14-day free trial. No credit card required to start. You can explore all the features before committing to a paid plan.</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">We accept all major credit cards, PayPal, and for Enterprise customers, we also offer invoice-based payment options.</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-2">Is my data secure?</h3>
              <p className="text-gray-300">Absolutely. We use industry-standard encryption and security practices. All patient data is anonymized and stored in compliance with HIPAA regulations.</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-2">Do you offer custom plans for healthcare systems?</h3>
              <p className="text-gray-300">Yes, we offer tailored Enterprise solutions for hospitals and healthcare networks. Contact our sales team for a custom quote based on your specific requirements.</p>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Medical Imaging?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of healthcare professionals already using ZemedicAI to improve diagnostics and patient care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition duration-300 text-center font-semibold shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-md border border-blue-400 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 transition duration-300 text-center font-semibold"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Link to="/" className="flex items-center">
                <img className="h-10 w-auto" src="/images/logo.svg" alt="ZemedicAI" />
                <span className="ml-2 text-white text-xl font-bold">ZemedicAI</span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-xs">
                Revolutionizing medical imaging with AI for improved diagnostics worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Releases</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">HIPAA</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ZemedicAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
