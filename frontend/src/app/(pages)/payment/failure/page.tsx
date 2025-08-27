'use client';

import React from 'react';
import { XCircle, RefreshCw, Phone, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error_message') || 'Payment processing failed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Failure Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're sorry, but your payment could not be processed. Please try again or contact us for assistance.
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happened?</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Payment Error</h3>
                <p className="text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Common Issues */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Common Issues</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Insufficient funds in your account</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Card details entered incorrectly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Card expired or blocked by your bank</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Network connectivity issues</span>
                </li>
              </ul>
            </div>

            {/* What You Can Do */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">What You Can Do</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Try the payment again with a different card</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Contact your bank to verify the transaction</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Call us for alternative payment methods</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Check your internet connection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-3">
                Speak directly with our support team
              </p>
              <a
                href="tel:+94112345678"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                +94 11 234 5678
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-3">
                Send us a detailed message
              </p>
              <a
                href="mailto:info@villa95rangala.com"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                info@villa95rangala.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Try Again</h3>
              <p className="text-sm text-gray-600 mb-3">
                Return to booking and retry payment
              </p>
              <a
                href="/booking"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Return to Booking
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Payment Again</span>
            </a>
            <a
              href="/"
              className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors duration-200 font-medium"
            >
              Return to Home
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            Your booking details have been saved. You can retry the payment anytime within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
