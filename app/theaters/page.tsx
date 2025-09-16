'use client';

import { useState } from 'react';
import { MapPin, Clock, Star, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { mockTheaters } from '@/data/mockData';

export default function Theaters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');

  const areas = ['all', 'Lower Parel', 'Ghatkopar', 'Thane', 'Andheri', 'Bandra'];

  const filteredTheaters = mockTheaters.filter(theater => {
    const matchesSearch = theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theater.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === 'all' || theater.location.toLowerCase().includes(selectedArea.toLowerCase());
    
    return matchesSearch && matchesArea;
  });

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Movie Theaters</h1>
              <p className="text-gray-600">Find the best theaters near you</p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search theaters or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>
                        {area === 'all' ? 'All Areas' : area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Theaters List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredTheaters.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No theaters found
              </h3>
              <p className="text-gray-500">
                Try searching with different keywords or select a different area
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTheaters.map((theater) => (
                <Card key={theater.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{theater.name}</CardTitle>
                        <div className="flex items-center text-gray-600 space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{theater.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 space-x-2">
                          <Navigation className="h-4 w-4" />
                          <span className="text-sm">{theater.distance}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-100 rounded-full px-2 py-1">
                        <Star className="h-3 w-3 text-green-600 fill-current" />
                        <span className="text-green-600 text-sm font-medium">4.2</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Screens */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Available Screens</h4>
                      <div className="flex flex-wrap gap-2">
                        {theater.screens.map((screen) => (
                          <Badge key={screen.id} variant="secondary" className="text-xs">
                            {screen.name} - {screen.type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Showtimes */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Today's Shows</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {theater.showtimes.slice(0, 4).map((showtime, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center space-x-1 bg-gray-100 rounded px-2 py-1"
                          >
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-xs font-medium">{showtime}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Parking</Badge>
                        <Badge variant="outline" className="text-xs">Food Court</Badge>
                        <Badge variant="outline" className="text-xs">AC</Badge>
                        <Badge variant="outline" className="text-xs">Wheelchair</Badge>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        className="w-full" 
                        onClick={() => window.location.href = '/'}
                      >
                        View Movies
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}