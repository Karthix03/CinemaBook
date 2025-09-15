'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Ticket, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Booking } from '@/contexts/BookingContext';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, [user, router]);

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= new Date() && booking.status === 'confirmed';
  });

  const pastBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < new Date() || booking.status === 'cancelled';
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <User className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
            </div>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold">{bookings.length}</p>
                  </div>
                  <Ticket className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold">
                      ₹{bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}
                    </p>
                  </div>
                  <div className="text-primary text-2xl font-bold">₹</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="past">Booking History</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No upcoming bookings
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Book your next movie experience now!
                    </p>
                    <Button onClick={() => router.push('/')}>
                      Browse Movies
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{booking.movieTitle}</CardTitle>
                            <div className="flex items-center space-x-1 text-gray-600 mt-1">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{booking.theaterName}</span>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-green-600">
                            {booking.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{booking.showtime}</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Seats: {booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                            </p>
                            <p className="font-semibold">Total: ₹{booking.totalAmount}</p>
                          </div>
                          
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push(`/booking/confirmation/${booking.id}`)}
                          >
                            View Ticket
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No booking history
                    </h3>
                    <p className="text-gray-500">
                      Your past bookings will appear here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{booking.movieTitle}</CardTitle>
                            <div className="flex items-center space-x-1 text-gray-600 mt-1">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{booking.theaterName}</span>
                            </div>
                          </div>
                          <Badge
                            variant={booking.status === 'confirmed' ? 'secondary' : 'destructive'}
                          >
                            {booking.status === 'confirmed' ? 'completed' : booking.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{booking.showtime}</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Seats: {booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                            </p>
                            <p className="font-semibold">Total: ₹{booking.totalAmount}</p>
                          </div>
                          
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push(`/booking/confirmation/${booking.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}