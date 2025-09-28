import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const AuthenticationModal = ({ isOpen = false, onClose, onAuthenticate }) => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [userRole, setUserRole] = useState('farmer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'farmer', label: 'Farmer', description: 'Individual farmer seeking agricultural guidance' },
    { value: 'business', label: 'Business Owner', description: 'Agricultural service provider or business' },
  ];

  const locationOptions = [
    { value: 'kerala', label: 'Kerala' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamilnadu', label: 'Tamil Nadu' },
    { value: 'andhra', label: 'Andhra Pradesh' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

    if (mode === 'signup') {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.phone) {
        newErrors.phone = 'Phone number is required';
      }
      if (!formData?.location) {
        newErrors.location = 'Location is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticate?.({
        user: {
          email: formData?.email,
          name: formData?.fullName || 'User',
          role: userRole,
        },
        mode,
      });
      onClose();
    }, 1500);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      location: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-xl shadow-strong border border-border animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Sprout" size={20} color="white" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg text-foreground">
                {mode === 'signin' ? 'Welcome Back' : 'Join Krishi Sakhi'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'signin' ? 'Sign in to your account' : 'Create your farming account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role Selection for Signup */}
          {mode === 'signup' && (
            <Select
              label="I am a"
              options={roleOptions}
              value={userRole}
              onChange={setUserRole}
              required
            />
          )}

          {/* Full Name for Signup */}
          {mode === 'signup' && (
            <Input
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData?.fullName}
              onChange={handleInputChange}
              error={errors?.fullName}
              required
            />
          )}

          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          {/* Phone for Signup */}
          {mode === 'signup' && (
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              required
            />
          )}

          {/* Location for Signup */}
          {mode === 'signup' && (
            <Select
              label="Location"
              options={locationOptions}
              value={formData?.location}
              onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
              placeholder="Select your state"
              error={errors?.location}
              required
            />
          )}

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />

          {/* Confirm Password for Signup */}
          {mode === 'signup' && (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName={mode === 'signin' ? 'LogIn' : 'UserPlus'}
            iconPosition="left"
            className="mt-6"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>

          {/* Toggle Mode */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-primary hover:text-primary/80 font-medium transition-colors duration-150"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationModal;