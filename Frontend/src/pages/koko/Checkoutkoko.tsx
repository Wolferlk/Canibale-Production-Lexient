import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, CreditCard, Phone, MapPin, User, Mail,ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import api from "../../services/apiClients";

export default function Checkoutkoko() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get cart items from location state or redirect if empty
  const cartItems = location.state?.cartItems || [];
  const total = location.state?.total || 0;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone1: '',
    phone2: '',
    address: '',
    city:'',
    district:'',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Redirect if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        else if (value.length < 2) error = 'First name must be at least 2 characters';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        else if (value.length < 2) error = 'Last name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'phone1':
        if (!value) error = 'Primary phone is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be exactly 10 digits';
        break;
      case 'phone2':
        if (value && !/^\d{10}$/.test(value)) error = 'Phone must be exactly 10 digits';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        else if (value.length < 10) error = 'Address must be at least 10 characters';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    // For phone fields, only allow numbers and limit to 10 digits
    if (name === 'phone1' || name === 'phone2') {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setFormErrors(newErrors);
    return isValid;
  };

  const generateOrderId = () => {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const generateReference = () => {
    return `REF_${Date.now()}`;
  };

  const handleKokoPayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false);
      setError('Please fix the errors in the form');
      return;
    }
    
    try {
      const orderId = generateOrderId();
      const reference = generateReference();
      
      // Prepare order data for Koko Payment
      const kokoOrderData = {
        amount: total.toFixed(2),
        currency: "LKR",
        reference: reference,
        orderId: orderId,
        pluginName: "customapi",
        pluginVersion: "1.0.1",
        returnUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
        responseUrl: `${window.location.origin}/api/koko/webhook`, // Your backend webhook endpoint
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        description: `${cartItems.length} product(s) from your store`,
        // Additional order details
        cartItems: cartItems.map((item) => ({
          productName: item.product?.name,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          price: item.product?.price,
        })),
        customerDetails: {

          name: (formData.firstName +" "+ formData.lastName),
          phone1: formData.phone1,
          phone2: formData.phone2,
          address: formData.address,
          email: formData.email,
          city: formData.city,
          district: formData.district,

        }
      };

      // Call your backend to create Koko payment order
      //const response = await axios.post('http://localhost:5000/api/koko/create-order', kokoOrderData);
      const response = await api.koko.createOrder(kokoOrderData);

      
      
      if (response.data.success && response.data.paymentUrl) {
        // Redirect to Koko payment page
        window.location.href = response.data.paymentUrl;
      } else {
        throw new Error('Failed to create payment order');
      }
      
    } catch (error) {
      console.error('Error creating Koko payment:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false);
      setError('Please fix the errors in the form');
      return;
    }
    
    try {
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone1: formData.phone1,
        phone2: formData.phone2 || '', // Optional fallback
        address: formData.address,
        city: formData.city || '',     // Add if using city
        district: formData.district || '', // Add if using district
        paymentMethod: 'cash_on_delivery',
        cartItems: cartItems.map((item) => ({
          productName: item.product?.name || '',
          quantity: item.quantity || 0,
          color: item.color || '',
          size: item.size || '',
          price: item.product?.price || 0,
        })),
        totalAmount: total || 0,
        status: 'pending', // Optional, backend also sets this
      };


      //await axios.post('http://localhost:5000/api/orders', orderData);
      await api.orders.add(orderData);

      

      setShowSuccessPopup(true);
      dispatch({ type: 'CLEAR_CART' });
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="pt-20 pb-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">LKR {(item.product?.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LKR {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>LKR 350</span>
              </div>
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span>LKR {(total+350).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <User className="w-4 h-4 inline mr-2" />
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                placeholder="Enter first name"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  formErrors.firstName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <User className="w-4 h-4 inline mr-2" />
                Last Name*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                placeholder="Enter last name"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  formErrors.lastName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Enter email address"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formErrors.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-blue-200'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Phone className="w-4 h-4 inline mr-2" />
                Primary Phone*
              </label>
              <input
                type="tel"
                name="phone1"
                value={formData.phone1}
                onChange={handleFormChange}
                placeholder="0123456789"
                maxLength="10"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  formErrors.phone1 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {formErrors.phone1 && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone1}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Phone className="w-4 h-4 inline mr-2" />
                Secondary Phone
              </label>
              <input
                type="tel"
                name="phone2"
                value={formData.phone2}
                onChange={handleFormChange}
                placeholder="Optional phone number"
                maxLength="10"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  formErrors.phone2 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {formErrors.phone2 && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone2}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Delivery Information</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              <MapPin className="w-4 h-4 inline mr-2" />
              Delivery Address*
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              placeholder="Enter your full delivery address with house number, street name, and landmarks"
              rows="3"
              className={`w-full p-3 border rounded-lg transition-colors resize-none ${
                formErrors.address 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-blue-200'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                placeholder="Enter city"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  formErrors.city 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {formErrors.city && (
                <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                District*
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleFormChange}
                placeholder="Enter district"
                className={`w-full p-3 border rounded-lg transition-colors ${
                  formErrors.district 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {formErrors.district && (
                <p className="text-red-500 text-sm mt-1">{formErrors.district}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Payment Method</h3>
          
          <div className="space-y-4">
            {/* Koko Payment Button */}
            <button
              type="button"
              onClick={handleKokoPayment}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              <CreditCard className="w-5 h-5" />
              {isSubmitting ? 'Processing...' : 'Pay with Koko Payment'}
            </button>
            
            {/* Cash on Delivery Button */}
            <button
              type="button"
              onClick={handleCashOnDelivery}
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              {isSubmitting ? 'Processing...' : 'Cash on Delivery'}
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>
      </form>
          </div>
        </div>

        {/* Success Popup for Cash on Delivery */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully. Our agent will call you within 24 hours to confirm delivery details.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleSuccessClose}
                  className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/contact-us')}
                  className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}