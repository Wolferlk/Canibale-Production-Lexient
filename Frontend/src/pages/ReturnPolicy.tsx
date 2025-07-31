import React, { useState, useEffect } from 'react';
import { RotateCcw, Clock, Camera, Package, CheckCircle, ArrowRight, AlertTriangle, Phone, Mail, CreditCard, Truck, RefreshCw, X } from 'lucide-react';

// Animated section component
const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

// Icon card component
const IconCard = ({ icon: Icon, title, description, color = "purple" }) => {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    teal: "bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
  };

  return (
    <div className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${colorClasses[color]}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Policy section component
const PolicySection = ({ title, children, icon: Icon }) => (
  <div className="mb-12">
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      {children}
    </div>
  </div>
);

// Step component
const ExchangeStep = ({ number, title, description, icon: Icon, color = "teal" }) => {
  const colorClasses = {
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    green: "bg-green-500"
  };

  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-full flex items-center justify-center flex-shrink-0`}>
        <span className="text-white font-bold text-lg">{number}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`w-6 h-6 text-${color}-600`} />
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default function ReturnPolicy() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lastUpdated = "January 1, 2025";

  return (
    <div className="pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-black to-blue-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-white p-4"
          style={{ 
            transform: `translateY(${scrollPosition * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <AnimatedSection>
            <div className="text-center">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                <RotateCcw className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                Return Policy
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8">
                Your satisfaction matters. Learn about our exchange process and requirements.
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Key Information */}
      <div className="bg-gray-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Exchange Policy Overview</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We want you to be satisfied with your purchase. Please review our exchange policy carefully.
              </p>
            </div>
          </AnimatedSection>

          {/* Important Notice */}
          <AnimatedSection delay={100}>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-2xl border border-amber-200 text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-4">Important: Exchange Only Policy</h3>
                <p className="text-amber-700 text-lg">
                  We do not provide refunds. Eligible items may be exchanged for a different product or size only.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={200}>
              <IconCard 
                icon={Clock} 
                title="7-Day Window"
                description="Exchanges accepted within 7 days of receiving your item"
                color="teal"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <IconCard 
                icon={Camera} 
                title="Photo Evidence"
                description="Provide photo and video proof for exchange requests"
                color="blue"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <IconCard 
                icon={Package} 
                title="Original Packaging"
                description="Items must be returned in original packaging condition"
                color="purple"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <IconCard 
                icon={Truck} 
                title="Buyer Pays Shipping"
                description="You cover all delivery costs for exchange process"
                color="green"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-24 bg-gray-50">
        <AnimatedSection>
          <PolicySection title="Exchange Eligibility" icon={CheckCircle}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-bold mb-3 text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Eligible for Exchange
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Items received within the last 7 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Items in original packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Items with proof of payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Sale items (subject to stock availability)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="text-xl font-bold mb-3 text-red-800 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Not Eligible
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Items received more than 7 days ago</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Items without original packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Items without proof of payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>Requests for cash refunds</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <PolicySection title="Exchange Process" icon={RefreshCw}>
            <div className="space-y-8">
              <p className="text-gray-700 text-lg text-center">Follow these simple steps to initiate your exchange:</p>
              
              <div className="space-y-6">
                <ExchangeStep 
                  number="1"
                  title="Contact Customer Service"
                  description="Reach out to our customer service team within 7 days of receiving your item"
                  icon={Phone}
                  color="teal"
                />
                
                <ExchangeStep 
                  number="2"
                  title="Provide Order Details"
                  description="Share your order number and details of the item you wish to exchange"
                  icon={CreditCard}
                  color="blue"
                />
                
                <ExchangeStep 
                  number="3"
                  title="Submit Photo Evidence"
                  description="Send clear photos and videos of the item to facilitate the exchange process"
                  icon={Camera}
                  color="purple"
                />
                
                <ExchangeStep 
                  number="4"
                  title="Package & Ship"
                  description="Pack the item in its original packaging and arrange shipping (costs covered by you)"
                  icon={Package}
                  color="pink"
                />
                
                <ExchangeStep 
                  number="5"
                  title="Receive Exchange"
                  description="Once we receive and verify your item, we'll process your exchange"
                  icon={CheckCircle}
                  color="green"
                />
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <PolicySection title="Requirements & Documentation" icon={CreditCard}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Required Documentation</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-800">Proof of Payment</h4>
                        <p className="text-blue-600 text-sm">Keep your receipt or order confirmation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Camera className="w-6 h-6 text-purple-600" />
                      <div>
                        <h4 className="font-medium text-purple-800">Visual Evidence</h4>
                        <p className="text-purple-600 text-sm">Clear photos and videos of the item</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Packaging Requirements</h3>
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
                    <div className="flex items-start gap-4">
                      <Package className="w-8 h-8 text-teal-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-teal-800 mb-2">Original Condition Required</h4>
                        <ul className="space-y-1 text-teal-700 text-sm">
                          <li>• Item must be in original packaging</li>
                          <li>• All accessories and materials included</li>
                          <li>• Tags and labels intact where applicable</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <PolicySection title="Important Policies" icon={AlertTriangle}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-lg border border-red-200">
                  <h3 className="text-xl font-bold mb-3 text-red-800 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    No Refunds Policy
                  </h3>
                  <p className="text-red-700">
                    We do not offer cash refunds. All returns are processed as exchanges for different products or sizes only.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-xl font-bold mb-3 text-orange-800 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Responsibility
                  </h3>
                  <p className="text-orange-700">
                    The buyer is responsible for all delivery costs associated with the exchange process.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold mb-3 text-blue-800 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Sales Items
                </h3>
                <p className="text-blue-700">
                  Sales items are not eligible for refunds but may be exchanged for other products, subject to stock availability.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Policy Compliance
                </h3>
                <p className="text-gray-700">
                  Returns that do not meet our policy requirements will not be accepted. Please ensure all criteria are met before shipping.
                </p>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-teal-900 to-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">Need Help with an Exchange?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our customer service team is ready to assist you with your exchange request.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:returns@cannibal.lk"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 
                  rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Mail className="w-5 h-5" />
                Email Returns Team
              </a>
              
              <a
                href="tel:+94123456789"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 
                  rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Phone className="w-5 h-5" />
                Call Customer Service
              </a>
            </div>
            
            <div className="mt-8 text-gray-400">
              <p>Your satisfaction is important to us, and we will do our best to assist you.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}