import React, { useState } from 'react';

const DashboardSettings = ({ user }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    analysisCompleted: true,
    newMessages: true,
    appointmentReminders: true,
    systemUpdates: false,
    weeklyReports: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareDataWithDoctors: true,
    anonymousDataForResearch: true,
    publicProfile: false,
    showAnalysesPublicly: false
  });
  
  const [accountSettings, setAccountSettings] = useState({
    language: 'english',
    theme: 'dark',
    timeZone: 'UTC-5',
    dataRetention: '5years'
  });
  
  // Handle notification setting toggle
  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Handle privacy setting toggle
  const handlePrivacyChange = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Handle account setting change
  const handleAccountChange = (setting, value) => {
    setAccountSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="text-gray-400 text-sm">Customize your ZemedicAI experience</p>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-gray-400 text-sm">Receive notifications via email</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="emailNotifications" 
                checked={notificationSettings.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
                className="sr-only"
              />
              <label 
                htmlFor="emailNotifications"
                className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                  notificationSettings.emailNotifications ? 'bg-blue-600' : ''
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">SMS Notifications</h4>
              <p className="text-gray-400 text-sm">Receive notifications via text message</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="smsNotifications" 
                checked={notificationSettings.smsNotifications}
                onChange={() => handleNotificationChange('smsNotifications')}
                className="sr-only"
              />
              <label 
                htmlFor="smsNotifications"
                className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                  notificationSettings.smsNotifications ? 'bg-blue-600' : ''
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <hr className="border-gray-700" />
          
          <div className="space-y-3">
            <h4 className="text-white font-medium mb-2">Notification Types</h4>
            
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Analysis Completed</p>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="analysisCompleted" 
                  checked={notificationSettings.analysisCompleted}
                  onChange={() => handleNotificationChange('analysisCompleted')}
                  className="sr-only"
                />
                <label 
                  htmlFor="analysisCompleted"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                    notificationSettings.analysisCompleted ? 'bg-blue-600' : ''
                  }`}
                >
                  <span 
                    className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                      notificationSettings.analysisCompleted ? 'translate-x-6' : 'translate-x-0'
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-gray-300">New Messages</p>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="newMessages" 
                  checked={notificationSettings.newMessages}
                  onChange={() => handleNotificationChange('newMessages')}
                  className="sr-only"
                />
                <label 
                  htmlFor="newMessages"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                    notificationSettings.newMessages ? 'bg-blue-600' : ''
                  }`}
                >
                  <span 
                    className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                      notificationSettings.newMessages ? 'translate-x-6' : 'translate-x-0'
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Appointment Reminders</p>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="appointmentReminders" 
                  checked={notificationSettings.appointmentReminders}
                  onChange={() => handleNotificationChange('appointmentReminders')}
                  className="sr-only"
                />
                <label 
                  htmlFor="appointmentReminders"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                    notificationSettings.appointmentReminders ? 'bg-blue-600' : ''
                  }`}
                >
                  <span 
                    className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                      notificationSettings.appointmentReminders ? 'translate-x-6' : 'translate-x-0'
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-gray-300">System Updates</p>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="systemUpdates" 
                  checked={notificationSettings.systemUpdates}
                  onChange={() => handleNotificationChange('systemUpdates')}
                  className="sr-only"
                />
                <label 
                  htmlFor="systemUpdates"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                    notificationSettings.systemUpdates ? 'bg-blue-600' : ''
                  }`}
                >
                  <span 
                    className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                      notificationSettings.systemUpdates ? 'translate-x-6' : 'translate-x-0'
                    }`} 
                  />
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Weekly Health Reports</p>
              <div className="relative inline-block w-12 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="weeklyReports" 
                  checked={notificationSettings.weeklyReports}
                  onChange={() => handleNotificationChange('weeklyReports')}
                  className="sr-only"
                />
                <label 
                  htmlFor="weeklyReports"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                    notificationSettings.weeklyReports ? 'bg-blue-600' : ''
                  }`}
                >
                  <span 
                    className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                      notificationSettings.weeklyReports ? 'translate-x-6' : 'translate-x-0'
                    }`} 
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy & Data Settings */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Privacy & Data Settings</h3>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Share Data with Doctors</h4>
              <p className="text-gray-400 text-sm">Allow your doctors to access your scans and analyses</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="shareDataWithDoctors" 
                checked={privacySettings.shareDataWithDoctors}
                onChange={() => handlePrivacyChange('shareDataWithDoctors')}
                className="sr-only"
              />
              <label 
                htmlFor="shareDataWithDoctors"
                className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                  privacySettings.shareDataWithDoctors ? 'bg-blue-600' : ''
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    privacySettings.shareDataWithDoctors ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Contribute Anonymized Data for Research</h4>
              <p className="text-gray-400 text-sm">Help improve our AI models with anonymized scan data</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="anonymousDataForResearch" 
                checked={privacySettings.anonymousDataForResearch}
                onChange={() => handlePrivacyChange('anonymousDataForResearch')}
                className="sr-only"
              />
              <label 
                htmlFor="anonymousDataForResearch"
                className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                  privacySettings.anonymousDataForResearch ? 'bg-blue-600' : ''
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    privacySettings.anonymousDataForResearch ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Public Profile</h4>
              <p className="text-gray-400 text-sm">Make your profile visible to other ZemedicAI users</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="publicProfile" 
                checked={privacySettings.publicProfile}
                onChange={() => handlePrivacyChange('publicProfile')}
                className="sr-only"
              />
              <label 
                htmlFor="publicProfile"
                className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                  privacySettings.publicProfile ? 'bg-blue-600' : ''
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    privacySettings.publicProfile ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Show Analyses Publicly</h4>
              <p className="text-gray-400 text-sm">Allow your analyses to be viewed by other users (anonymized)</p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input 
                type="checkbox" 
                id="showAnalysesPublicly" 
                checked={privacySettings.showAnalysesPublicly}
                onChange={() => handlePrivacyChange('showAnalysesPublicly')}
                className="sr-only"
              />
              <label 
                htmlFor="showAnalysesPublicly"
                className={`block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${
                  privacySettings.showAnalysesPublicly ? 'bg-blue-600' : ''
                }`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    privacySettings.showAnalysesPublicly ? 'translate-x-6' : 'translate-x-0'
                  }`} 
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Account Settings</h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-white font-medium mb-2">
              Language
            </label>
            <select 
              value={accountSettings.language}
              onChange={(e) => handleAccountChange('language', e.target.value)}
              className="w-full md:w-1/2 bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
              <option value="arabic">Arabic</option>
              <option value="swahili">Swahili</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Theme
            </label>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleAccountChange('theme', 'dark')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  accountSettings.theme === 'dark' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Dark
              </button>
              <button 
                onClick={() => handleAccountChange('theme', 'light')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  accountSettings.theme === 'light' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Light
              </button>
              <button 
                onClick={() => handleAccountChange('theme', 'system')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  accountSettings.theme === 'system' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                System Default
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Time Zone
            </label>
            <select 
              value={accountSettings.timeZone}
              onChange={(e) => handleAccountChange('timeZone', e.target.value)}
              className="w-full md:w-1/2 bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="UTC-12">UTC-12 (Baker Island Time)</option>
              <option value="UTC-8">UTC-8 (Pacific Standard Time)</option>
              <option value="UTC-7">UTC-7 (Mountain Standard Time)</option>
              <option value="UTC-6">UTC-6 (Central Standard Time)</option>
              <option value="UTC-5">UTC-5 (Eastern Standard Time)</option>
              <option value="UTC-4">UTC-4 (Atlantic Standard Time)</option>
              <option value="UTC+0">UTC+0 (Greenwich Mean Time)</option>
              <option value="UTC+1">UTC+1 (Central European Time)</option>
              <option value="UTC+2">UTC+2 (Eastern European Time)</option>
              <option value="UTC+3">UTC+3 (East Africa Time)</option>
              <option value="UTC+5:30">UTC+5:30 (Indian Standard Time)</option>
              <option value="UTC+8">UTC+8 (China Standard Time)</option>
              <option value="UTC+9">UTC+9 (Japan Standard Time)</option>
              <option value="UTC+10">UTC+10 (Australian Eastern Standard Time)</option>
              <option value="UTC+12">UTC+12 (New Zealand Standard Time)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Data Retention Period
            </label>
            <select 
              value={accountSettings.dataRetention}
              onChange={(e) => handleAccountChange('dataRetention', e.target.value)}
              className="w-full md:w-1/2 bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1year">1 Year</option>
              <option value="2years">2 Years</option>
              <option value="5years">5 Years</option>
              <option value="10years">10 Years</option>
              <option value="indefinite">Indefinite</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div className="bg-red-900 bg-opacity-20 rounded-xl p-6 border border-red-800">
        <h3 className="text-lg font-medium text-red-300 mb-4">Danger Zone</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium">Export All Your Data</h4>
            <p className="text-gray-400 text-sm mb-2">Download a copy of all your medical data and analyses</p>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
              Export Data
            </button>
          </div>
          
          <div className="pt-4 border-t border-red-800">
            <h4 className="text-white font-medium">Delete Account</h4>
            <p className="text-gray-400 text-sm mb-2">Permanently delete your account and all associated data</p>
            <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      
      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default DashboardSettings;