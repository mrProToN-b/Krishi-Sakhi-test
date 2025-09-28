import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketPricesCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('vegetables');

  const marketData = {
    vegetables: [
      {
        id: 1,
        name: "Tomato",
        currentPrice: 45,
        previousPrice: 42,
        unit: "kg",
        change: 7.1,
        trend: "up",
        market: "Kochi Mandi",
        icon: "Apple"
      },
      {
        id: 2,
        name: "Onion",
        currentPrice: 35,
        previousPrice: 38,
        unit: "kg", 
        change: -7.9,
        trend: "down",
        market: "Ernakulam Market",
        icon: "Apple"
      },
      {
        id: 3,
        name: "Potato",
        currentPrice: 28,
        previousPrice: 28,
        unit: "kg",
        change: 0,
        trend: "stable",
        market: "Kochi Mandi",
        icon: "Apple"
      },
      {
        id: 4,
        name: "Cabbage",
        currentPrice: 22,
        previousPrice: 20,
        unit: "kg",
        change: 10.0,
        trend: "up",
        market: "Thrissur Market",
        icon: "Apple"
      }
    ],
    fruits: [
      {
        id: 5,
        name: "Banana",
        currentPrice: 60,
        previousPrice: 55,
        unit: "dozen",
        change: 9.1,
        trend: "up",
        market: "Kochi Mandi",
        icon: "Apple"
      },
      {
        id: 6,
        name: "Mango",
        currentPrice: 120,
        previousPrice: 130,
        unit: "kg",
        change: -7.7,
        trend: "down",
        market: "Ernakulam Market",
        icon: "Apple"
      },
      {
        id: 7,
        name: "Coconut",
        currentPrice: 25,
        previousPrice: 24,
        unit: "piece",
        change: 4.2,
        trend: "up",
        market: "Local Market",
        icon: "Apple"
      }
    ],
    grains: [
      {
        id: 8,
        name: "Rice",
        currentPrice: 55,
        previousPrice: 53,
        unit: "kg",
        change: 3.8,
        trend: "up",
        market: "Wholesale Market",
        icon: "Wheat"
      },
      {
        id: 9,
        name: "Wheat",
        currentPrice: 32,
        previousPrice: 34,
        unit: "kg",
        change: -5.9,
        trend: "down",
        market: "Grain Market",
        icon: "Wheat"
      }
    ]
  };

  const categories = [
    { id: 'vegetables', label: 'Vegetables', icon: 'Apple' },
    { id: 'fruits', label: 'Fruits', icon: 'Apple' },
    { id: 'grains', label: 'Grains', icon: 'Wheat' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const currentData = marketData?.[selectedCategory] || [];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Market Prices
            </h3>
            <p className="text-sm text-muted-foreground">
              Live market rates
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="ExternalLink">
          View All
        </Button>
      </div>
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => {
              setSelectedCategory(category?.id);
              setIsLoading(true);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
              selectedCategory === category?.id
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(4)]?.map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted-foreground/20 rounded-lg"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-muted-foreground/20 rounded w-20"></div>
                  <div className="h-3 bg-muted-foreground/20 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="h-4 bg-muted-foreground/20 rounded w-12"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {currentData?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 rounded-lg transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name={item?.icon} size={16} className="text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{item?.name}</div>
                  <div className="text-xs text-muted-foreground">{item?.market}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">
                  ₹{item?.currentPrice}/{item?.unit}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(item?.trend)}`}>
                  <Icon name={getTrendIcon(item?.trend)} size={12} />
                  <span>
                    {item?.change > 0 ? '+' : ''}{item?.change?.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Market Summary */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last updated:</span>
              <span className="text-foreground font-medium">
                {new Date()?.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Next update:</span>
              <span className="text-foreground">
                {new Date(Date.now() + 30 * 60000)?.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPricesCard;