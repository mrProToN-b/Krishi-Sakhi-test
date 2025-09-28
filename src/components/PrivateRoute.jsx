import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple PrivateRoute component for beginners
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  
  // useEffect hook runs when component mounts to check authentication
  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If no token found, redirect to authentication page
      navigate('/auth');
    }
  }, [navigate]); // dependency array - useEffect runs when navigate changes
  
  // Check authentication before rendering
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Return null while redirecting (prevents flash of content)
    return null;
  }
  
  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;