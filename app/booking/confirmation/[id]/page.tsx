'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Share, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { Booking } from '@/contexts/BookingContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function BookingConfirmation() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // Get booking from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const foundBooking = savedBookings.find((b: Booking) => b.id === params.id);
    
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleDownload = () => {
    if (!booking) return;

    // Create ticket content
    const ticketContent = `
CINEMABOOK - MOVIE TICKET
========================

Booking ID: ${booking.id}
Movie: ${booking.movieTitle}
Theater: ${booking.theaterName}
Date: ${format(new Date(booking.date), 'EEE, MMM dd, yyyy')}
Time: ${booking.showtime}
Seats: ${booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
Total Amount: ₹${booking.totalAmount}
Status: ${booking.status.toUpperCase()}

IMPORTANT INSTRUCTIONS:
• Please arrive 30 minutes before showtime
• Carry valid ID proof for verification
• Show this ticket for entry
• Outside food and drinks not allowed
• Keep mobile phones on silent mode

Thank you for choosing CinemaBook!
========================
    `.trim();

    // Create and download the file
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CinemaBook-Ticket-${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success('Ticket downloaded successfully!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Movie Ticket',
        text: `My booking for ${booking?.movieTitle} is confirmed!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Booking link copied to clipboard!');
    }
  };

  if (!booking) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
            <Button onClick={() => router.push('/')}>Go back to home</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your movie tickets have been booked successfully</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ticket Details */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Movie Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{booking.movieTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{booking.theaterName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{format(new Date(booking.date), 'EEE, MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{booking.showtime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{booking.seats.length} seat(s)</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Seats */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Selected Seats</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {booking.seats.map((seat) => (
                        <Badge
                          key={seat.id}
                          variant={seat.type === 'premium' ? 'default' : 'secondary'}
                          className="justify-center"
                        >
                          {seat.row}{seat.number}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* QR Code Section */}
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="w-32 h-32 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">QR CODE</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Show this QR code at the theater entrance
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-center">
                <Button onClick={handleDownload} className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Ticket</span>
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex items-center space-x-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Booking ID</span>
                      <span className="text-sm font-medium">{booking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Booking Date</span>
                      <span className="text-sm font-medium">
                        {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant="default" className="bg-green-600">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-semibold">Payment Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Tickets ({booking.seats.length})</span>
                        <span>₹{booking.totalAmount - (booking.seats.length * 20)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Convenience Fee</span>
                        <span>₹{booking.seats.length * 20}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total Paid</span>
                      <span>₹{booking.totalAmount}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/dashboard')}
                  >
                    View All Bookings
                  </Button>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Important Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Please arrive at least 30 minutes before showtime</p>
                  <p>• Carry a valid ID proof for verification</p>
                  <p>• Show the QR code for entry</p>
                  <p>• Outside food and drinks are not allowed</p>
                  <p>• Mobile phones should be on silent mode</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}