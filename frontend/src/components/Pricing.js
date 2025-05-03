import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // Plans data
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'For individuals starting their health monitoring journey',
      price: { monthly: 5, annual: 50 },
      features: [
        'Basic scan analysis',
        'Store up to 10 scans',
        'Basic analytics',
        'Email support',
        'Single device access'
      ],
      limitations: [
        'No specialist consultations',
        'Limited analysis types',
        'No data export',
        'No custom AI training'
      ],
      cta: 'Get Started',
      color: 'blue'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For health-conscious individuals and small practices',
      price: { monthly: 19, annual: 190 },
      features: [
        'Enhanced scan analysis',
        'Store up to 100 scans',
        'Advanced analytics',
        'Priority email support',
        'Multi-device access',
        'Data export',
        'Basic specialist network'
      ],
      limitations: [
        'Limited custom AI training',
        'Standard analysis speed'
      ],
      cta: 'Try Professional',
      color: 'purple',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For medical professionals and clinics',
      price: { monthly: 49, annual: 490 },
      features: [
        'Premium scan analysis',
        'Unlimited scan storage',
        'Real-time analytics',
        '24/7 priority support',
        'Unlimited devices',
        'Advanced data export',
        'Full specialist network access',
        'Custom AI model training',
        'API access',
        'White-label options'
      ],
      limitations: [],
      cta: 'Try Premium',
      color: 'indigo'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For hospitals and large healthcare organizations',
      price: { monthly: 99, annual: 990 },
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Custom integration support',
        'SLA guarantees',
        'Advanced security features',
        'On-premise deployment options',
        'Custom AI development',
        'Training and onboarding',
        'Bulk licensing discounts'
      ],
      limitations: [],
      cta: 'Contact Sales',
      color: 'teal'
    }
  ];
  
  // Calculate annual savings
  const calculateSavings = (plan) => {
    const monthlyAnnual = plan.price.monthly * 12;
    const annualPrice = plan.price.annual;
    return Math.round(((monthlyAnnual - annualPrice) / monthlyAnnual) * 100);
  };
  
  // Get color classes for a specific plan
  const getColorClasses = (plan) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-600',
        bgHover: 'hover:bg-blue-500',
        bgLight: 'bg-blue-900',
        border: 'border-blue-500',
        text: 'text-blue-400',
        textHover: 'hover:text-blue-300',
        gradient: 'from-blue-600 to-blue-700'
      },
      purple: {
        bg: 'bg-purple-600',
        bgHover: 'hover:bg-purple-500',
        bgLight: 'bg-purple-900',
        border: 'border-purple-500',
        text: 'text-purple-400',
        textHover: 'hover:text-purple-300',
        gradient: 'from-purple-600 to-purple-700'
      },
      indigo: {
        bg: 'bg-indigo-600',
        bgHover: 'hover:bg-indigo-500',
        bgLight: 'bg-indigo-900',
        border: 'border-indigo-500',
        text: 'text-indigo-400',
        textHover: 'hover:text-indigo-300',
        gradient: 'from-indigo-600 to-indigo-700'
      },
      teal: {
        bg: 'bg-teal-600',
        bgHover: 'hover:bg-teal-500',
        bgLight: 'bg-teal-900',
        border: 'border-teal-500',
        text: 'text-teal-400',
        textHover: 'hover:text-teal-300',
        gradient: 'from-teal-600 to-teal-700'
      }
    };
    
    return colorMap[plan.color] || colorMap.blue;
  };
  
  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 text-xl text-gray-400">
            Choose the plan that's right for your healthcare needs, with no hidden fees or long-term commitments.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-12 flex justify-center">
            <div className="relative bg-gray-800 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-6 text-sm font-medium rounded-md ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`ml-1 py-2 px-6 text-sm font-medium rounded-md ${
                  billingCycle === 'annual'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Annual
              </button>
              
              {billingCycle === 'annual' && (
                <span className="absolute -top-3 right-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save 15-20%
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {plans.map((plan) => {
            const colorClasses = getColorClasses(plan);
            
            return (
              <div
                key={plan.id}
                className={`relative bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500 transform sm:scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-bold uppercase py-1.5 px-4 bg-blue-600 text-white rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`bg-gradient-to-b ${colorClasses.gradient} p-8`}>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-white text-opacity-80">
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-extrabold text-white">
                        ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                      </span>
                      <span className="ml-2 text-lg text-white text-opacity-80">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    
                    {billingCycle === 'annual' && (
                      <p className="mt-2 text-sm text-green-300">
                        Save {calculateSavings(plan)}% with annual billing
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className={`h-5 w-5 ${colorClasses.text} flex-shrink-0 mr-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Limitations:</h4>
                      <ul className="space-y-4">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-400">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-10">
                    <Link
                      to="/signup"
                      className={`block w-full ${colorClasses.bg} ${colorClasses.bgHover} text-white rounded-lg py-3 px-4 text-center font-medium shadow-sm hover:shadow-md transition-all`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Feature Comparison */}
        <div className="mt-24 bg-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
            <p className="mt-3 text-gray-400">
              A detailed breakdown of what's included in each plan to help you make the right choice.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-750">
                  <th scope="col" className="py-5 pl-6 pr-3 text-left text-sm font-semibold text-white sm:pl-8">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={`px-3 py-5 text-center text-sm font-semibold text-white ${
                        plan.popular ? 'bg-gray-700' : ''
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {/* Scan Analysis */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Scan Analysis Types
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Basic
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    Advanced
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Premium
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    All Types
                  </td>
                </tr>
                
                {/* Storage */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Scan Storage
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    10 Scans
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    100 Scans
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Unlimited
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Unlimited
                  </td>
                </tr>
                
                {/* Analytics */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Analytics
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Basic
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    Advanced
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Real-time
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Real-time + Custom
                  </td>
                </tr>
                
                {/* Support */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Support
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Email
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    Priority Email
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    24/7 Priority
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Dedicated Manager
                  </td>
                </tr>
                
                {/* Specialist Network */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Specialist Network
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    Basic
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Full Access
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    Full Access
                  </td>
                </tr>
                
                {/* AI Training */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Custom AI Training
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    Limited
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                
                {/* API Access */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    API Access
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                
                {/* Custom Integration */}
                <tr>
                  <th scope="row" className="py-5 pl-6 pr-3 text-left text-sm font-medium text-white sm:pl-8">
                    Custom Integration
                  </th>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300 bg-gray-750">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-3 py-5 text-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Everything you need to know about ZemedicAI pricing and plans.
            </p>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                Can I switch plans at any time?
              </h3>
              <p className="mt-2 text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will take effect immediately for upgrades, or at the end of your current billing cycle for downgrades.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                Do you offer a free trial?
              </h3>
              <p className="mt-2 text-gray-400">
                Yes, we offer a 14-day free trial of our Professional plan for new users. No credit card is required to start your trial, and you can cancel at any time before the trial ends.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                Are there any long-term contracts?
              </h3>
              <p className="mt-2 text-gray-400">
                No, all our plans are subscription-based and can be canceled at any time. We don't lock you into long-term contracts, though annual billing options are available at a discount.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                What payment methods do you accept?
              </h3>
              <p className="mt-2 text-gray-400">
                We accept major credit cards including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also offer invoice-based payment options.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white">
                Do you offer special pricing for healthcare institutions?
              </h3>
              <p className="mt-2 text-gray-400">
                Yes, we offer volume discounts for healthcare providers, clinics, and hospitals. Contact our sales team for custom pricing based on your organization's size and needs.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-24 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 py-12 px-8 md:py-16 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to transform your healthcare experience?
          </h2>
          <p className="mt-4 text-xl text-blue-200 max-w-2xl mx-auto">
            Join thousands of healthcare professionals and patients who trust ZemedicAI for accurate, AI-powered medical imaging analysis.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-white text-blue-900 hover:bg-blue-50 py-3 px-6 font-medium rounded-lg shadow-md transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 py-3 px-6 font-medium rounded-lg transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;