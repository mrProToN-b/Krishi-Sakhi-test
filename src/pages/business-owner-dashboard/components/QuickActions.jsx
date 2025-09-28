import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Add New Product",
      description: "List seeds, fertilizers, or pesticides",
      icon: "Plus",
      color: "primary",
      action: "add-product"
    },
    {
      id: 2,
      title: "Update Inventory",
      description: "Manage stock levels and pricing",
      icon: "Package",
      color: "accent",
      action: "update-inventory"
    },
    {
      id: 3,
      title: "View Orders",
      description: "Check pending and completed orders",
      icon: "ShoppingCart",
      color: "secondary",
      action: "view-orders"
    },
    {
      id: 4,
      title: "Customer Messages",
      description: "Respond to inquiries and support",
      icon: "MessageSquare",
      color: "success",
      action: "customer-messages"
    },
    {
      id: 5,
      title: "Service Calendar",
      description: "Manage bookings and availability",
      icon: "Calendar",
      color: "warning",
      action: "service-calendar"
    },
    {
      id: 6,
      title: "Analytics Report",
      description: "View sales and performance data",
      icon: "BarChart3",
      color: "primary",
      action: "analytics-report"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20'
    };
    return colors?.[color] || colors?.primary;
  };

  const handleAction = (actionType) => {
    console.log('Quick action:', actionType);
    // Handle navigation or modal opening based on action type
    switch (actionType) {
      case 'add-product':
        // Navigate to add product page or open modal
        break;
      case 'update-inventory':
        // Navigate to inventory management
        break;
      case 'view-orders':
        // Navigate to orders page
        break;
      case 'customer-messages':
        // Navigate to messages or open chat
        break;
      case 'service-calendar':
        // Navigate to calendar management
        break;
      case 'analytics-report':
        // Navigate to analytics page
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Common business tasks</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleAction(action?.action)}
              className={`p-4 rounded-lg border border-border text-left transition-all duration-200 hover:shadow-medium hover:scale-105 ${getColorClasses(action?.color)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{action?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;