import { Movie, Theater, Screen, Seat } from '@/contexts/BookingContext';

// Generate seat map
const generateSeatMap = (rows: number, seatsPerRow: number): Seat[][] => {
  const seatMap: Seat[][] = [];
  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  for (let row = 0; row < rows; row++) {
    const seatRow: Seat[] = [];
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const isPremium = row < 3; // First 3 rows are premium
      seatRow.push({
        id: `${rowLabels[row]}${seat}`,
        row: rowLabels[row],
        number: seat,
        type: isPremium ? 'premium' : 'regular',
        status: Math.random() > 0.3 ? 'available' : 'booked', // 70% available
        price: isPremium ? 300 : 200
      });
    }
    seatMap.push(seatRow);
  }
  return seatMap;
};

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Avengers: Endgame',
    genre: 'Action, Adventure, Sci-Fi',
    duration: 181,
    rating: 8.4,
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    releaseDate: '2025-05-15',
    language: 'English',
    certificate: 'PG-13',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
    director: 'Anthony Russo, Joe Russo',
    status: 'playing'
  },
  {
    id: '2',
    title: 'The Batman',
    genre: 'Action, Crime, Drama',
    duration: 176,
    rating: 7.8,
    poster: 'https://images.pexels.com/photos/7991102/pexels-photo-7991102.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'When a killer targets Gotham\'s elite with a series of sadistic machinations, a trail of cryptic clues sends the World\'s Greatest Detective on an investigation into the underworld.',
    releaseDate: '2025-03-22',
    language: 'English',
    certificate: 'PG-13',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright'],
    director: 'Matt Reeves',
    status: 'playing'
  },
  {
    id: '3',
    title: 'Top Gun: Maverick',
    genre: 'Action, Drama',
    duration: 131,
    rating: 8.3,
    poster: 'https://images.pexels.com/photos/7991464/pexels-photo-7991464.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on a mission.',
    releaseDate: '2025-04-10',
    language: 'English',
    certificate: 'PG-13',
    cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
    director: 'Joseph Kosinski',
    status: 'playing'
  },
  {
    id: '4',
    title: 'Doctor Strange: Multiverse',
    genre: 'Action, Adventure, Fantasy',
    duration: 126,
    rating: 6.9,
    poster: 'https://images.pexels.com/photos/7991328/pexels-photo-7991328.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Doctor Strange teams up with a mysterious young woman who can travel across multiverses, to battle other-universe versions of himself.',
    releaseDate: '2025-06-20',
    language: 'English',
    certificate: 'PG-13',
    cast: ['Benedict Cumberbatch', 'Elizabeth Olsen', 'Chiwetel Ejiofor', 'Benedict Wong'],
    director: 'Sam Raimi',
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Black Panther: Forever',
    genre: 'Action, Adventure, Drama',
    duration: 161,
    rating: 6.7,
    poster: 'https://images.pexels.com/photos/7991237/pexels-photo-7991237.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T\'Challa.',
    releaseDate: '2025-07-15',
    language: 'English',
    certificate: 'PG-13',
    cast: ['Letitia Wright', 'Angela Bassett', 'Tenoch Huerta', 'Danai Gurira'],
    director: 'Ryan Coogler',
    status: 'upcoming'
  },
  {
    id: '6',
    title: 'Spider-Man: New Universe',
    genre: 'Action, Adventure, Sci-Fi',
    duration: 148,
    rating: 7.5,
    poster: 'https://images.pexels.com/photos/7991520/pexels-photo-7991520.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Peter Parker navigates his complicated dual life as the web-slinging superhero Spider-Man in this new adventure across the multiverse.',
    releaseDate: '2025-08-30',
    language: 'English',
    certificate: 'PG-13',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Jacob Batalon'],
    director: 'Jon Watts',
    status: 'upcoming'
  }
];

export const mockTheaters: Theater[] = [
  {
    id: '1',
    name: 'PVR Cinemas Phoenix',
    location: 'Phoenix Mall, Lower Parel',
    distance: '2.5 km',
    showtimes: ['10:30 AM', '1:45 PM', '5:00 PM', '8:15 PM', '11:30 PM'],
    screens: [
      {
        id: 'screen1',
        name: 'Audi 1',
        type: 'IMAX',
        totalSeats: 120,
        seatMap: generateSeatMap(8, 15)
      },
      {
        id: 'screen2',
        name: 'Audi 2',
        type: '4DX',
        totalSeats: 100,
        seatMap: generateSeatMap(7, 14)
      }
    ]
  },
  {
    id: '2',
    name: 'INOX Megaplex',
    location: 'R City Mall, Ghatkopar',
    distance: '5.2 km',
    showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
    screens: [
      {
        id: 'screen3',
        name: 'Screen 1',
        type: 'Dolby Atmos',
        totalSeats: 180,
        seatMap: generateSeatMap(10, 18)
      },
      {
        id: 'screen4',
        name: 'Screen 2',
        type: 'Regular',
        totalSeats: 150,
        seatMap: generateSeatMap(9, 16)
      }
    ]
  },
  {
    id: '3',
    name: 'Carnival Cinemas',
    location: 'Viviana Mall, Thane',
    distance: '8.7 km',
    showtimes: ['10:00 AM', '1:15 PM', '4:30 PM', '7:45 PM', '11:00 PM'],
    screens: [
      {
        id: 'screen5',
        name: 'Gold Class',
        type: 'Premium',
        totalSeats: 60,
        seatMap: generateSeatMap(5, 12)
      }
    ]
  }
];