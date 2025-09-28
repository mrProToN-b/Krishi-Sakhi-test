import React, { useState } from 'react';

import PublicHeaderNav from '../../components/ui/PublicHeaderNav';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import FloatingAIAssistant from '../../components/ui/FloatingAIAssistant';
import HeroSection from './components/HeroSection';
import FeaturesPreview from './components/FeaturesPreview';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Icon from '../../components/AppIcon';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('farmer');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const handleOpenAuth = (userType = 'farmer') => {
    setAuthMode(userType);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthenticate = (authData) => {
    console.log('Authentication successful:', authData);
    // Handle successful authentication
    // Redirect to appropriate dashboard based on user role
    if (authData?.user?.role === 'farmer') {
      window.location.href = '/farmer-dashboard';
    } else {
      window.location.href = '/business-owner-dashboard';
    }
  };

  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <PublicHeaderNav />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection onOpenAuth={handleOpenAuth} />

        {/* Features Preview */}
        <FeaturesPreview />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection onOpenAuth={handleOpenAuth} />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Sprout" size={20} color="white" />
                </div>
                <span className="font-heading font-semibold text-xl text-foreground">
                  Krishi Sakhi
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering farmers and agricultural businesses with AI-powered insights, 
                weather alerts, and smart farming solutions across Kerala.
              </p>
              <div className="flex space-x-4">
                <Icon name="Facebook" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Twitter" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Instagram" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Youtube" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/features-overview" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="/ai-chat-assistant" className="text-muted-foreground hover:text-primary transition-colors">AI Assistant</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Mail" size={16} />
                  <span>support@krishisakhi.com</span>
                </li>
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Phone" size={16} />
                  <span>+91 9876543210</span>
                </li>
                <li className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="MapPin" size={16} />
                  <span>Kerala, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date()?.getFullYear()} Krishi Sakhi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuth}
        onAuthenticate={handleAuthenticate}
        initialMode={authMode === 'farmer' ? 'signup' : 'signup'}
        initialRole={authMode}
      />
      {/* Floating AI Assistant */}
      <FloatingAIAssistant
        isOpen={isAIAssistantOpen}
        onToggle={toggleAIAssistant}
      />
    </div>
  );
};

export default LandingPage;