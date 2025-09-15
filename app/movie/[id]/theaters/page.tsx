'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Clock, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import { mockTheaters } from '@/data/mockData';
import { useBooking } from '@/contexts/BookingContext';
import { cn } from '@/lib/utils';

export default function TheaterSelection() {
  const params = useParams();
  const router = useRouter();
  const { selectedMovie, setSelectedTheater, setSelectedShowtime, setSelectedDate, selectedDate } = useBooking();
  const [date, setDate] = useState<Date>(selectedDate ? new Date(selectedDate) : new Date());

  if (!selectedMovie) {
    router.push(`/movie/${params.id}`);
    return null;
  }

  const handleTheaterSelect = (theater: any, showtime: string) => {
    setSelectedTheater(theater);
    setSelectedShowtime(showtime);
    setSelectedDate(format(date, 'yyyy-MM-dd'));
    router.push(`/movie/${params.id}/seats`);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedMovie.title}</h1>
                <p className="text-gray-600">Select theater and showtime</p>
              </div>
            </div>

            {/* Date Selector */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Theaters List */}
          <div className="space-y-6">
            {mockTheaters.map((theater) => (
              <Card key={theater.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{theater.name}</CardTitle>
                      <div className="flex items-center text-gray-600 space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{theater.location}</span>
                        </div>
                        <span>•</span>
                        <span>{theater.distance}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {theater.screens.map((screen) => (
                      <div key={screen.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold">{screen.name}</h4>
                            <Badge variant="secondary">{screen.type}</Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {screen.totalSeats} seats
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {theater.showtimes.map((showtime, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="flex items-center justify-center space-x-2 h-12 hover:bg-primary hover:text-white transition-colors"
                              onClick={() => handleTheaterSelect(theater, showtime)}
                            >
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{showtime}</span>
                            </Button>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                          <span>Regular: ₹200 • Premium: ₹300</span>
                          <span className="text-green-600 font-medium">Available</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No theaters message */}
          {mockTheaters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No theaters available for this movie on the selected date
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}