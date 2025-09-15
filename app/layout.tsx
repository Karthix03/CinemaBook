import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CinemaBook - Book Movie Tickets Online',
  description: 'Book movie tickets online with ease. Choose from latest movies, select your seats, and enjoy the best cinema experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <BookingProvider>
            {children}
            <Toaster />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}