import React, { useState } from 'react';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import FloatingAIAssistant from '../../components/ui/FloatingAIAssistant';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all dashboard components
import MetricsCard from './components/MetricsCard';
import RecentInquiries from './components/RecentInquiries';
import InventoryOverview from './components/InventoryOverview';
import ServiceBookings from './components/ServiceBookings';
import StorageFacilities from './components/StorageFacilities';
import QuickActions from './components/QuickActions';
import RevenueChart from './components/RevenueChart';

const BusinessOwnerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleAIAssistant = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };

  // Mock metrics data
  const metricsData = [
    {
      title: "Monthly Revenue",
      value: "₹85,000",
      change: "+12%",
      changeType: "increase",
      icon: "IndianRupee",
      color: "success"
    },
    {
      title: "Active Orders",
      value: "24",
      change: "+5",
      changeType: "increase",
      icon: "ShoppingCart",
      color: "primary"
    },
    {
      title: "Customer Inquiries",
      value: "18",
      change: "+8",
      changeType: "increase",
      icon: "MessageSquare",
      color: "warning"
    },
    {
      title: "Storage Occupancy",
      value: "78%",
      change: "+3%",
      changeType: "increase",
      icon: "Warehouse",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        userRole="business"
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pb-20 lg:pb-0`}>
        {/* Header */}
        <header className="bg-card border-b border-border shadow-soft sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                aria-label="Toggle sidebar"
              >
                <Icon name="Menu" size={20} />
              </button>
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">Business Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your agricultural business</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Welcome back, Business Owner!
                </h2>
                <p className="text-muted-foreground mb-4">
                  Here's what's happening with your agricultural business today.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-foreground">
                      {new Date()?.toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-foreground">Kerala, India</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Store" size={40} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="xl:col-span-2 space-y-6">
              {/* Revenue Chart */}
              <RevenueChart />
              
              {/* Recent Inquiries */}
              <RecentInquiries />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Service Bookings */}
              <ServiceBookings />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Inventory Overview */}
            <InventoryOverview />
            
            {/* Storage Facilities */}
            <StorageFacilities />
          </div>

          {/* Business Tips Section */}
          <div className="bg-card rounded-lg border border-border shadow-soft p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Lightbulb" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground">Business Tips</h3>
                <p className="text-sm text-muted-foreground">Recommendations to grow your business</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <Icon name="TrendingUp" size={20} className="text-primary mb-2" />
                <h4 className="font-medium text-foreground mb-1">Optimize Pricing</h4>
                <p className="text-sm text-muted-foreground">
                  Consider seasonal pricing adjustments for better profit margins.
                </p>
              </div>
              
              <div className="bg-success/5 rounded-lg p-4 border border-success/20">
                <Icon name="Users" size={20} className="text-success mb-2" />
                <h4 className="font-medium text-foreground mb-1">Customer Retention</h4>
                <p className="text-sm text-muted-foreground">
                  Follow up with customers for repeat business and referrals.
                </p>
              </div>
              
              <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
                <Icon name="Package" size={20} className="text-warning mb-2" />
                <h4 className="font-medium text-foreground mb-1">Inventory Management</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor stock levels to avoid shortages during peak seasons.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Floating AI Assistant */}
      <FloatingAIAssistant 
        isOpen={aiAssistantOpen}
        onToggle={toggleAIAssistant}
      />
    </div>
  );
};

export default BusinessOwnerDashboard;