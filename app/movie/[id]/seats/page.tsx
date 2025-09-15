'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Users, Clock, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import SeatMap from '@/components/SeatMap';
import { useBooking, Seat } from '@/contexts/BookingContext';
import { format } from 'date-fns';

export default function SeatSelection() {
  const params = useParams();
  const router = useRouter();
  const {
    selectedMovie,
    selectedTheater,
    selectedScreen,
    selectedShowtime,
    selectedDate,
    selectedSeats,
    setSelectedSeats,
    setSelectedScreen
  } = useBooking();

  const [seatMap, setSeatMap] = useState<Seat[][]>([]);

  useEffect(() => {
    if (!selectedMovie || !selectedTheater || !selectedShowtime || !selectedDate) {
      router.push(`/movie/${params.id}`);
      return;
    }

    // Set default screen if not selected
    if (!selectedScreen && selectedTheater.screens.length > 0) {
      setSelectedScreen(selectedTheater.screens[0]);
    }
  }, [selectedMovie, selectedTheater, selectedScreen, selectedShowtime, selectedDate]);

  useEffect(() => {
    if (selectedScreen) {
      setSeatMap(selectedScreen.seatMap);
    }
  }, [selectedScreen]);

  const handleSeatSelect = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 10) {
        alert('You can select maximum 10 seats');
        return;
      }
      setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
    }
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const convenienceFee = selectedSeats.length * 20;
  const grandTotal = totalAmount + convenienceFee;

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    router.push(`/movie/${params.id}/payment`);
  };

  if (!selectedMovie || !selectedTheater || !selectedScreen) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid booking session</h1>
            <Button onClick={() => router.push('/')}>Start over</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Select Seats</h1>
              <div className="flex items-center space-x-4 text-gray-600 mt-1">
                <span>{selectedMovie.title}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedTheater.name}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedShowtime}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedDate ? format(new Date(selectedDate), 'MMM dd, yyyy') : ''}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Seat Map */}
            <div className="xl:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <span>{selectedScreen.name}</span>
                      <Badge variant="secondary">{selectedScreen.type}</Badge>
                    </CardTitle>
                    <span className="text-sm text-gray-500">
                      {selectedSeats.length} of {selectedScreen.totalSeats} selected
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <SeatMap
                    seatMap={seatMap}
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelect}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Booking Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Movie Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">{selectedMovie.title}</h4>
                    <p className="text-sm text-gray-600">{selectedTheater.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedDate ? format(new Date(selectedDate), 'EEE, MMM dd, yyyy') : ''} • {selectedShowtime}
                    </p>
                    <Badge variant="outline">{selectedScreen.name} - {selectedScreen.type}</Badge>
                  </div>

                  <Separator />

                  {/* Selected Seats */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Selected Seats</h4>
                    {selectedSeats.length === 0 ? (
                      <p className="text-sm text-gray-500">No seats selected</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {selectedSeats.map((seat) => (
                          <Badge
                            key={seat.id}
                            variant={seat.type === 'premium' ? 'default' : 'secondary'}
                            className="justify-center"
                          >
                            {seat.row}{seat.number}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Price Breakdown</h4>
                    {selectedSeats.map((seat) => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span>{seat.row}{seat.number} ({seat.type})</span>
                        <span>₹{seat.price}</span>
                      </div>
                    ))}
                    
                    {selectedSeats.length > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Convenience Fee</span>
                          <span>₹{convenienceFee}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{grandTotal}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleProceedToPayment}
                    disabled={selectedSeats.length === 0}
                  >
                    Proceed to Payment
                    {selectedSeats.length > 0 && ` (₹${grandTotal})`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}