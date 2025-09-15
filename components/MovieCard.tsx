'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/contexts/BookingContext';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge
              variant={movie.status === 'playing' ? 'default' : 'secondary'}
              className="bg-black/70 text-white"
            >
              {movie.status === 'playing' ? 'Now Playing' : 'Coming Soon'}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-1 bg-black/70 rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">{movie.rating}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {movie.genre}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{movie.duration} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}