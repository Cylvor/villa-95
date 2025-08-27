'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, CheckCircle, ArrowRight, Star, MapPin, Wifi, Car, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { format, addDays, differenceInDays, isBefore, isAfter, isSameDay } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { bookingAPI, paymentAPI, villaAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [bookingData, setBookingData] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
    specialRequests: '',
    guestNames: [] as string[],
    contactPhone: '',
    contactEmail: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [availability, setAvailability] = useState<any>(null);
  const [villaDetails, setVillaDetails] = useState<any>(null);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');

  // Load villa details on component mount
  useEffect(() => {
    const loadVillaDetails = async () => {
      try {
        const villa = await villaAPI.getDetails();
        setVillaDetails(villa);
      } catch (error) {
        console.error('Failed to load villa details:', error);
        setError('Failed to load villa details');
      }
    };
    loadVillaDetails();
  }, []);

  // Check availability when dates change
  useEffect(() => {
    const checkAvailability = async () => {
      if (!bookingData.checkIn || !bookingData.checkOut || !villaDetails) return;
      
      try {
        const result = await bookingAPI.checkAvailability({
          checkIn: format(bookingData.checkIn, 'yyyy-MM-dd'),
          checkOut: format(bookingData.checkOut, 'yyyy-MM-dd'),
          guests: bookingData.guests
        });
        setAvailability(result);
        setError('');
      } catch (error: any) {
        setAvailability({ available: false, reason: error.message });
        setError(error.message);
      }
    };

    const timeoutId = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [bookingData.checkIn, bookingData.checkOut, bookingData.guests, villaDetails]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !villaDetails) return 0;
    const nights = differenceInDays(bookingData.checkOut, bookingData.checkIn);
    return nights * villaDetails.pricePerNight;
  };

  // Calculate nights
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    return differenceInDays(bookingData.checkOut, bookingData.checkIn);
  };

  // Get minimum checkout date
  const getMinCheckOutDate = () => {
    if (!bookingData.checkIn) return null;
    return addDays(bookingData.checkIn, 1);
  };

  // Handle date changes
  const handleDateChange = (field: 'checkIn' | 'checkOut', value: Date | null) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset checkout if checkin is after checkout
    if (field === 'checkIn' && prev.checkOut && value && isAfter(value, prev.checkOut)) {
      setBookingData(prev => ({
        ...prev,
        checkOut: null
      }));
    }
  };

  // Handle guest count change
  const handleGuestChange = (count: number) => {
    if (count >= 1 && count <= (villaDetails?.maxGuests || 8)) {
      setBookingData(prev => ({
        ...prev,
        guests: count
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please sign in to make a booking');
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    if (!availability?.available) {
      setError('Selected dates are not available');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create booking
      const booking = await bookingAPI.create({
        checkIn: format(bookingData.checkIn, 'yyyy-MM-dd'),
        checkOut: format(bookingData.checkOut, 'yyyy-MM-dd'),
        guests: bookingData.guests,
        specialRequests: bookingData.specialRequests,
        guestNames: bookingData.guestNames,
        contactPhone: bookingData.contactPhone,
        contactEmail: bookingData.contactEmail
      });

      setBookingId(booking._id);

      // Initiate payment
      const payment = await paymentAPI.initiate(booking._id);
      
      // Redirect to PayHere
      window.location.href = payment.payhereUrl;
      
    } catch (error: any) {
      setError(error.message || 'Failed to create booking');
    } finally {
      setIsProcessing(false);
    }
  };

  // Go to next step
  const nextStep = () => {
    if (currentStep === 1 && (!bookingData.checkIn || !bookingData.checkOut)) {
      setError('Please select check-in and check-out dates');
      return;
    }
    
    if (currentStep === 1 && availability && !availability.available) {
      setError(availability.reason || 'Selected dates are not available');
      return;
    }

    setError('');
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  // Go to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  if (!villaDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Book Your Stay</h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">
            Reserve your luxury hill country retreat at Villa 95
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[
                    { step: 1, label: 'Select Dates', icon: Calendar },
                    { step: 2, label: 'Guest Details', icon: Users },
                    { step: 3, label: 'Payment', icon: CreditCard }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= item.step 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        currentStep >= item.step ? 'text-amber-600' : 'text-gray-500'
                      }`}>
                        {item.label}
                      </span>
                      {item.step < 3 && (
                        <div className={`w-16 h-1 mx-4 ${
                          currentStep > item.step ? 'bg-amber-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Step 1: Date Selection */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Select Your Dates</h2>
                    <p className="text-gray-600">
                      Choose your check-in and check-out dates for your stay at Villa 95.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in Date *
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkIn ? format(bookingData.checkIn, 'yyyy-MM-dd') : ''}
                          onChange={(e) => handleDateChange('checkIn', e.target.value ? new Date(e.target.value) : null)}
                          min={format(new Date(), 'yyyy-MM-dd')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-out Date *
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkOut ? format(bookingData.checkOut, 'yyyy-MM-dd') : ''}
                          onChange={(e) => handleDateChange('checkOut', e.target.value ? new Date(e.target.value) : null)}
                          min={getMinCheckOutDate() ? format(getMinCheckOutDate()!, 'yyyy-MM-dd') : ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                    </div>

                    {/* Availability Status */}
                    {availability && (
                      <div className={`p-4 rounded-lg border ${
                        availability.available 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}>
                        <div className="flex items-center space-x-2">
                          {availability.available ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <AlertCircle className="w-5 h-5" />
                          )}
                          <span className="font-medium">
                            {availability.available ? 'Available' : 'Not Available'}
                          </span>
                        </div>
                        {availability.reason && (
                          <p className="mt-1 text-sm">{availability.reason}</p>
                        )}
                        {availability.available && availability.totalPrice && (
                          <p className="mt-1 text-sm font-medium">
                            Total: ${availability.totalPrice} for {availability.nights} night{availability.nights !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div>
                        <p className="font-medium text-amber-800">
                          {bookingData.checkIn && bookingData.checkOut 
                            ? `${calculateNights()} night${calculateNights() !== 1 ? 's' : ''}`
                            : 'Select dates to see duration'
                          }
                        </p>
                        <p className="text-sm text-amber-700">
                          {bookingData.checkIn && bookingData.checkOut 
                            ? `${format(bookingData.checkIn, 'MMM dd')} - ${format(bookingData.checkOut, 'MMM dd, yyyy')}`
                            : 'Choose your arrival and departure dates'
                          }
                        </p>
                      </div>
                      <button
                        onClick={nextStep}
                        disabled={!bookingData.checkIn || !bookingData.checkOut || !availability?.available}
                        className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Guest Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Guest Information</h2>
                    <p className="text-gray-600">
                      Tell us about your stay and any special requirements.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Guests *
                        </label>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleGuestChange(bookingData.guests - 1)}
                            disabled={bookingData.guests <= 1}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-amber-500 transition-colors duration-200 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="text-2xl font-bold text-gray-900 w-16 text-center">
                            {bookingData.guests}
                          </span>
                          <button
                            onClick={() => handleGuestChange(bookingData.guests + 1)}
                            disabled={bookingData.guests >= (villaDetails?.maxGuests || 8)}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-amber-500 transition-colors duration-200 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Maximum {villaDetails?.maxGuests || 8} guests allowed
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={bookingData.contactPhone}
                          onChange={(e) => setBookingData(prev => ({ ...prev, contactPhone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                          placeholder="+94 11 234 5678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={bookingData.contactEmail}
                          onChange={(e) => setBookingData(prev => ({ ...prev, contactEmail: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requests
                        </label>
                        <textarea
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 resize-none"
                          placeholder="Any special requirements or requests for your stay..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        onClick={prevStep}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                      >
                        ← Back to Dates
                      </button>
                      <button
                        onClick={nextStep}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium flex items-center space-x-2"
                      >
                        <span>Review & Pay</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Review & Payment</h2>
                    <p className="text-gray-600">
                      Please review your booking details and proceed to payment.
                    </p>

                    {/* Booking Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-in:</span>
                          <span className="font-medium">
                            {bookingData.checkIn ? format(bookingData.checkIn, 'MMM dd, yyyy') : ''}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-out:</span>
                          <span className="font-medium">
                            {bookingData.checkOut ? format(bookingData.checkOut, 'MMM dd, yyyy') : ''}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="font-medium">{bookingData.guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-bold text-lg text-amber-600">
                            ${calculateTotalPrice()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5" />
                            <span>Proceed to Payment - ${calculateTotalPrice()}</span>
                          </>
                        )}
                      </button>
                    </form>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        onClick={prevStep}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                      >
                        ← Back to Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Villa Details & Pricing */}
            <div className="space-y-6">
              {/* Villa Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{villaDetails.name}</h3>
                  <div className="flex items-center justify-center space-x-2 text-amber-600 mb-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-medium">{villaDetails.rating}</span>
                    <span className="text-gray-500">({villaDetails.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{villaDetails.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">{villaDetails.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">{villaDetails.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-gray-600">High-speed WiFi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-gray-600">Free Parking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-gray-600">24/7 Security</span>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              {currentStep >= 1 && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
                  
                  {bookingData.checkIn && bookingData.checkOut ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          ${villaDetails.pricePerNight} × {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
                        </span>
                        <span>${calculateTotalPrice()}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-amber-600">${calculateTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Select dates to see pricing</p>
                    </div>
                  )}
                </div>
              )}

              {/* Cancellation Policy */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">Cancellation Policy</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• Free cancellation up to 7 days before check-in</li>
                  <li>• 50% refund for cancellations 3-7 days before</li>
                  <li>• No refund for cancellations within 3 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
