import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentInquiries = () => {
  const inquiries = [
    {
      id: 1,
      customerName: "Rajesh Kumar",
      product: "Organic Fertilizer",
      quantity: "50 bags",
      message: "Need bulk pricing for organic fertilizer. Can you provide delivery to Thrissur?",
      timestamp: "2 hours ago",
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      customerName: "Priya Nair",
      product: "Paddy Seeds",
      quantity: "25 kg",
      message: "Looking for high-yield paddy seeds suitable for monsoon planting.",
      timestamp: "4 hours ago",
      priority: "medium",
      status: "pending"
    },
    {
      id: 3,
      customerName: "Suresh Menon",
      product: "Tractor Rental",
      quantity: "2 days",
      message: "Need tractor for land preparation. Available next week?",
      timestamp: "6 hours ago",
      priority: "medium",
      status: "responded"
    },
    {
      id: 4,
      customerName: "Lakshmi Devi",
      product: "Storage Space",
      quantity: "500 sq ft",
      message: "Require storage facility for rice harvest. What are your rates?",
      timestamp: "1 day ago",
      priority: "low",
      status: "pending"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-success/10 text-success border-success/20'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getStatusIcon = (status) => {
    return status === 'responded' ? 'CheckCircle' : 'Clock';
  };

  const handleQuickResponse = (inquiryId) => {
    console.log('Quick response for inquiry:', inquiryId);
  };

  const handleViewDetails = (inquiryId) => {
    console.log('View details for inquiry:', inquiryId);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Recent Inquiries</h3>
              <p className="text-sm text-muted-foreground">Customer requests and messages</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {inquiries?.map((inquiry) => (
            <div key={inquiry?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{inquiry?.customerName}</h4>
                    <p className="text-sm text-muted-foreground">{inquiry?.product} • {inquiry?.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(inquiry?.priority)}`}>
                    {inquiry?.priority}
                  </span>
                  <Icon 
                    name={getStatusIcon(inquiry?.status)} 
                    size={16} 
                    className={inquiry?.status === 'responded' ? 'text-success' : 'text-warning'} 
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {inquiry?.message}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{inquiry?.timestamp}</span>
                <div className="flex items-center space-x-2">
                  {inquiry?.status === 'pending' && (
                    <Button 
                      variant="default" 
                      size="xs" 
                      iconName="Reply" 
                      iconPosition="left"
                      onClick={() => handleQuickResponse(inquiry?.id)}
                    >
                      Quick Reply
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="Eye" 
                    iconPosition="left"
                    onClick={() => handleViewDetails(inquiry?.id)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentInquiries;