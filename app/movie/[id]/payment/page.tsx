'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle, Users, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

export default function Payment() {
  const params = useParams();
  const router = useRouter();
  const {
    selectedMovie,
    selectedTheater,
    selectedScreen,
    selectedShowtime,
    selectedDate,
    selectedSeats,
    addBooking,
    clearSelection
  } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedMovie || !selectedTheater || !selectedScreen || !selectedSeats.length) {
    router.push('/');
    return null;
  }

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const convenienceFee = selectedSeats.length * 20;
  const grandTotal = totalAmount + convenienceFee;

  const handleInputChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create booking
      const bookingId = addBooking({
        movieId: selectedMovie.id,
        movieTitle: selectedMovie.title,
        theaterId: selectedTheater.id,
        theaterName: selectedTheater.name,
        screenId: selectedScreen.id,
        showtime: selectedShowtime!,
        date: selectedDate!,
        seats: selectedSeats,
        totalAmount: grandTotal
      });

      toast.success('Payment successful!');
      router.push(`/booking/confirmation/${bookingId}`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
              <p className="text-gray-600">Complete your booking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5" />
                        <span>UPI Payment</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Building2 className="h-5 w-5" />
                        <span>Net Banking</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardHolderName">Card Holder Name</Label>
                      <Input
                        id="cardHolderName"
                        placeholder="Enter card holder name"
                        value={paymentDetails.cardHolderName}
                        onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === 'upi' && (
                <Card>
                  <CardHeader>
                    <CardTitle>UPI Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="example@paytm"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === 'netbanking' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Net Banking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
                        <button
                          key={bank}
                          className="p-4 border rounded-lg hover:bg-gray-50 text-center font-medium"
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Booking Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Movie Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">{selectedMovie.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedTheater.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{selectedDate ? format(new Date(selectedDate), 'EEE, MMM dd, yyyy') : ''}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{selectedShowtime}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{selectedScreen.name} - {selectedScreen.type}</Badge>
                  </div>

                  <Separator />

                  {/* Selected Seats */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Seats ({selectedSeats.length})</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedSeats.map((seat) => (
                        <Badge
                          key={seat.id}
                          variant={seat.type === 'premium' ? 'default' : 'secondary'}
                          className="justify-center"
                        >
                          {seat.row}{seat.number}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Price Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Tickets ({selectedSeats.length})</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Convenience Fee</span>
                        <span>₹{convenienceFee}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${grandTotal}`}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    By clicking "Pay", you agree to our terms and conditions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}