import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyTipsCard = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const dailyTips = [
    {
      id: 1,
      title: "Optimal Watering Time",
      content: `Water your crops early in the morning (6-8 AM) or late evening (6-8 PM) to minimize water loss through evaporation.\n\nThis timing also helps prevent fungal diseases that can develop when plants stay wet overnight.`,
      category: "Irrigation",
      icon: "Droplets",
      priority: "high"
    },
    {
      id: 2,
      title: "Soil Health Check",
      content: `Check your soil moisture by inserting your finger 2-3 inches deep into the soil.\n\nIf it feels dry, it's time to water. This simple test can prevent both over-watering and under-watering.`,
      category: "Soil Management",
      icon: "Layers",
      priority: "medium"
    },
    {
      id: 3,
      title: "Pest Prevention",
      content: `Inspect your crops daily for early signs of pest infestation.\n\nLook for discolored leaves, holes, or unusual spots. Early detection can save your entire crop.`,
      category: "Pest Control",
      icon: "Bug",
      priority: "high"
    },
    {
      id: 4,
      title: "Weather Preparation",
      content: `Check weather forecasts regularly and prepare accordingly.\n\nCover sensitive plants before heavy rain or strong winds to prevent damage.`,
      category: "Weather",
      icon: "Cloud",
      priority: "medium"
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentTipIndex]);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % dailyTips?.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + dailyTips?.length) % dailyTips?.length);
  };

  const currentTip = dailyTips?.[currentTipIndex];

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Daily Farming Tips
            </h3>
            <p className="text-sm text-muted-foreground">
              Expert advice for better farming
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={prevTip}
            className="w-8 h-8 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-150"
            aria-label="Previous tip"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={nextTip}
            className="w-8 h-8 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-150"
            aria-label="Next tip"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-5/6"></div>
          <div className="h-3 bg-muted rounded w-4/5"></div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              currentTip?.priority === 'high' ? 'bg-error/10' : 'bg-secondary/10'
            }`}>
              <Icon 
                name={currentTip?.icon} 
                size={16} 
                className={currentTip?.priority === 'high' ? 'text-error' : 'text-secondary'}
              />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground">
                {currentTip?.title}
              </h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                currentTip?.priority === 'high' ?'bg-error/10 text-error' :'bg-secondary/10 text-secondary'
              }`}>
                {currentTip?.category}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {currentTip?.content}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex space-x-1">
              {dailyTips?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                    index === currentTipIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" iconName="BookOpen" iconPosition="left">
              Learn More
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTipsCard;