import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Venue {
  id: string;
  name: string;
  location: string;
  description: string;
  operatingHours: string;
  totalSlots: number;
  availableToday: number;
}

interface VenueSelectorProps {
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
}

// Mock data - in a real app, this would come from an API
const mockVenues: Venue[] = [
  {
    id: "pkm-1",
    name: "Downtown Medical Center",
    location: "123 Main Street, Downtown",
    description: "Full-service medical center with modern facilities",
    operatingHours: "8:00 AM - 6:00 PM",
    totalSlots: 40,
    availableToday: 15,
  },
  {
    id: "pkm-2", 
    name: "Northside Health Clinic",
    location: "456 North Avenue, Northside",
    description: "Specialized clinic with expert healthcare professionals",
    operatingHours: "9:00 AM - 5:00 PM",
    totalSlots: 25,
    availableToday: 8,
  },
  {
    id: "pkm-3",
    name: "Westfield Family Practice",
    location: "789 West Boulevard, Westfield",
    description: "Family-oriented practice with comprehensive care",
    operatingHours: "7:30 AM - 7:00 PM",
    totalSlots: 35,
    availableToday: 22,
  },
  {
    id: "pkm-4",
    name: "Eastgate Wellness Center",
    location: "321 East Side Drive, Eastgate",
    description: "Wellness-focused center with holistic approach",
    operatingHours: "8:30 AM - 5:30 PM",
    totalSlots: 20,
    availableToday: 5,
  },
];

export function VenueSelector({ selectedVenue, onVenueSelect }: VenueSelectorProps) {
  return (
    <Card className="p-6 shadow-[var(--shadow-soft)]">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Select PKM/Venue</h2>
      <p className="text-muted-foreground mb-6">Choose your preferred location for the appointment</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockVenues.map((venue) => {
          const isSelected = selectedVenue?.id === venue.id;
          const isLowAvailability = venue.availableToday < 10;
          
          return (
            <Button
              key={venue.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onVenueSelect(venue)}
              className={cn(
                "h-auto p-4 flex flex-col gap-3 text-left transition-[var(--transition-smooth)]",
                isSelected && "shadow-[var(--shadow-medium)]",
                !isSelected && "hover:shadow-[var(--shadow-soft)] hover:scale-105"
              )}
            >
              <div className="w-full">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{venue.name}</h3>
                  <Badge 
                    variant={venue.availableToday > 0 ? (isLowAvailability ? "secondary" : "default") : "destructive"}
                    className="text-xs ml-2"
                  >
                    {venue.availableToday > 0 ? `${venue.availableToday} slots` : "Full"}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{venue.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{venue.operatingHours}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {venue.description}
                </p>
              </div>
            </Button>
          );
        })}
      </div>
      
      {mockVenues.every(venue => venue.availableToday === 0) && (
        <div className="text-center mt-8 p-6 bg-muted rounded-lg">
          <Calendar className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            No venues have available slots today. Please try selecting a different date.
          </p>
        </div>
      )}
    </Card>
  );
}