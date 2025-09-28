import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Authentication page using functional component with hooks
const Auth = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  
  // useState hooks for managing form state - controlled components
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Form fields managed by useState
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    location: '',
    farmSize: '',
    cropType: '',
    soilType: '',
    sowingTime: '',
    userType: 'farmer' // farmer or business-owner
  });
  const [errors, setErrors] = useState({});
  
  // Controlled component event handler for form inputs
  const handleChange = (e) => {
    const { name, value } = e?.target;
    // Update form data using useState
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Simple form validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      // Additional validation for registration
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData?.phone) {
        newErrors.phone = 'Phone number is required';
      }
      
      if (formData?.userType === 'farmer') {
        if (!formData?.farmSize) {
          newErrors.farmSize = 'Farm size is required';
        }
        if (!formData?.cropType) {
          newErrors.cropType = 'Crop type is required';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };
  
  // Form submit handler with async/await pattern
  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call with async/await
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful authentication
      const token = 'demo-token-xyz'; // In real app, this comes from API
      const userRole = formData?.userType;
      const userName = formData?.fullName || 'User';
      
      // Store authentication data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userName', userName);
      
      // Navigate to appropriate dashboard based on user role
      if (userRole === 'farmer') {
        navigate('/dashboard/farmer');
      } else {
        navigate('/dashboard/business');
      }
      
    } catch (error) {
      // Handle API errors
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Simple toggle function for login/register mode
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      location: '',
      farmSize: '',
      cropType: '',
      soilType: '',
      sowingTime: '',
      userType: 'farmer'
    });
    setErrors({});
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Auth Form Card */}
          <motion.div 
            className="bg-white rounded-lg shadow-medium p-8 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join Krishi Sakhi'}
              </h1>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your farming account'}
              </p>
            </div>
            
            {/* Form with controlled components */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection (Registration only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="farmer"
                        checked={formData?.userType === 'farmer'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-md text-center transition-colors ${
                        formData?.userType === 'farmer' ?'border-green-600 bg-green-50 text-green-800' :'border-gray-200 hover:border-gray-300'
                      }`}>
                        <span className="block text-sm font-medium">Farmer</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="business-owner"
                        checked={formData?.userType === 'business-owner'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-md text-center transition-colors ${
                        formData?.userType === 'business-owner' ?'border-green-600 bg-green-50 text-green-800' :'border-gray-200 hover:border-gray-300'
                      }`}>
                        <span className="block text-sm font-medium">Business</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Full Name (Registration only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData?.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {errors?.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors?.fullName}</p>
                  )}
                </div>
              )}
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
                {errors?.email && (
                  <p className="mt-1 text-sm text-red-600">{errors?.email}</p>
                )}
              </div>
              
              {/* Phone (Registration only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                  {errors?.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors?.phone}</p>
                  )}
                </div>
              )}


              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Location
                </label>
                <input
                  type="location"
                  id="location"
                  name="location"
                  value={formData?.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your detailed farm location"
                  required
                />
                {errors?.location && (
                  <p className="mt-1 text-sm text-red-600">{errors?.location}</p>
                )}
              </div>
              
              
              {/* Farmer-specific fields */}
              {!isLogin && formData?.userType === 'farmer' && (
                <>
                  <div>
                    <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Farm Size (acres)
                    </label>
                    <input
                      type="number"
                      id="farmSize"
                      name="farmSize"
                      value={formData?.farmSize}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter farm size"
                    />
                    {errors?.farmSize && (
                      <p className="mt-1 text-sm text-red-600">{errors?.farmSize}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Crop Type
                    </label>
                    <select
                      id="cropType"
                      name="cropType"
                      value={formData?.cropType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select crop type</option>
                      <option value="rice">Rice</option>
                      <option value="wheat">Wheat</option>
                      <option value="corn">Corn</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="spices">Spices</option>
                    </select>
                    {errors?.cropType && (
                      <p className="mt-1 text-sm text-red-600">{errors?.cropType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                      Soil Type
                    </label>
                    <select
                      id="soilType"
                      name="soilType"
                      value={formData?.soilType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select soil type</option>
                      <option value="clay">Clay</option>
                      <option value="sandy">Sandy</option>
                      <option value="loamy">Loamy</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="sowingTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Sowing Time
                    </label>
                    <select
                      id="sowingTime"
                      name="sowingTime"
                      value={formData?.sowingTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select sowing time</option>
                      <option value="kharif">Kharif (Monsoon)</option>
                      <option value="rabi">Rabi (Winter)</option>
                      <option value="zaid">Zaid (Summer)</option>
                      <option value="year-round">Year Round</option>
                    </select>
                  </div>
                </>
              )}
              
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData?.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                {errors?.password && (
                  <p className="mt-1 text-sm text-red-600">{errors?.password}</p>
                )}
              </div>
              
              {/* Confirm Password (Registration only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData?.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  {errors?.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors?.confirmPassword}</p>
                  )}
                </div>
              )}
              
              {/* General Error */}
              {errors?.general && (
                <div className="text-center">
                  <p className="text-sm text-red-600">{errors?.general}</p>
                </div>
              )}
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' :'bg-green-600 hover:bg-green-700 text-white'
                }`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </motion.button>
            </form>
            
            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-green-600 hover:text-green-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;