'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Clock, Calendar, Users, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { mockMovies } from '@/data/mockData';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function MovieDetails() {
  const params = useParams();
  const router = useRouter();
  const { setSelectedMovie } = useBooking();
  const { user } = useAuth();
  const [movie, setMovie] = useState(mockMovies.find(m => m.id === params.id));

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
            <Button onClick={() => router.push('/')}>Go back to home</Button>
          </div>
        </div>
      </>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book tickets');
      router.push('/login');
      return;
    }

    if (movie.status === 'upcoming') {
      toast.error('This movie is not yet available for booking');
      return;
    }

    setSelectedMovie(movie);
    router.push(`/movie/${movie.id}/theaters`);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <Card className="overflow-hidden shadow-2xl">
                    <div className="aspect-[3/4] w-64 relative">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Card>
                </div>

                {/* Movie Details */}
                <div className="flex-1 text-white space-y-4">
                  <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-white hover:bg-white/20 mb-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  <div className="space-y-2">
                    <Badge
                      variant={movie.status === 'playing' ? 'default' : 'secondary'}
                      className="bg-primary text-white"
                    >
                      {movie.status === 'playing' ? 'Now Playing' : 'Coming Soon'}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                  </div>

                  <div className="flex flex-wrap items-center space-x-6 text-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{movie.rating}/10</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{movie.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{new Date(movie.releaseDate).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-lg font-semibold">{movie.genre}</p>
                    <p className="text-base opacity-90">{movie.language} • {movie.certificate}</p>
                  </div>

                  <p className="text-lg leading-relaxed max-w-3xl">
                    {movie.description}
                  </p>

                  <div className="pt-4">
                    <Button
                      onClick={handleBookNow}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                      disabled={movie.status === 'upcoming'}
                    >
                      {movie.status === 'upcoming' ? 'Coming Soon' : 'Book Tickets'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast and Crew */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Cast
                </h3>
                <div className="space-y-2">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-gray-700">{actor}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-600">Director:</span>
                    <p className="text-gray-700">{movie.director}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Release Date:</span>
                    <p className="text-gray-700">
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Duration:</span>
                    <p className="text-gray-700">{movie.duration} minutes</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Certificate:</span>
                    <p className="text-gray-700">{movie.certificate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}