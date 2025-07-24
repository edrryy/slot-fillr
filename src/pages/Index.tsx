import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Easy Appointment Booking
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Schedule your appointments with ease. Select from available time slots 
            and book instantly with our simple booking system.
          </p>
          <Link to="/booking">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]"
            >
              Book Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Easy Date Selection</h3>
            <p className="text-sm text-muted-foreground">
              Pick your preferred date with our intuitive calendar interface
            </p>
          </Card>

          <Card className="p-6 text-center shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]">
            <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Flexible Time Slots</h3>
            <p className="text-sm text-muted-foreground">
              Choose from available time slots that fit your schedule
            </p>
          </Card>

          <Card className="p-6 text-center shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Limited Availability</h3>
            <p className="text-sm text-muted-foreground">
              Each slot has a quota to ensure quality service for everyone
            </p>
          </Card>

          <Card className="p-6 text-center shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Instant Confirmation</h3>
            <p className="text-sm text-muted-foreground">
              Get immediate confirmation and email notifications
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
