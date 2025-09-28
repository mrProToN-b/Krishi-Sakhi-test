import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SoilTestCard = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    testType: '',
    sampleLocation: '',
    preferredDate: '',
    contactNumber: ''
  });

  const soilTestResults = {
    lastTest: {
      date: "2025-08-15",
      location: "Field Section A",
      ph: 6.8,
      nitrogen: "Medium",
      phosphorus: "High", 
      potassium: "Low",
      organicMatter: 3.2,
      recommendations: [
        "Add potassium-rich fertilizer before next planting season",
        "Maintain current organic matter levels with compost",
        "pH level is optimal for most crops"
      ]
    },
    upcomingTest: {
      scheduled: true,
      date: "2025-09-25",
      location: "Field Section B",
      testType: "Complete Soil Analysis"
    }
  };

  const testTypes = [
    { value: 'basic', label: 'Basic Soil Test (pH, NPK)' },
    { value: 'complete', label: 'Complete Soil Analysis' },
    { value: 'organic', label: 'Organic Matter Test' },
    { value: 'micronutrient', label: 'Micronutrient Analysis' },
    { value: 'contamination', label: 'Contamination Check' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleTestTypeChange = (value) => {
    setBookingData(prev => ({ ...prev, testType: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Booking data:', bookingData);
    setBookingData({ testType: '', sampleLocation: '', preferredDate: '', contactNumber: '' });
    setShowBookingForm(false);
  };

  const getNutrientColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getNutrientBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-error/10 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPhColor = (ph) => {
    if (ph >= 6.0 && ph <= 7.5) return 'text-success';
    if (ph >= 5.5 && ph < 6.0) return 'text-warning';
    if (ph > 7.5 && ph <= 8.0) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Layers" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Soil Health
            </h3>
            <p className="text-sm text-muted-foreground">
              Monitor and improve soil quality
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Plus"
          onClick={() => setShowBookingForm(!showBookingForm)}
        >
          Book Test
        </Button>
      </div>
      {/* Booking Form */}
      {showBookingForm && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
          <h4 className="font-heading font-medium text-foreground mb-3">Book Soil Test</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Select
              label="Test Type"
              options={testTypes}
              value={bookingData?.testType}
              onChange={handleTestTypeChange}
              placeholder="Select test type"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Sample Location"
                name="sampleLocation"
                type="text"
                placeholder="e.g., Field Section A"
                value={bookingData?.sampleLocation}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Preferred Date"
                name="preferredDate"
                type="date"
                value={bookingData?.preferredDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="Contact Number"
              name="contactNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={bookingData?.contactNumber}
              onChange={handleInputChange}
              required
            />
            <div className="flex space-x-2 pt-2">
              <Button type="submit" size="sm" iconName="Calendar">
                Book Test
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => setShowBookingForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <div className="space-y-4">
        {/* Latest Test Results */}
        <div className="space-y-3">
          <h4 className="font-heading font-medium text-foreground">Latest Test Results</h4>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-medium text-foreground">{soilTestResults?.lastTest?.location}</h5>
                <p className="text-sm text-muted-foreground">
                  Tested on {new Date(soilTestResults.lastTest.date)?.toLocaleDateString('en-IN')}
                </p>
              </div>
              <Button variant="ghost" size="sm" iconName="Download">
                Report
              </Button>
            </div>

            {/* pH Level */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">pH Level</span>
                <span className={`text-sm font-semibold ${getPhColor(soilTestResults?.lastTest?.ph)}`}>
                  {soilTestResults?.lastTest?.ph}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    getPhColor(soilTestResults?.lastTest?.ph) === 'text-success' ? 'bg-success' :
                    getPhColor(soilTestResults?.lastTest?.ph) === 'text-warning' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${(soilTestResults?.lastTest?.ph / 14) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Acidic (0)</span>
                <span>Neutral (7)</span>
                <span>Alkaline (14)</span>
              </div>
            </div>

            {/* Nutrient Levels */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-primary">N</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Nitrogen</div>
                <span className={`text-xs px-2 py-1 rounded-full ${getNutrientBadge(soilTestResults?.lastTest?.nitrogen)}`}>
                  {soilTestResults?.lastTest?.nitrogen}
                </span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-secondary">P</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Phosphorus</div>
                <span className={`text-xs px-2 py-1 rounded-full ${getNutrientBadge(soilTestResults?.lastTest?.phosphorus)}`}>
                  {soilTestResults?.lastTest?.phosphorus}
                </span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-accent">K</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Potassium</div>
                <span className={`text-xs px-2 py-1 rounded-full ${getNutrientBadge(soilTestResults?.lastTest?.potassium)}`}>
                  {soilTestResults?.lastTest?.potassium}
                </span>
              </div>
            </div>

            {/* Organic Matter */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Organic Matter</span>
                <span className="text-sm font-semibold text-success">
                  {soilTestResults?.lastTest?.organicMatter}%
                </span>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h6 className="text-sm font-medium text-foreground mb-2">Recommendations</h6>
              <ul className="space-y-1">
                {soilTestResults?.lastTest?.recommendations?.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Test */}
        {soilTestResults?.upcomingTest?.scheduled && (
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-foreground">Upcoming Test</h4>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{soilTestResults?.upcomingTest?.testType}</h5>
                  <p className="text-sm text-muted-foreground">
                    {soilTestResults?.upcomingTest?.location} • {new Date(soilTestResults.upcomingTest.date)?.toLocaleDateString('en-IN')}
                  </p>
                </div>
                <Button variant="outline" size="sm" iconName="Edit">
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="ghost" size="sm" iconName="FileText" fullWidth>
              View History
            </Button>
            <Button variant="ghost" size="sm" iconName="TrendingUp" fullWidth>
              Soil Trends
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilTestCard;