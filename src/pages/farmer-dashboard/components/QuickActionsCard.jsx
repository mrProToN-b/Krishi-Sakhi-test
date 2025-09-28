import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const quickActions = [
    {
      id: 1,
      title: "AI Assistant",
      description: "Get instant farming advice",
      icon: "Bot",
      color: "bg-primary/10 text-primary",
      link: "/ai-chat-assistant",
      badge: "New"
    },
    {
      id: 2,
      title: "Weather Alerts",
      description: "Check weather updates",
      icon: "CloudRain",
      color: "bg-secondary/10 text-secondary",
      link: "/weather",
      badge: null
    },
    {
      id: 3,
      title: "Market Prices",
      description: "View current crop prices",
      icon: "TrendingUp",
      color: "bg-success/10 text-success",
      link: "/market",
      badge: "Live"
    },
    {
      id: 4,
      title: "Book Services",
      description: "Labor, machinery & more",
      icon: "Calendar",
      color: "bg-warning/10 text-warning",
      link: "/services",
      badge: null
    },
    {
      id: 5,
      title: "Pest Control",
      description: "Identify and treat pests",
      icon: "Bug",
      color: "bg-error/10 text-error",
      link: "/pest-control",
      badge: null
    },
    {
      id: 6,
      title: "Marketplace",
      description: "Buy seeds & fertilizers",
      icon: "ShoppingCart",
      color: "bg-accent/10 text-accent",
      link: "/marketplace",
      badge: null
    }
  ];

  const emergencyContacts = [
    {
      id: 1,
      name: "Agricultural Helpline",
      number: "1800-180-1551",
      icon: "Phone",
      available: "24/7"
    },
    {
      id: 2,
      name: "Veterinary Emergency",
      number: "1800-425-1660",
      icon: "Heart",
      available: "24/7"
    },
    {
      id: 3,
      name: "Weather Emergency",
      number: "1800-266-6677",
      icon: "AlertTriangle",
      available: "24/7"
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Quick Actions
            </h3>
            <p className="text-sm text-muted-foreground">
              Access key features instantly
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <Link
              key={action?.id}
              to={action?.link}
              className="relative p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-all duration-150 hover:scale-105 group"
            >
              {action?.badge && (
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  {action?.badge}
                </div>
              )}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action?.color}`}>
                  <Icon name={action?.icon} size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-150">
                    {action?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <h4 className="font-heading font-medium text-foreground">Emergency Contacts</h4>
          <div className="space-y-2">
            {emergencyContacts?.map((contact) => (
              <div key={contact?.id} className="flex items-center justify-between p-3 bg-error/5 border border-error/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name={contact?.icon} size={16} className="text-error" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground text-sm">{contact?.name}</h5>
                    <p className="text-xs text-muted-foreground">{contact?.available}</p>
                  </div>
                </div>
                <a
                  href={`tel:${contact?.number}`}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-error text-error-foreground rounded-md text-sm font-medium hover:bg-error/90 transition-colors duration-150"
                >
                  <Icon name="Phone" size={14} />
                  <span>{contact?.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="space-y-3">
          <h4 className="font-heading font-medium text-foreground">Today's Tasks</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-foreground flex-1">Water tomato plants - Section A</span>
              <span className="text-xs text-muted-foreground">6:00 AM</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-foreground flex-1">Check pest traps</span>
              <span className="text-xs text-muted-foreground">8:00 AM</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-foreground flex-1">Harvest ready vegetables</span>
              <span className="text-xs text-muted-foreground">4:00 PM</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" fullWidth iconName="Plus">
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;