import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, User, Mail, Phone, MessageSquare, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Venue } from "@/components/VenueSelector";

interface BookingFormProps {
  selectedVenue: Venue;
  selectedDate: Date | undefined;
  selectedSlot: string | null;
  onBookingComplete: () => void;
}

export function BookingForm({ selectedVenue, selectedDate, selectedSlot, onBookingComplete }: BookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVenue || !selectedDate || !selectedSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a venue, date and time slot.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment has been scheduled at ${selectedVenue.name} for ${selectedDate.toLocaleDateString()} at ${selectedSlot.split('-')[2]}.`,
    });
    
    setIsSubmitting(false);
    onBookingComplete();
  };

  if (!selectedVenue || !selectedDate || !selectedSlot) {
    return (
      <Card className="p-8 text-center shadow-[var(--shadow-soft)]">
        <CalendarCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">
          Select a venue, date and time to continue with your booking
        </h3>
      </Card>
    );
  }

  const selectedTime = selectedSlot.split('-')[2];

  return (
    <Card className="p-6 shadow-[var(--shadow-soft)]">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Complete Your Booking</h2>
      
      {/* Booking Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg mb-6 border border-primary/10">
        <h3 className="font-medium text-sm text-primary mb-2">Appointment Details</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{selectedVenue.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-primary" />
            <span>{selectedDate.toLocaleDateString()} at {selectedTime}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Additional Notes
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Any additional information or special requests"
            rows={3}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]"
        >
          {isSubmitting ? "Confirming Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </Card>
  );
}