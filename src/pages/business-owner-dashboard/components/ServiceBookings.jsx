import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceBookings = () => {
  const bookings = [
    {
      id: 1,
      serviceName: "Tractor Rental",
      customerName: "Ravi Krishnan",
      bookingDate: "2025-01-18",
      duration: "3 days",
      location: "Palakkad",
      amount: "₹4,500",
      status: "confirmed",
      paymentStatus: "paid",
      contactNumber: "+91 98765 43210"
    },
    {
      id: 2,
      serviceName: "Labor Service",
      customerName: "Meera Pillai",
      bookingDate: "2025-01-20",
      duration: "1 day",
      location: "Kottayam",
      amount: "₹2,800",
      status: "pending",
      paymentStatus: "pending",
      contactNumber: "+91 87654 32109"
    },
    {
      id: 3,
      serviceName: "Water Pump Rental",
      customerName: "Anil Kumar",
      bookingDate: "2025-01-22",
      duration: "5 days",
      location: "Thrissur",
      amount: "₹3,200",
      status: "confirmed",
      paymentStatus: "advance_paid",
      contactNumber: "+91 76543 21098"
    },
    {
      id: 4,
      serviceName: "Harvesting Equipment",
      customerName: "Sita Devi",
      bookingDate: "2025-01-25",
      duration: "2 days",
      location: "Wayanad",
      amount: "₹6,800",
      status: "pending",
      paymentStatus: "pending",
      contactNumber: "+91 65432 10987"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      cancelled: 'bg-error/10 text-error border-error/20',
      completed: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: 'bg-success/10 text-success border-success/20',
      advance_paid: 'bg-accent/10 text-accent border-accent/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      overdue: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getServiceIcon = (serviceName) => {
    const icons = {
      'Tractor Rental': 'Truck',
      'Labor Service': 'Users',
      'Water Pump Rental': 'Droplets',
      'Harvesting Equipment': 'Scissors'
    };
    return icons?.[serviceName] || 'Package';
  };

  const handleConfirmBooking = (bookingId) => {
    console.log('Confirm booking:', bookingId);
  };

  const handleContactCustomer = (contactNumber) => {
    console.log('Contact customer:', contactNumber);
  };

  const handleViewDetails = (bookingId) => {
    console.log('View booking details:', bookingId);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Service Bookings</h3>
              <p className="text-sm text-muted-foreground">Upcoming and pending bookings</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="CalendarPlus" iconPosition="right">
            Manage Calendar
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {bookings?.map((booking) => (
            <div key={booking?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getServiceIcon(booking?.serviceName)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{booking?.serviceName}</h4>
                    <p className="text-sm text-muted-foreground">{booking?.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking?.status)}`}>
                    {booking?.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking?.paymentStatus)}`}>
                    {booking?.paymentStatus?.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="text-sm font-medium text-foreground">{booking?.bookingDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="text-sm font-medium text-foreground">{booking?.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm font-medium text-foreground">{booking?.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="text-sm font-semibold text-foreground">{booking?.amount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Phone" size={14} />
                  <span>{booking?.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {booking?.status === 'pending' && (
                    <Button 
                      variant="default" 
                      size="xs" 
                      iconName="Check" 
                      iconPosition="left"
                      onClick={() => handleConfirmBooking(booking?.id)}
                    >
                      Confirm
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="Phone" 
                    iconPosition="left"
                    onClick={() => handleContactCustomer(booking?.contactNumber)}
                  >
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="Eye" 
                    iconPosition="left"
                    onClick={() => handleViewDetails(booking?.id)}
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

export default ServiceBookings;