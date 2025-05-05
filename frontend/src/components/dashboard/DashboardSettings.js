import React, { useState } from 'react';

const DashboardSettings = ({ user }) => {
  // Settings state
  const [activeTab, setActiveTab] = useState('notifications');
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newAnalysis: true,
      findings: true,
      appointments: true,
      systemUpdates: false,
      marketing: false
    },
    sms: {
      newAnalysis: false,
      findings: true,
      appointments: true,
      systemUpdates: false,
      marketing: false
    },
    inApp: {
      newAnalysis: true,
      findings: true,
      appointments: true,
      systemUpdates: true,
      marketing: false
    }
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareData: {
      withDoctors: true,
      withResearchers: false,
      withPartners: false
    },
    dataRetention: '1year', // '6months', '1year', '2years', 'indefinite'
    anonymizeData: true,
    allowAnalytics: true
  });
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    language: 'en', // 'en', 'es', 'fr', etc.
    theme: 'dark', // 'light', 'dark', 'system'
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    twoFactorAuth: false
  });
  
  // Handling notification settings change
  const handleNotificationChange = (channel, setting, value) => {
    setNotificationSettings({
      ...notificationSettings,
      [channel]: {
        ...notificationSettings[channel],
        [setting]: value
      }
    });
  };
  
  // Handling privacy settings change
  const handlePrivacyChange = (section, setting, value) => {
    if (section) {
      setPrivacySettings({
        ...privacySettings,
        [section]: {
          ...privacySettings[section],
          [setting]: value
        }
      });
    } else {
      setPrivacySettings({
        ...privacySettings,
        [setting]: value
      });
    }
  };
  
  // Handling account settings change
  const handleAccountChange = (setting, value) => {
    setAccountSettings({
      ...accountSettings,
      [setting]: value
    });
  };
  
  // Save settings
  const saveSettings = (type) => {
    // In a real application, this would send the settings to the backend
    console.log(`Saving ${type} settings:`, 
      type === 'notifications' ? notificationSettings : 
      type === 'privacy' ? privacySettings : 
      accountSettings
    );
    
    // Show success message
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} settings saved successfully!`);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      
      {/* Settings Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <div className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'privacy'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'account'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Account
          </button>
        </div>
      </div>
      
      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Notification Settings</h2>
            <p className="mt-1 text-sm text-gray-400">
              Manage how and when you receive notifications from ZemedicAI.
            </p>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Notification Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      SMS
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      In-App
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">New Analysis Results</div>
                      <div className="text-xs text-gray-400">When a new scan analysis is completed</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email.newAnalysis}
                        onChange={(e) => handleNotificationChange('email', 'newAnalysis', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.sms.newAnalysis}
                        onChange={(e) => handleNotificationChange('sms', 'newAnalysis', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.inApp.newAnalysis}
                        onChange={(e) => handleNotificationChange('inApp', 'newAnalysis', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">Critical Findings</div>
                      <div className="text-xs text-gray-400">When critical findings are detected in your scans</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email.findings}
                        onChange={(e) => handleNotificationChange('email', 'findings', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.sms.findings}
                        onChange={(e) => handleNotificationChange('sms', 'findings', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.inApp.findings}
                        onChange={(e) => handleNotificationChange('inApp', 'findings', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">Appointment Reminders</div>
                      <div className="text-xs text-gray-400">Reminders for upcoming appointments</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email.appointments}
                        onChange={(e) => handleNotificationChange('email', 'appointments', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.sms.appointments}
                        onChange={(e) => handleNotificationChange('sms', 'appointments', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.inApp.appointments}
                        onChange={(e) => handleNotificationChange('inApp', 'appointments', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">System Updates</div>
                      <div className="text-xs text-gray-400">Information about ZemedicAI updates and maintenance</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email.systemUpdates}
                        onChange={(e) => handleNotificationChange('email', 'systemUpdates', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.sms.systemUpdates}
                        onChange={(e) => handleNotificationChange('sms', 'systemUpdates', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.inApp.systemUpdates}
                        onChange={(e) => handleNotificationChange('inApp', 'systemUpdates', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">Marketing & Promotions</div>
                      <div className="text-xs text-gray-400">News, offers, and product updates</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email.marketing}
                        onChange={(e) => handleNotificationChange('email', 'marketing', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.sms.marketing}
                        onChange={(e) => handleNotificationChange('sms', 'marketing', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings.inApp.marketing}
                        onChange={(e) => handleNotificationChange('inApp', 'marketing', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => saveSettings('notifications')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Save Notification Settings
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Privacy Settings */}
      {activeTab === 'privacy' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Privacy Settings</h2>
            <p className="mt-1 text-sm text-gray-400">
              Control how your data is used, shared, and stored within ZemedicAI.
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-white mb-3">Data Sharing</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="withDoctors"
                        type="checkbox"
                        checked={privacySettings.shareData.withDoctors}
                        onChange={(e) => handlePrivacyChange('shareData', 'withDoctors', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="withDoctors" className="font-medium text-white">Share with healthcare providers</label>
                      <p className="text-gray-400">Allow your connected healthcare providers to access your scan data and analyses</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="withResearchers"
                        type="checkbox"
                        checked={privacySettings.shareData.withResearchers}
                        onChange={(e) => handlePrivacyChange('shareData', 'withResearchers', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="withResearchers" className="font-medium text-white">Share with medical researchers</label>
                      <p className="text-gray-400">Contribute your anonymized scan data to medical research to help improve AI diagnostics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="withPartners"
                        type="checkbox"
                        checked={privacySettings.shareData.withPartners}
                        onChange={(e) => handlePrivacyChange('shareData', 'withPartners', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="withPartners" className="font-medium text-white">Share with technology partners</label>
                      <p className="text-gray-400">Allow anonymized data sharing with our technology partners for service improvement</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-md font-medium text-white mb-3">Data Retention</h3>
                <div className="mt-2">
                  <label htmlFor="dataRetention" className="block text-sm font-medium text-gray-400 mb-1">
                    How long should we store your data?
                  </label>
                  <select
                    id="dataRetention"
                    value={privacySettings.dataRetention}
                    onChange={(e) => handlePrivacyChange(null, 'dataRetention', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="indefinite">Indefinitely (Until Account Deletion)</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    After this period, your data will be automatically deleted unless required by law
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-md font-medium text-white mb-3">Additional Privacy Options</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="anonymizeData"
                        type="checkbox"
                        checked={privacySettings.anonymizeData}
                        onChange={(e) => handlePrivacyChange(null, 'anonymizeData', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="anonymizeData" className="font-medium text-white">Anonymize data</label>
                      <p className="text-gray-400">Remove personally identifiable information from your data when used for system improvements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="allowAnalytics"
                        type="checkbox"
                        checked={privacySettings.allowAnalytics}
                        onChange={(e) => handlePrivacyChange(null, 'allowAnalytics', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="allowAnalytics" className="font-medium text-white">Allow analytics</label>
                      <p className="text-gray-400">Allow us to collect usage data to improve your experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => saveSettings('privacy')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Save Privacy Settings
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Account Settings */}
      {activeTab === 'account' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Account Settings</h2>
            <p className="mt-1 text-sm text-gray-400">
              Manage your account preferences and security settings.
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-white mb-3">Interface Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-1">
                      Language
                    </label>
                    <select
                      id="language"
                      value={accountSettings.language}
                      onChange={(e) => handleAccountChange('language', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-400 mb-1">
                      Theme
                    </label>
                    <select
                      id="theme"
                      value={accountSettings.theme}
                      onChange={(e) => handleAccountChange('theme', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-400 mb-1">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      value={accountSettings.timezone}
                      onChange={(e) => handleAccountChange('timezone', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                      <option value="Australia/Sydney">Sydney</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-md font-medium text-white mb-3">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="twoFactorAuth"
                        type="checkbox"
                        checked={accountSettings.twoFactorAuth}
                        onChange={(e) => handleAccountChange('twoFactorAuth', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="twoFactorAuth" className="font-medium text-white">Enable Two-Factor Authentication</label>
                      <p className="text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => alert('Password change functionality would be implemented here')}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Change Password
                    </button>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => alert('Session management functionality would be implemented here')}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Manage Active Sessions
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-md font-medium text-white mb-3">Account Management</h3>
                <div className="space-y-4">
                  <div>
                    <button
                      onClick={() => alert('Account data export functionality would be implemented here')}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Export Account Data
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      Download a copy of your personal data
                    </p>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => alert('Account deletion functionality would be implemented here')}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Delete Account
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => saveSettings('account')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Save Account Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSettings;
