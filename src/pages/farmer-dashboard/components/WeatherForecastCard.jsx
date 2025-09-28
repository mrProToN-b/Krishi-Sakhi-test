import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherForecastCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);

  const weatherData = {
    current: {
      location: "Kochi, Kerala",
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 75,
      windSpeed: 12,
      uvIndex: 6,
      icon: "CloudSun"
    },
    forecast: [
      {
        day: "Today",
        date: "16 Sep",
        high: 30,
        low: 24,
        condition: "Partly Cloudy",
        humidity: 75,
        rainfall: 0,
        icon: "CloudSun"
      },
      {
        day: "Tomorrow",
        date: "17 Sep", 
        high: 29,
        low: 23,
        condition: "Light Rain",
        humidity: 85,
        rainfall: 5,
        icon: "CloudRain"
      },
      {
        day: "Wed",
        date: "18 Sep",
        high: 27,
        low: 22,
        condition: "Heavy Rain",
        humidity: 90,
        rainfall: 15,
        icon: "CloudRain"
      },
      {
        day: "Thu",
        date: "19 Sep",
        high: 31,
        low: 25,
        condition: "Sunny",
        humidity: 65,
        rainfall: 0,
        icon: "Sun"
      },
      {
        day: "Fri",
        date: "20 Sep",
        high: 32,
        low: 26,
        condition: "Sunny",
        humidity: 60,
        rainfall: 0,
        icon: "Sun"
      }
    ],
    alerts: [
      {
        type: "warning",
        message: "Heavy rainfall expected on Wednesday. Consider covering sensitive crops.",
        icon: "AlertTriangle"
      }
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const selectedForecast = weatherData?.forecast?.[selectedDay];

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Cloud" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Weather Forecast
            </h3>
            <p className="text-sm text-muted-foreground">
              {weatherData?.current?.location}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="MapPin">
          Change Location
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-muted rounded-lg"></div>
          <div className="flex space-x-2">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="flex-1 h-16 bg-muted rounded-lg"></div>
            ))}
          </div>
          <div className="h-12 bg-muted rounded-lg"></div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Current Weather */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Icon name={weatherData?.current?.icon} size={48} className="text-primary" />
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {weatherData?.current?.temperature}°C
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {weatherData?.current?.condition}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Droplets" size={14} />
                  <span>{weatherData?.current?.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Wind" size={14} />
                  <span>{weatherData?.current?.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Sun" size={14} />
                  <span>UV {weatherData?.current?.uvIndex}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="space-y-2">
            <h4 className="font-heading font-medium text-foreground">5-Day Forecast</h4>
            <div className="grid grid-cols-5 gap-2">
              {weatherData?.forecast?.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`p-3 rounded-lg text-center transition-all duration-150 ${
                    selectedDay === index
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{day?.day}</div>
                  <Icon name={day?.icon} size={20} className="mx-auto mb-1" />
                  <div className="text-xs">
                    <div className="font-semibold">{day?.high}°</div>
                    <div className="opacity-75">{day?.low}°</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Day Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h5 className="font-heading font-medium text-foreground mb-3">
              {selectedForecast?.day} - {selectedForecast?.date}
            </h5>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Icon name="Thermometer" size={16} className="mx-auto mb-1 text-muted-foreground" />
                <div className="font-medium text-foreground">{selectedForecast?.high}°/{selectedForecast?.low}°</div>
                <div className="text-muted-foreground">Temperature</div>
              </div>
              <div className="text-center">
                <Icon name="Droplets" size={16} className="mx-auto mb-1 text-muted-foreground" />
                <div className="font-medium text-foreground">{selectedForecast?.humidity}%</div>
                <div className="text-muted-foreground">Humidity</div>
              </div>
              <div className="text-center">
                <Icon name="CloudRain" size={16} className="mx-auto mb-1 text-muted-foreground" />
                <div className="font-medium text-foreground">{selectedForecast?.rainfall}mm</div>
                <div className="text-muted-foreground">Rainfall</div>
              </div>
            </div>
          </div>

          {/* Weather Alerts */}
          {weatherData?.alerts?.length > 0 && (
            <div className="space-y-2">
              {weatherData?.alerts?.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <Icon name={alert?.icon} size={16} className="text-warning mt-0.5" />
                  <p className="text-sm text-foreground">{alert?.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherForecastCard;