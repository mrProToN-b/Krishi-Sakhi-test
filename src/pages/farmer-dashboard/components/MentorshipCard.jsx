import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MentorshipCard = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Organic Farming & Pest Management",
      experience: "15+ years",
      rating: 4.8,
      location: "Kerala Agricultural University",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "available",
      nextSlot: "Today 3:00 PM",
      expertise: ["Organic Farming", "Pest Control", "Soil Health"],
      languages: ["English", "Malayalam", "Hindi"]
    },
    {
      id: 2,
      name: "Prof. Meera Nair",
      specialization: "Crop Rotation & Sustainable Agriculture",
      experience: "12+ years",
      rating: 4.9,
      location: "ICAR Research Center",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "busy",
      nextSlot: "Tomorrow 10:00 AM",
      expertise: ["Crop Rotation", "Water Management", "Sustainable Farming"],
      languages: ["English", "Malayalam"]
    },
    {
      id: 3,
      name: "Mr. Suresh Pillai",
      specialization: "Market Analysis & Crop Planning",
      experience: "20+ years",
      rating: 4.7,
      location: "Agricultural Extension Office",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      status: "available",
      nextSlot: "Today 5:30 PM",
      expertise: ["Market Analysis", "Crop Planning", "Financial Planning"],
      languages: ["Malayalam", "Tamil", "English"]
    }
  ];

  const recentGuidance = [
    {
      id: 1,
      mentor: "Dr. Rajesh Kumar",
      topic: "Tomato Blight Prevention",
      date: "2025-09-15",
      duration: "30 min",
      rating: 5,
      summary: "Discussed preventive measures for early blight in tomatoes. Recommended copper-based fungicides and proper spacing."
    },
    {
      id: 2,
      mentor: "Prof. Meera Nair",
      topic: "Irrigation Schedule Optimization",
      date: "2025-09-12",
      duration: "45 min",
      rating: 5,
      summary: "Reviewed current irrigation practices and suggested drip irrigation system for water conservation."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'offline': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return 'bg-success/10 text-success';
      case 'busy': return 'bg-warning/10 text-warning';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Expert Mentorship
            </h3>
            <p className="text-sm text-muted-foreground">
              Get guidance from agricultural experts
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Calendar">
          Schedule
        </Button>
      </div>
      {!selectedMentor ? (
        <div className="space-y-4">
          {/* Available Mentors */}
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-foreground">Available Experts</h4>
            {mentors?.map((mentor) => (
              <div key={mentor?.id} className="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors duration-150 cursor-pointer"
                   onClick={() => setSelectedMentor(mentor)}>
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img 
                      src={mentor?.avatar} 
                      alt={mentor?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                      mentor?.status === 'available' ? 'bg-success' : 
                      mentor?.status === 'busy' ? 'bg-warning' : 'bg-muted-foreground'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-foreground">{mentor?.name}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {mentor?.specialization}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="Award" size={12} />
                            <span>{mentor?.experience}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning fill-current" />
                            <span>{mentor?.rating}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} />
                            <span>{mentor?.location}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(mentor?.status)}`}>
                          {mentor?.status}
                        </span>
                        <div className="text-xs text-muted-foreground mt-1">
                          Next: {mentor?.nextSlot}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Guidance */}
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-foreground">Recent Guidance</h4>
            {recentGuidance?.map((session) => (
              <div key={session?.id} className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground text-sm">{session?.topic}</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      with {session?.mentor}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {session?.summary}
                    </p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                      <span>{new Date(session.date)?.toLocaleDateString('en-IN')}</span>
                      <span>{session?.duration}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(session?.rating)]?.map((_, i) => (
                          <Icon key={i} name="Star" size={10} className="text-warning fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Mentor Detail View */
        (<div className="space-y-4 animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <button 
              onClick={() => setSelectedMentor(null)}
              className="p-1 rounded-md hover:bg-muted transition-colors duration-150"
            >
              <Icon name="ArrowLeft" size={16} />
            </button>
            <span className="text-sm text-muted-foreground">Back to mentors</span>
          </div>
          <div className="text-center">
            <img 
              src={selectedMentor?.avatar} 
              alt={selectedMentor?.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <h4 className="font-heading font-semibold text-lg text-foreground">
              {selectedMentor?.name}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedMentor?.specialization}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Award" size={14} />
                <span>{selectedMentor?.experience}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span>{selectedMentor?.rating}</span>
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-foreground mb-2">Expertise</h5>
              <div className="flex flex-wrap gap-2">
                {selectedMentor?.expertise?.map((skill, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-2">Languages</h5>
              <div className="flex flex-wrap gap-2">
                {selectedMentor?.languages?.map((lang, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button 
                variant="default" 
                fullWidth 
                iconName="Video"
                iconPosition="left"
                disabled={selectedMentor?.status !== 'available'}
              >
                {selectedMentor?.status === 'available' ? 'Start Video Call' : 'Currently Busy'}
              </Button>
              <Button variant="outline" fullWidth iconName="MessageCircle" iconPosition="left">
                Send Message
              </Button>
              <Button variant="ghost" fullWidth iconName="Calendar" iconPosition="left">
                Schedule Session
              </Button>
            </div>
          </div>
        </div>)
      )}
    </div>
  );
};

export default MentorshipCard;