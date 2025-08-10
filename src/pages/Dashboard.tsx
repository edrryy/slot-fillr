import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, MapPin, User, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Dummy booking data
const dummyBookings = [
  {
    id: "BK001",
    pkm: "PKM Sehat Jiwa Jakarta",
    date: "2024-01-15",
    time: "09:00",
    patientName: "John Doe",
    status: "pending" as const,
    createdAt: "2024-01-10",
  },
  {
    id: "BK002",
    pkm: "PKM Mental Health Bandung",
    date: "2024-01-14",
    time: "14:30",
    patientName: "Jane Smith",
    status: "completed" as const,
    createdAt: "2024-01-08",
  },
  {
    id: "BK003",
    pkm: "PKM Sehat Jiwa Jakarta",
    date: "2024-01-13",
    time: "11:00",
    patientName: "Mike Johnson",
    status: "cancelled" as const,
    createdAt: "2024-01-07",
  },
  {
    id: "BK004",
    pkm: "PKM Wellness Surabaya",
    date: "2024-01-12",
    time: "16:00",
    patientName: "Sarah Wilson",
    status: "no-show" as const,
    createdAt: "2024-01-05",
  },
  {
    id: "BK005",
    pkm: "PKM Mental Health Bandung",
    date: "2024-01-11",
    time: "10:30",
    patientName: "David Brown",
    status: "completed" as const,
    createdAt: "2024-01-04",
  },
  {
    id: "BK006",
    pkm: "PKM Sehat Jiwa Jakarta",
    date: "2024-01-16",
    time: "13:00",
    patientName: "Lisa Davis",
    status: "pending" as const,
    createdAt: "2024-01-11",
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500", variant: "secondary" as const },
  completed: { label: "Completed", color: "bg-green-500", variant: "default" as const },
  cancelled: { label: "Cancelled", color: "bg-red-500", variant: "destructive" as const },
  "no-show": { label: "No Show", color: "bg-gray-500", variant: "outline" as const },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = activeTab === "all" 
    ? dummyBookings 
    : dummyBookings.filter(booking => booking.status === activeTab);

  const getStatusCounts = () => {
    return {
      all: dummyBookings.length,
      pending: dummyBookings.filter(b => b.status === "pending").length,
      completed: dummyBookings.filter(b => b.status === "completed").length,
      cancelled: dummyBookings.filter(b => b.status === "cancelled").length,
      "no-show": dummyBookings.filter(b => b.status === "no-show").length,
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Dashboard</h1>
            <p className="text-muted-foreground">Manage and monitor all your mental health appointments</p>
          </div>
          <Link to="/booking">
            <Button>New Booking</Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.all}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{counts.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{counts.cancelled}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">No Show</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{counts["no-show"]}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
            <CardDescription>View and manage all your mental health appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({counts.completed})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({counts.cancelled})</TabsTrigger>
                <TabsTrigger value="no-show">No Show ({counts["no-show"]})</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>PKM Center</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {booking.pkm}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {booking.patientName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {booking.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[booking.status].variant}>
                            {statusConfig[booking.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}