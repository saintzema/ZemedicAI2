import React, { useState } from 'react';

const DashboardSubscription = ({ user }) => {
  const [currentPlan, setCurrentPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // Define subscription plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: { monthly: 5, annual: 50 },
      description: 'Essential features for individuals starting their health monitoring journey',
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
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 19, annual: 190 },
      description: 'Advanced features for health-conscious individuals and small practices',
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
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 49, annual: 490 },
      description: 'Comprehensive solution for medical professionals and clinics',
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
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 99, annual: 990 },
      description: 'Tailored solutions for hospitals and large healthcare organizations',
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
      limitations: []
    }
  ];
  
  // Calculate savings percentage for annual billing
  const calculateSavings = (plan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const annualTotal = plan.price.annual;
    return Math.round(((monthlyTotal - annualTotal) / monthlyTotal) * 100);
  };
  
  // Handle plan selection
  const handleSelectPlan = (planId) => {
    // In a real app, you would call an API to update the subscription
    console.log(`Selected plan: ${planId} with ${billingCycle} billing`);
    setCurrentPlan(planId);
  };
  
  // Get the user's current plan
  const userPlan = plans.find(plan => plan.id === currentPlan);
  
  // Format price with currency
  const formatPrice = (price) => {
    return `$${price}`;
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Subscription</h2>
        <p className="text-gray-400 text-sm">Manage your ZemedicAI subscription plan</p>
      </div>
      
      {/* Current Subscription */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Current Plan: {userPlan.name}</h3>
            <p className="text-blue-200 max-w-xl">
              {userPlan.description}
            </p>
            
            <div className="mt-4 flex items-center text-white">
              <span className="text-2xl font-bold">{formatPrice(userPlan.price[billingCycle])}</span>
              <span className="ml-1 text-blue-200">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            
            <p className="text-blue-300 text-sm mt-1">
              Next billing date: July 15, 2023
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-col space-y-2">
            <button className="px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 font-medium rounded-md transition-colors">
              Manage Payment Method
            </button>
            <button className="px-4 py-2 bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors">
              View Billing History
            </button>
          </div>
        </div>
      </div>
      
      {/* Billing Cycle Toggle */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Billing Cycle</h3>
        
        <div className="flex items-center justify-center space-x-4">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium ${
              billingCycle === 'monthly' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Monthly
          </button>
          
          <button 
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-md text-sm font-medium flex items-center ${
              billingCycle === 'annual' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Annual
            <span className="ml-2 bg-green-900 text-green-300 text-xs rounded-full px-2 py-0.5">
              Save 15-20%
            </span>
          </button>
        </div>
      </div>
      
      {/* Subscription Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Available Plans</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-gray-800 rounded-xl border ${
                plan.id === currentPlan 
                  ? 'border-blue-500' 
                  : 'border-gray-700'
              } relative overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                    POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h4 className="text-xl font-semibold text-white mb-1">{plan.name}</h4>
                <p className="text-gray-400 text-sm mb-4 h-12">{plan.description}</p>
                
                <div className="mb-5">
                  <span className="text-3xl font-bold text-white">{formatPrice(plan.price[billingCycle])}</span>
                  <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  
                  {billingCycle === 'annual' && (
                    <div className="text-green-400 text-sm font-medium mt-1">
                      Save {calculateSavings(plan)}% with annual billing
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-2 rounded-md text-sm font-medium mb-6 ${
                    plan.id === currentPlan 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {plan.id === currentPlan ? 'Current Plan' : 'Select Plan'}
                </button>
                
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-white">Includes:</h5>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg className="h-5 w-5 text-green-500 flex-shrink-0 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h5 className="text-sm font-medium text-white mt-4">Limitations:</h5>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <svg className="h-5 w-5 text-red-500 flex-shrink-0 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-400">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Need Help Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-white mb-2">Need Help Choosing?</h3>
            <p className="text-gray-400 max-w-xl">
              Our team can help you select the right plan for your specific healthcare needs. Contact us for a personalized recommendation.
            </p>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
      
      {/* Cancellation Section */}
      <div className="bg-red-900 bg-opacity-20 rounded-xl p-6 border border-red-800">
        <h3 className="text-lg font-medium text-red-300 mb-4">Cancel Subscription</h3>
        <p className="text-gray-400 mb-4">
          If you cancel your subscription, you'll still have access to your current plan features until the end of your billing period. After that, your account will be downgraded to the free plan with limited features.
        </p>
        <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors">
          Cancel Subscription
        </button>
      </div>
    </div>
  );
};

export default DashboardSubscription;