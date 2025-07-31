import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, CreditCard, Phone, Home } from 'lucide-react';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="pt-20 pb-8 min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Cancel Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600">Your payment was cancelled and no charges were made to your account.</p>
          </div>

          {/* Information */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">What Happened?</h3>
            <div className="text-left space-y-2">
              <p className="text-yellow-700">• Payment process was interrupted or cancelled</p>
              <p className="text-yellow-700">• No money has been deducted from your account</p>
              <p className="text-yellow-700">• Your cart items are still saved</p>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Alternative Options</h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/checkoutkoko')}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <CreditCard className="w-5 h-5" />
                Try Payment Again
              </button>
              <button
                onClick={() => navigate('/checkoutkoko')}
                className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                Choose Cash on Delivery
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/contact-us')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Need Help?
            </button>
          </div>

          {/* Support Information */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-2">Having trouble with payment?</p>
            <p className="text-sm text-gray-500">
              Contact our support team for assistance with your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}