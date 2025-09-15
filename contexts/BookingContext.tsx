'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  rating: number;
  poster: string;
  description: string;
  trailer?: string;
  releaseDate: string;
  language: string;
  certificate: string;
  cast: string[];
  director: string;
  status: 'upcoming' | 'playing';
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  showtimes: string[];
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  type: string;
  totalSeats: number;
  seatMap: Seat[][];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium';
  status: 'available' | 'booked' | 'selected';
  price: number;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  theaterId: string;
  theaterName: string;
  screenId: string;
  showtime: string;
  date: string;
  seats: Seat[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedTheater: Theater | null;
  selectedScreen: Screen | null;
  selectedShowtime: string | null;
  selectedDate: string | null;
  selectedSeats: Seat[];
  bookings: Booking[];
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedTheater: (theater: Theater | null) => void;
  setSelectedScreen: (screen: Screen | null) => void;
  setSelectedShowtime: (showtime: string | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedSeats: (seats: Seat[]) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => string;
  clearSelection: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>): string => {
    const bookingId = `BK${Date.now()}`;
    const newBooking: Booking = {
      ...bookingData,
      id: bookingId,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    setBookings(prev => [...prev, newBooking]);
    
    // Save to localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...savedBookings, newBooking]));
    
    return bookingId;
  };

  const clearSelection = () => {
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedScreen(null);
    setSelectedShowtime(null);
    setSelectedDate(null);
    setSelectedSeats([]);
  };

  return (
    <BookingContext.Provider value={{
      selectedMovie,
      selectedTheater,
      selectedScreen,
      selectedShowtime,
      selectedDate,
      selectedSeats,
      bookings,
      setSelectedMovie,
      setSelectedTheater,
      setSelectedScreen,
      setSelectedShowtime,
      setSelectedDate,
      setSelectedSeats,
      addBooking,
      clearSelection
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}