import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PublicHeaderNav from '../../components/ui/PublicHeaderNav';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import CallToActionSection from './components/CallToActionSection';
import AuthenticationModal from '../../components/ui/AuthenticationModal';

const FeaturesOverview = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleFeatureSelect = (featureName) => {
    setSelectedFeature(featureName);
    // Could implement feature detail modal or navigation
    console.log(`Selected feature: ${featureName}`);
  };

  const handleContactUs = () => {
    // Navigate to contact page or open contact modal
    console.log('Contact us clicked');
  };

  const handleAuthenticate = (authData) => {
    console.log('Authentication successful:', authData);
    
    // Navigate based on user role
    if (authData?.user?.role === 'farmer') {
      navigate('/farmer-dashboard');
    } else if (authData?.user?.role === 'business') {
      navigate('/business-owner-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <PublicHeaderNav />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Features Grid */}
        <FeaturesGrid onFeatureSelect={handleFeatureSelect} />

        {/* Call to Action Section */}
        <CallToActionSection 
          onGetStarted={handleGetStarted}
          onContactUs={handleContactUs}
        />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KS</span>
                </div>
                <span className="font-heading font-semibold text-lg text-foreground">
                  Krishi Sakhi
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering farmers with AI-driven agricultural solutions for sustainable and profitable farming.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-foreground">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Weather Alerts</li>
                <li>Pest Detection</li>
                <li>AI Assistant</li>
                <li>Market Prices</li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Krishi Sakhi. All rights reserved. Made with ❤️ for farmers.
            </p>
          </div>
        </div>
      </footer>
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticate}
      />
    </div>
  );
};

export default FeaturesOverview;