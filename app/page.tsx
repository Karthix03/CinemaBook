'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { mockMovies } from '@/data/mockData';
import { Movie } from '@/contexts/BookingContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const genres = useMemo(() => {
    const allGenres = mockMovies.flatMap(movie => 
      movie.genre.split(', ').map(g => g.trim())
    );
    return ['all', ...Array.from(new Set(allGenres))];
  }, []);

  const languages = useMemo(() => {
    const allLanguages = mockMovies.map(movie => movie.language);
    return ['all', ...Array.from(new Set(allLanguages))];
  }, []);

  const filterMovies = (movies: Movie[]) => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || movie.language === selectedLanguage;
      
      return matchesSearch && matchesGenre && matchesLanguage;
    });
  };

  const currentlyPlaying = filterMovies(mockMovies.filter(movie => movie.status === 'playing'));
  const upcomingMovies = filterMovies(mockMovies.filter(movie => movie.status === 'upcoming'));

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <div className="cinema-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your Perfect Movie Experience
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover the latest movies, choose your favorite theaters, and enjoy seamless booking
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-gray-800"
                  />
                </div>
                
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>
                        {genre === 'all' ? 'All Genres' : genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language} value={language}>
                        {language === 'all' ? 'All Languages' : language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="playing" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="playing">Currently Playing</TabsTrigger>
              <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
            </TabsList>

            <TabsContent value="playing">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Currently Playing</h2>
                <p className="text-gray-600">Book your tickets now for these movies</p>
              </div>
              
              {currentlyPlaying.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No movies found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentlyPlaying.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
                <p className="text-gray-600">Get ready for these upcoming blockbusters</p>
              </div>
              
              {upcomingMovies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No upcoming movies found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {upcomingMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
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