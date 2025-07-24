import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  total: number;
}

interface TimeSlotGridProps {
  selectedDate: Date | undefined;
  selectedSlot: string | null;
  onSlotSelect: (slotId: string) => void;
}

// Mock data - in a real app, this would come from an API
const generateTimeSlots = (date: Date | undefined): TimeSlot[] => {
  if (!date) return [];
  
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 17;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const randomAvailable = Math.floor(Math.random() * 5);
      const total = 5;
      
      slots.push({
        id: `${date.toISOString().split('T')[0]}-${timeString}`,
        time: timeString,
        available: randomAvailable,
        total,
      });
    }
  }
  
  return slots;
};

export function TimeSlotGrid({ selectedDate, selectedSlot, onSlotSelect }: TimeSlotGridProps) {
  const timeSlots = generateTimeSlots(selectedDate);

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
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Available Times - {selectedDate.toLocaleDateString()}
      </h2>
      
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