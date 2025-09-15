'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Seat } from '@/contexts/BookingContext';

interface SeatMapProps {
  seatMap: Seat[][];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export default function SeatMap({ seatMap, selectedSeats, onSeatSelect }: SeatMapProps) {
  const isSeatSelected = (seat: Seat) => {
    return selectedSeats.some(s => s.id === seat.id);
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;
    onSeatSelect(seat);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Screen */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-3 rounded-full mx-auto w-3/4 mb-2"></div>
        <p className="text-center text-sm text-gray-600 font-medium">SCREEN</p>
      </div>

      {/* Seat Map */}
      <div className="space-y-3">
        {seatMap.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center items-center space-x-2">
            {/* Row Label */}
            <div className="w-6 text-center font-medium text-gray-600">
              {row[0]?.row}
            </div>
            
            {/* Seats */}
            <div className="flex space-x-1">
              {row.map((seat, seatIndex) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.status === 'booked'}
                  className={cn(
                    'w-8 h-8 rounded-t-lg border-2 border-gray-300 text-xs font-medium transition-all duration-200 hover:scale-105',
                    {
                      // Available seats
                      'bg-gray-100 hover:bg-green-100 hover:border-green-400': 
                        seat.status === 'available' && !isSeatSelected(seat) && seat.type === 'regular',
                      // Premium available seats
                      'bg-yellow-100 hover:bg-yellow-200 hover:border-yellow-400': 
                        seat.status === 'available' && !isSeatSelected(seat) && seat.type === 'premium',
                      // Selected regular seats
                      'bg-green-500 border-green-600 text-white': 
                        isSeatSelected(seat) && seat.type === 'regular',
                      // Selected premium seats
                      'bg-yellow-500 border-yellow-600 text-white': 
                        isSeatSelected(seat) && seat.type === 'premium',
                      // Booked seats
                      'bg-red-400 border-red-500 text-white cursor-not-allowed': 
                        seat.status === 'booked',
                    }
                  )}
                >
                  {seat.number}
                </button>
              ))}
            </div>
            
            {/* Row Label (Right side) */}
            <div className="w-6 text-center font-medium text-gray-600">
              {row[0]?.row}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded-t"></div>
          <span>Available (₹200)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded-t"></div>
          <span>Premium (₹300)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 border border-green-600 rounded-t"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-400 border border-red-500 rounded-t"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}