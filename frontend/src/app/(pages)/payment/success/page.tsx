'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, Calendar, Users, DollarSign, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { bookingAPI } from '@/lib/api';
import { format } from 'date-fns';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const orderId = searchParams.get('order_id');
        if (orderId) {
          // In a real implementation, you would fetch booking details using the order ID
          // For now, we'll simulate a successful booking
          setBooking({
            _id: orderId,
            checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            checkOut: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
            guests: 2,
            totalPrice: 750,
            status: 'confirmed',
            specialRequests: 'Early check-in if possible'
          });
        }
      } catch (error) {
        console.error('Failed to load booking:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for choosing Villa 95. Your booking has been confirmed and payment has been processed successfully.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Confirmation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-in & Check-out</p>
                  <p className="font-semibold text-gray-900">
                    {booking?.checkIn && format(new Date(booking.checkIn), 'MMM dd, yyyy')} - {booking?.checkOut && format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Number of Guests</p>
                  <p className="font-semibold text-gray-900">{booking?.guests} guests</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount Paid</p>
                  <p className="font-semibold text-gray-900">${booking?.totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-mono text-sm">{booking?._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold capitalize">{booking?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold">PayHere</span>
                  </div>
                </div>
              </div>

              {booking?.specialRequests && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Special Requests</h3>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-gray-700">{booking.specialRequests}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
              <p className="text-sm text-gray-600">
                We've sent a detailed confirmation email to {user?.email} with all the information you need.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Check-in Details</h3>
              <p className="text-sm text-gray-600">
                Check-in time is 2:00 PM. Our team will contact you 24 hours before arrival.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">
                Need help? Contact us at +94 11 234 5678 or info@villa95rangala.com
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
            >
              Return to Home
            </a>
            <a
              href="/booking"
              className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors duration-200 font-medium"
            >
              Book Another Stay
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            A copy of this confirmation has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}
