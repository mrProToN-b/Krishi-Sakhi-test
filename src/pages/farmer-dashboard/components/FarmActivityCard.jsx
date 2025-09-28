import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FarmActivityCard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: '',
    description: '',
    area: '',
    cost: ''
  });

  const recentActivities = [
    {
      id: 1,
      type: "Watering",
      description: "Irrigated tomato field - Section A",
      area: "2.5 acres",
      cost: 450,
      date: "2025-09-16",
      time: "06:30 AM",
      status: "completed",
      icon: "Droplets"
    },
    {
      id: 2,
      type: "Fertilizing",
      description: "Applied organic compost to vegetable beds",
      area: "1.2 acres",
      cost: 1200,
      date: "2025-09-15",
      time: "07:00 AM",
      status: "completed",
      icon: "Leaf"
    },
    {
      id: 3,
      type: "Pest Control",
      description: "Neem oil spray for aphid control",
      area: "3.0 acres",
      cost: 800,
      date: "2025-09-14",
      time: "05:45 AM",
      status: "completed",
      icon: "Bug"
    },
    {
      id: 4,
      type: "Harvesting",
      description: "Harvested ripe tomatoes from Section B",
      area: "1.8 acres",
      cost: 0,
      date: "2025-09-13",
      time: "06:15 AM",
      status: "completed",
      icon: "Package"
    }
  ];

  const activityTypes = [
    { value: 'watering', label: 'Watering' },
    { value: 'fertilizing', label: 'Fertilizing' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'harvesting', label: 'Harvesting' },
    { value: 'planting', label: 'Planting' },
    { value: 'weeding', label: 'Weeding' },
    { value: 'soil-preparation', label: 'Soil Preparation' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setNewActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleActivityTypeChange = (value) => {
    setNewActivity(prev => ({ ...prev, type: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Here you would typically save the activity
    console.log('New activity:', newActivity);
    setNewActivity({ type: '', description: '', area: '', cost: '' });
    setShowAddForm(false);
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'Watering': 'Droplets',
      'Fertilizing': 'Leaf',
      'Pest Control': 'Bug',
      'Harvesting': 'Package',
      'Planting': 'Sprout',
      'Weeding': 'Scissors',
      'Soil Preparation': 'Layers'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'planned': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Farm Activities
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your daily farm work
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Plus"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Log Activity
        </Button>
      </div>
      {/* Add Activity Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
          <h4 className="font-heading font-medium text-foreground mb-3">Log New Activity</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                label="Activity Type"
                options={activityTypes}
                value={newActivity?.type}
                onChange={handleActivityTypeChange}
                placeholder="Select activity type"
                required
              />
              <Input
                label="Area Covered"
                name="area"
                type="text"
                placeholder="e.g., 2.5 acres"
                value={newActivity?.area}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Describe the activity performed"
              value={newActivity?.description}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Cost (₹)"
              name="cost"
              type="number"
              placeholder="Enter cost if any"
              value={newActivity?.cost}
              onChange={handleInputChange}
            />
            <div className="flex space-x-2 pt-2">
              <Button type="submit" size="sm" iconName="Save">
                Save Activity
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Recent Activities */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-foreground">Recent Activities</h4>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors duration-150">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={getActivityIcon(activity?.type)} size={16} className="text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground text-sm">{activity?.type}</h5>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {activity?.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{activity?.area}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{new Date(activity.date)?.toLocaleDateString('en-IN')}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{activity?.time}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    {activity?.cost > 0 && (
                      <div className="font-medium text-foreground text-sm">
                        ₹{activity?.cost?.toLocaleString('en-IN')}
                      </div>
                    )}
                    <div className={`text-xs ${getStatusColor(activity?.status)} capitalize`}>
                      {activity?.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Summary */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">₹2,450</div>
              <div className="text-xs text-muted-foreground">Total Cost</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">8.5</div>
              <div className="text-xs text-muted-foreground">Acres Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmActivityCard;