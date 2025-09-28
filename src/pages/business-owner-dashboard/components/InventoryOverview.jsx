import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryOverview = () => {
  const inventoryItems = [
    {
      id: 1,
      name: "Organic Fertilizer",
      category: "Fertilizers",
      currentStock: 150,
      totalCapacity: 200,
      unit: "bags",
      status: "good",
      price: "₹450",
      lastUpdated: "2 hours ago",
      icon: "Leaf"
    },
    {
      id: 2,
      name: "Paddy Seeds (High Yield)",
      category: "Seeds",
      currentStock: 25,
      totalCapacity: 100,
      unit: "kg",
      status: "low",
      price: "₹85",
      lastUpdated: "4 hours ago",
      icon: "Wheat"
    },
    {
      id: 3,
      name: "Pesticide Spray",
      category: "Pesticides",
      currentStock: 80,
      totalCapacity: 120,
      unit: "bottles",
      status: "good",
      price: "₹320",
      lastUpdated: "1 day ago",
      icon: "Spray"
    },
    {
      id: 4,
      name: "NPK Fertilizer",
      category: "Fertilizers",
      currentStock: 5,
      totalCapacity: 50,
      unit: "bags",
      status: "critical",
      price: "₹680",
      lastUpdated: "3 hours ago",
      icon: "Package"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      good: 'bg-success/10 text-success border-success/20',
      low: 'bg-warning/10 text-warning border-warning/20',
      critical: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || colors?.good;
  };

  const getStockPercentage = (current, total) => {
    return Math.round((current / total) * 100);
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 70) return 'bg-success';
    if (percentage >= 30) return 'bg-warning';
    return 'bg-error';
  };

  const handleUpdateStock = (itemId) => {
    console.log('Update stock for item:', itemId);
  };

  const handleUpdatePrice = (itemId) => {
    console.log('Update price for item:', itemId);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">Inventory Overview</h3>
              <p className="text-sm text-muted-foreground">Stock levels and pricing</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Item
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {inventoryItems?.map((item) => {
            const stockPercentage = getStockPercentage(item?.currentStock, item?.totalCapacity);
            return (
              <div key={item?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={item?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{item?.name}</h4>
                      <p className="text-sm text-muted-foreground">{item?.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Stock Level</span>
                    <span className="text-sm font-medium text-foreground">
                      {item?.currentStock}/{item?.totalCapacity} {item?.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(stockPercentage)}`}
                      style={{ width: `${stockPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-semibold text-foreground">{item?.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">per {item?.unit?.slice(0, -1)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Updated {item?.lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="Package" 
                    iconPosition="left"
                    onClick={() => handleUpdateStock(item?.id)}
                  >
                    Update Stock
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xs" 
                    iconName="IndianRupee" 
                    iconPosition="left"
                    onClick={() => handleUpdatePrice(item?.id)}
                  >
                    Update Price
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

export default InventoryOverview;