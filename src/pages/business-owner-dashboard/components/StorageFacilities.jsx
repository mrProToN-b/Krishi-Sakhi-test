import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StorageFacilities = () => {
  const facilities = [
    {
      id: 1,
      name: "Warehouse A - Palakkad",
      totalCapacity: 1000,
      occupiedSpace: 750,
      availableSpace: 250,
      unit: "sq ft",
      monthlyRate: "₹15",
      rateUnit: "per sq ft",
      currentTenants: 3,
      status: "active",
      lastUpdated: "1 hour ago",
      features: ["Climate Controlled", "24/7 Security", "Loading Dock"]
    },
    {
      id: 2,
      name: "Storage Unit B - Thrissur",
      totalCapacity: 500,
      occupiedSpace: 200,
      availableSpace: 300,
      unit: "sq ft",
      monthlyRate: "₹12",
      rateUnit: "per sq ft",
      currentTenants: 1,
      status: "active",
      lastUpdated: "3 hours ago",
      features: ["Pest Control", "Easy Access", "Ventilation"]
    },
    {
      id: 3,
      name: "Cold Storage - Kottayam",
      totalCapacity: 800,
      occupiedSpace: 800,
      availableSpace: 0,
      unit: "sq ft",
      monthlyRate: "₹25",
      rateUnit: "per sq ft",
      currentTenants: 2,
      status: "full",
      lastUpdated: "2 days ago",
      features: ["Temperature Control", "Humidity Control", "Monitoring"]
    },
    {
      id: 4,
      name: "Grain Storage - Wayanad",
      totalCapacity: 1200,
      occupiedSpace: 400,
      availableSpace: 800,
      unit: "sq ft",
      monthlyRate: "₹10",
      rateUnit: "per sq ft",
      currentTenants: 2,
      status: "maintenance",
      lastUpdated: "5 hours ago",
      features: ["Moisture Control", "Rodent Proof", "Large Capacity"]
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success/10 text-success border-success/20',
      full: 'bg-warning/10 text-warning border-warning/20',
      maintenance: 'bg-error/10 text-error border-error/20',
      inactive: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[status] || colors?.active;
  };

  const getOccupancyPercentage = (occupied, total) => {
    return Math.round((occupied / total) * 100);
  };

  const getOccupancyColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const handleUpdateRates = (facilityId) => {
    console.log('Update rates for facility:', facilityId);
  };

  const handleManageTenants = (facilityId) => {
    console.log('Manage tenants for facility:', facilityId);
  };

  const handleViewDetails = (facilityId) => {
    console.log('View facility details:', facilityId);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Warehouse" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Storage Facilities</h3>
              <p className="text-sm text-muted-foreground">Occupancy and management</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Facility
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {facilities?.map((facility) => {
            const occupancyPercentage = getOccupancyPercentage(facility?.occupiedSpace, facility?.totalCapacity);
            return (
              <div key={facility?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{facility?.name}</h4>
                    <p className="text-sm text-muted-foreground">{facility?.currentTenants} active tenants</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(facility?.status)}`}>
                    {facility?.status}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Occupancy</span>
                    <span className="text-sm font-medium text-foreground">
                      {facility?.occupiedSpace}/{facility?.totalCapacity} {facility?.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getOccupancyColor(occupancyPercentage)}`}
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{occupancyPercentage}% occupied</span>
                    <span className="text-xs font-medium text-success">
                      {facility?.availableSpace} {facility?.unit} available
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Rate</span>
                    <span className="text-sm font-semibold text-foreground">
                      {facility?.monthlyRate} {facility?.rateUnit}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Updated {facility?.lastUpdated}</span>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Features</p>
                  <div className="flex flex-wrap gap-1">
                    {facility?.features?.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="IndianRupee" 
                    iconPosition="left"
                    onClick={() => handleUpdateRates(facility?.id)}
                  >
                    Update Rates
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="Users" 
                    iconPosition="left"
                    onClick={() => handleManageTenants(facility?.id)}
                  >
                    Tenants
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="Eye" 
                    iconPosition="left"
                    onClick={() => handleViewDetails(facility?.id)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StorageFacilities;