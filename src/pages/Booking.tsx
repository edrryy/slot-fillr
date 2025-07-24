import { useState } from "react";
import { BookingCalendar } from "@/components/BookingCalendar";
import { TimeSlotGrid } from "@/components/TimeSlotGrid";
import { BookingForm } from "@/components/BookingForm";
import { VenueSelector, type Venue } from "@/components/VenueSelector";
import { MapPin, Calendar, Clock, CheckCircle } from "lucide-react";

export default function Booking() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setSelectedDate(undefined); // Reset date when venue changes
    setSelectedSlot(null); // Reset selected slot when venue changes
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleBookingComplete = () => {
    setBookingComplete(true);
    // Reset form after a delay
    setTimeout(() => {
      setSelectedVenue(null);
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setBookingComplete(false);
    }, 5000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center p-12 bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl border border-success/20">
            <CheckCircle className="mx-auto h-16 w-16 text-success mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
            </p>
            <div className="text-sm text-muted-foreground">
              Redirecting to booking form in a few seconds...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your preferred date and time slot. Each slot has limited availability,
            so book early to secure your appointment.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className={`flex items-center space-x-2 ${selectedVenue ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                selectedVenue ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
              }`}>
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm md:text-base">Select PKM</span>
            </div>
            
            <div className={`w-4 md:w-8 h-0.5 ${selectedVenue ? 'bg-primary' : 'bg-muted'}`} />
            
            <div className={`flex items-center space-x-2 ${selectedDate ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                selectedDate ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
              }`}>
                <Calendar className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm md:text-base">Select Date</span>
            </div>
            
            <div className={`w-4 md:w-8 h-0.5 ${selectedDate ? 'bg-primary' : 'bg-muted'}`} />
            
            <div className={`flex items-center space-x-2 ${selectedSlot ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                selectedSlot ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
              }`}>
                <Clock className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm md:text-base">Select Time</span>
            </div>
            
            <div className={`w-4 md:w-8 h-0.5 ${selectedSlot ? 'bg-primary' : 'bg-muted'}`} />
            
            <div className={`flex items-center space-x-2 ${selectedSlot ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                selectedSlot ? 'border-primary' : 'border-muted-foreground'
              }`}>
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm md:text-base">Book</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Venue Selection */}
          {!selectedVenue && (
            <VenueSelector
              selectedVenue={selectedVenue}
              onVenueSelect={handleVenueSelect}
            />
          )}

          {/* Calendar and Time Slots */}
          {selectedVenue && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <BookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Time Slots */}
              <div className="lg:col-span-2">
                <TimeSlotGrid
                  selectedVenue={selectedVenue}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  onSlotSelect={handleSlotSelect}
                />
              </div>
            </div>
          )}
        </div>

        {/* Booking Form */}
        {selectedVenue && (
          <div className="mt-8">
            <BookingForm
              selectedVenue={selectedVenue}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onBookingComplete={handleBookingComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}