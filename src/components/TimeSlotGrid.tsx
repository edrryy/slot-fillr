import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Venue } from "@/components/VenueSelector";

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  total: number;
}

interface TimeSlotGridProps {
  selectedVenue: Venue;
  selectedDate: Date | undefined;
  selectedSlot: string | null;
  onSlotSelect: (slotId: string) => void;
}

// Mock data - in a real app, this would come from an API
const generateTimeSlots = (venue: Venue, date: Date | undefined): TimeSlot[] => {
  if (!date || !venue) return [];
  
  const slots: TimeSlot[] = [];
  
  // Different venues have different operating hours
  const venueHours: Record<string, { start: number; end: number; slotSize: number }> = {
    'pkm-1': { start: 8, end: 18, slotSize: 30 }, // Downtown Medical Center
    'pkm-2': { start: 9, end: 17, slotSize: 30 }, // Northside Health Clinic
    'pkm-3': { start: 7, end: 19, slotSize: 30 }, // Westfield Family Practice (7:30 AM - 7:00 PM)
    'pkm-4': { start: 8, end: 17, slotSize: 60 }, // Eastgate Wellness Center (longer slots)
  };
  
  const { start: startHour, end: endHour, slotSize } = venueHours[venue.id] || { start: 9, end: 17, slotSize: 30 };
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotSize) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      // Different venues have different availability patterns
      const baseAvailability = venue.id === 'pkm-3' ? 8 : venue.id === 'pkm-4' ? 3 : 5;
      const randomAvailable = Math.floor(Math.random() * (baseAvailability + 1));
      const total = baseAvailability;
      
      slots.push({
        id: `${venue.id}-${date.toISOString().split('T')[0]}-${timeString}`,
        time: timeString,
        available: randomAvailable,
        total,
      });
    }
  }
  
  return slots;
};

export function TimeSlotGrid({ selectedVenue, selectedDate, selectedSlot, onSlotSelect }: TimeSlotGridProps) {
  const timeSlots = generateTimeSlots(selectedVenue, selectedDate);

  if (!selectedDate) {
    return (
      <Card className="p-8 text-center shadow-[var(--shadow-soft)]">
        <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">
          Select a date to view available time slots
        </h3>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-[var(--shadow-soft)]">
      <h2 className="text-xl font-semibold mb-2 text-foreground">
        Available Times - {selectedDate.toLocaleDateString()}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {selectedVenue.name} • {selectedVenue.operatingHours}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {timeSlots.map((slot) => {
          const isAvailable = slot.available > 0;
          const isSelected = selectedSlot === slot.id;
          
          return (
            <Button
              key={slot.id}
              variant={isSelected ? "default" : "outline"}
              disabled={!isAvailable}
              onClick={() => onSlotSelect(slot.id)}
              className={cn(
                "h-auto p-3 flex flex-col gap-2 transition-[var(--transition-smooth)]",
                isSelected && "shadow-[var(--shadow-medium)]",
                !isSelected && isAvailable && "hover:shadow-[var(--shadow-soft)] hover:scale-105",
                !isAvailable && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="font-medium text-sm">
                {slot.time}
              </div>
              
              <div className="flex items-center gap-1 text-xs">
                <Users className="h-3 w-3" />
                <span>
                  {slot.available}/{slot.total}
                </span>
              </div>
              
              <Badge 
                variant={isAvailable ? "secondary" : "destructive"}
                className="text-xs"
              >
                {isAvailable ? "Available" : "Full"}
              </Badge>
            </Button>
          );
        })}
      </div>
      
      {timeSlots.every(slot => slot.available === 0) && (
        <div className="text-center mt-8 p-6 bg-muted rounded-lg">
          <Users className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            No available slots for this date. Please select another date.
          </p>
        </div>
      )}
    </Card>
  );
}