import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const DashboardSidebar = ({ userRole = 'farmer', isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();

  const farmerNavItems = [
    { label: 'Dashboard', path: '/farmer-dashboard', icon: 'LayoutDashboard' },
    { label: 'Weather', path: '/weather', icon: 'Cloud' },
    { label: 'Crop Management', path: '/crops', icon: 'Wheat' },
    { label: 'Market Prices', path: '/market', icon: 'TrendingUp' },
    { label: 'Pest Control', path: '/pest-control', icon: 'Bug' },
    { label: 'Soil Health', path: '/soil-health', icon: 'Layers' },
    { label: 'Irrigation', path: '/irrigation', icon: 'Droplets' },
    { label: 'Reports', path: '/reports', icon: 'FileText' },
  ];

  const businessNavItems = [
    { label: 'Dashboard', path: '/business-owner-dashboard', icon: 'LayoutDashboard' },
    { label: 'Customers', path: '/customers', icon: 'Users' },
    { label: 'Services', path: '/services', icon: 'Package' },
    { label: 'Orders', path: '/orders', icon: 'ShoppingCart' },
    { label: 'Inventory', path: '/inventory', icon: 'Warehouse' },
    { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
    { label: 'Payments', path: '/payments', icon: 'CreditCard' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
  ];

  const navigationItems = userRole === 'farmer' ? farmerNavItems : businessNavItems;
  const isActivePath = (path) => location?.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:z-40 bg-card border-r border-border shadow-soft transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <Link to="/landing-page" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sprout" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-lg text-foreground">
                Krishi Sakhi
              </span>
            </Link>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Sprout" size={20} color="white" />
            </div>
          )}
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 group ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item?.label : undefined}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`}
              />
              {!isCollapsed && <span>{item?.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userRole === 'farmer' ? 'Farmer User' : 'Business Owner'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === 'farmer' ? 'farmer@example.com' : 'business@example.com'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-strong">
        <nav className="flex items-center justify-around px-2 py-2">
          {navigationItems?.slice(0, 5)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center px-2 py-2 rounded-md text-xs font-medium transition-colors duration-150 min-w-0 flex-1 ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} className="mb-1" />
              <span className="truncate">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;