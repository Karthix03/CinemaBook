'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { mockMovies } from '@/data/mockData';
import { Movie } from '@/contexts/BookingContext';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Movies</h1>
            
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for movies, genres, actors, or directors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="mb-6">
            {searchQuery.trim() && (
              <p className="text-gray-600">
                {filteredMovies.length > 0 
                  ? `Found ${filteredMovies.length} result${filteredMovies.length === 1 ? '' : 's'} for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`
                }
              </p>
            )}
          </div>

          {/* Movies Grid */}
          {searchQuery.trim() ? (
            filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No movies found
                </h3>
                <p className="text-gray-500">
                  Try searching with different keywords or browse all movies
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Start searching
              </h3>
              <p className="text-gray-500">
                Enter a movie title, genre, actor, or director to find movies
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}