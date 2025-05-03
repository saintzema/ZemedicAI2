import React, { useState } from 'react';

const DashboardProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    bio: user?.bio || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zip_code || '',
    country: user?.country || '',
    emergencyContact: user?.emergency_contact || '',
    emergencyPhone: user?.emergency_phone || '',
    allergies: user?.allergies || '',
    medicalConditions: user?.medical_conditions || '',
    medications: user?.medications || ''
  });
  
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Here you would typically send data to an API
      console.log('Profile data saved:', formData);
      setSaving(false);
      setEditMode(false);
    }, 1000);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const isDoctor = user?.role === 'doctor';
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">My Profile</h2>
          <p className="text-gray-400 text-sm">Manage your personal information and medical data</p>
        </div>
        
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button 
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center space-x-1 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">
              {isDoctor ? 'Dr. ' : ''}{formData.firstName} {formData.lastName}
            </h3>
            <p className="text-blue-200">{isDoctor ? 'Doctor' : 'Patient'}</p>
            <p className="text-blue-300 mt-1">{formData.email}</p>
            {formData.dob && (
              <p className="text-blue-300 mt-1">Born {formatDate(formData.dob)}</p>
            )}
          </div>
          
          {isDoctor && (
            <div className="md:ml-auto bg-blue-900 bg-opacity-50 rounded-lg px-4 py-2">
              <p className="text-white font-medium">Medical License</p>
              <p className="text-blue-200">ML-12345678</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                First Name
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.firstName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Last Name
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.lastName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              {editMode ? (
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone Number
              </label>
              {editMode ? (
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.phone || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Date of Birth
              </label>
              {editMode ? (
                <input 
                  type="date" 
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.dob ? formatDate(formData.dob) : 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Gender
              </label>
              {editMode ? (
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              ) : (
                <p className="text-white capitalize">{formData.gender || 'Not provided'}</p>
              )}
            </div>
          </div>
          
          {editMode && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us a bit about yourself..."
              ></textarea>
            </div>
          )}
          
          {!editMode && formData.bio && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Bio</h4>
              <p className="text-white">{formData.bio}</p>
            </div>
          )}
        </div>
        
        {/* Address */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Street Address
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.address || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                City
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.city || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                State / Province
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.state || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                ZIP / Postal Code
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.zipCode || 'Not provided'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Country
              </label>
              {editMode ? (
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-white">{formData.country || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Medical Information - Only show for patients */}
        {!isDoctor && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Medical Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Emergency Contact Name
                </label>
                {editMode ? (
                  <input 
                    type="text" 
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.emergencyContact || 'Not provided'}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Emergency Contact Phone
                </label>
                {editMode ? (
                  <input 
                    type="tel" 
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.emergencyPhone || 'Not provided'}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Allergies
                </label>
                {editMode ? (
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List any allergies..."
                  ></textarea>
                ) : (
                  <p className="text-white">{formData.allergies || 'None reported'}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Medical Conditions
                </label>
                {editMode ? (
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List any medical conditions..."
                  ></textarea>
                ) : (
                  <p className="text-white">{formData.medicalConditions || 'None reported'}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Medications
                </label>
                {editMode ? (
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List any medications..."
                  ></textarea>
                ) : (
                  <p className="text-white">{formData.medications || 'None reported'}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Professional Information - Only show for doctors */}
        {isDoctor && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Specialization
                </label>
                <p className="text-white">Radiology</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Hospital / Clinic
                </label>
                <p className="text-white">Metro General Hospital</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Medical License Number
                </label>
                <p className="text-white">ML-12345678</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Years of Experience
                </label>
                <p className="text-white">12 years</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Professional Memberships
                </label>
                <p className="text-white">American Medical Association, Radiological Society of North America</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Account Security */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-4">Account Security</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-medium">Change Password</h4>
              <p className="text-gray-400 text-sm mb-3">Update your password to maintain account security</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors">
                Change Password
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white font-medium">Two-Factor Authentication</h4>
              <p className="text-gray-400 text-sm mb-3">Enable two-factor authentication for additional security</p>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
                Enable 2FA
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white font-medium">Login Sessions</h4>
              <p className="text-gray-400 text-sm mb-3">Manage your active sessions and devices</p>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors">
                View Sessions
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;