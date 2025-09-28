import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import FloatingAIAssistant from '../../components/ui/FloatingAIAssistant';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import dashboard components
import DailyTipsCard from './components/DailyTipsCard';
import WeatherForecastCard from './components/WeatherForecastCard';
import MarketPricesCard from './components/MarketPricesCard';
import FarmActivityCard from './components/FarmActivityCard';
import MentorshipCard from './components/MentorshipCard';
import SoilTestCard from './components/SoilTestCard';
import QuickActionsCard from './components/QuickActionsCard';

const FarmerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const farmerData = {
    name: "Ravi Kumar",
    location: "Kochi, Kerala",
    farmSize: "5.2 acres",
    primaryCrops: ["Tomato", "Onion", "Cabbage"],
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  };

  const dashboardStats = [
    {
      label: "Active Crops",
      value: "8",
      change: "+2",
      trend: "up",
      icon: "Wheat",
      color: "text-success"
    },
    {
      label: "This Month Revenue",
      value: "₹45,200",
      change: "+12%",
      trend: "up", 
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      label: "Water Usage",
      value: "2,340L",
      change: "-8%",
      trend: "down",
      icon: "Droplets",
      color: "text-primary"
    },
    {
      label: "Pending Tasks",
      value: "6",
      change: "-2",
      trend: "down",
      icon: "CheckCircle",
      color: "text-warning"
    }
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleAIAssistant = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <Helmet>
        <title>Farmer Dashboard - Krishi Sakhi</title>
        <meta name="description" content="Comprehensive farming dashboard with weather updates, market prices, and AI-powered agricultural guidance" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <DashboardSidebar 
          userRole="farmer"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } pb-20 lg:pb-0`}>
          {/* Header */}
          <header className="bg-card border-b border-border shadow-soft px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                  aria-label="Toggle sidebar"
                >
                  <Icon name="Menu" size={20} />
                </button>

                {/* Welcome Message */}
                <div>
                  <h1 className="font-heading font-semibold text-xl text-foreground">
                    {getGreeting()}, {farmerData?.name}!
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {farmerData?.location} • {farmerData?.farmSize} • {currentTime?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" iconName="Bell">
                  <span className="hidden sm:inline">Notifications</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <img 
                    src={farmerData?.avatar} 
                    alt={farmerData?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-foreground">
                    {farmerData?.name}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Stats */}
          <div className="px-4 lg:px-6 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {dashboardStats?.map((stat, index) => (
                <div key={index} className="bg-card rounded-xl border border-border shadow-soft p-4 hover:shadow-medium transition-shadow duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat?.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
                      <div className={`flex items-center space-x-1 text-xs mt-1 ${stat?.color}`}>
                        <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                        <span>{stat?.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat?.color === 'text-success' ? 'bg-success/10' :
                      stat?.color === 'text-warning' ? 'bg-warning/10' :
                      stat?.color === 'text-primary' ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon name={stat?.icon} size={20} className={stat?.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="lg:col-span-1">
                <DailyTipsCard />
              </div>
              <div className="lg:col-span-1">
                <WeatherForecastCard />
              </div>
              <div className="lg:col-span-1 xl:row-span-2">
                <QuickActionsCard />
              </div>

              {/* Row 2 */}
              <div className="lg:col-span-1">
                <MarketPricesCard />
              </div>
              <div className="lg:col-span-1">
                <SoilTestCard />
              </div>

              {/* Row 3 */}
              <div className="lg:col-span-2 xl:col-span-2">
                <FarmActivityCard />
              </div>
              <div className="lg:col-span-2 xl:col-span-1">
                <MentorshipCard />
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Farm Overview */}
              <div className="bg-card rounded-xl border border-border shadow-soft p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Farm Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Farm Area</span>
                    <span className="text-sm font-medium text-foreground">{farmerData?.farmSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Primary Crops</span>
                    <div className="flex space-x-1">
                      {farmerData?.primaryCrops?.map((crop, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Farming Experience</span>
                    <span className="text-sm font-medium text-foreground">8 years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Farming Method</span>
                    <span className="text-sm font-medium text-foreground">Organic</span>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-card rounded-xl border border-border shadow-soft p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Award" size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Best Organic Farmer</p>
                      <p className="text-xs text-muted-foreground">District Agriculture Office - 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">20% Yield Increase</p>
                      <p className="text-xs text-muted-foreground">Compared to last season</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Droplets" size={16} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Water Conservation</p>
                      <p className="text-xs text-muted-foreground">30% reduction in water usage</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <FloatingAIAssistant 
          isOpen={aiAssistantOpen}
          onToggle={toggleAIAssistant}
        />
      </div>
    </>
  );
};

export default FarmerDashboard;