import React, { useState, useEffect } from 'react';
import { HelpCircle, Clock, CreditCard, Phone, Mail, MapPin, Truck, MessageCircle, ChevronDown, ChevronUp, Package, CheckCircle } from 'lucide-react';

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

// FAQ Item Component
const FAQItem = ({ question, children, icon: Icon, color = "teal", isOpen, onToggle }) => {
  const colorClasses = {
    teal: "bg-teal-600 text-white",
    blue: "bg-blue-600 text-white",
    purple: "bg-purple-600 text-white",
    green: "bg-green-600 text-white"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{question}</h3>
        </div>
        <div className="transform transition-transform duration-300">
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-gray-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-600" />
          )}
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 pl-22">
          {children}
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon: Icon, title, description, color = "teal" }) => {
  const colorClasses = {
    teal: "bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white"
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

export default function FAQPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

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
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                FAQ
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8">
                Get answers to commonly asked questions about payments, delivery, and customer service.
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5" />
                <span>Everything you need to know</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="bg-gray-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Quick Information</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get instant answers to the most common questions
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={200}>
              <InfoCard 
                icon={CreditCard} 
                title="Payment Methods"
                description="Cash on delivery, Koko Payment, and bank transfer accepted"
                color="teal"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <InfoCard 
                icon={Clock} 
                title="Delivery Time"
                description="48 hours for Colombo, 1-3 days for outstation orders"
                color="blue"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <InfoCard 
                icon={MessageCircle} 
                title="WhatsApp Support"
                description="Direct messaging on 0782898993 for quick assistance"
                color="purple"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <InfoCard 
                icon={Mail} 
                title="Email Support"
                description="Reach us at cannibal.co2001@gmail.com anytime"
                color="green"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-4 py-24 bg-gray-50">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find detailed answers to common questions about our services
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection delay={100}>
            <FAQItem
              question="What payment methods are accepted?"
              icon={CreditCard}
              color="teal"
              isOpen={openFAQ === 0}
              onToggle={() => toggleFAQ(0)}
            >
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">We offer flexible payment options to make your shopping experience convenient:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-teal-600" />
                      <h4 className="font-medium text-teal-800">Cash on Delivery</h4>
                    </div>
                    <p className="text-teal-700 text-sm">Pay when you receive your order</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-800">Koko Payment</h4>
                    </div>
                    <p className="text-blue-700 text-sm">Secure digital payment option</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-purple-800">Bank Transfer</h4>
                    </div>
                    <p className="text-purple-700 text-sm">Direct bank to bank transfer</p>
                  </div>
                </div>
              </div>
            </FAQItem>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <FAQItem
              question="How long would my delivery take?"
              icon={Clock}
              color="blue"
              isOpen={openFAQ === 1}
              onToggle={() => toggleFAQ(1)}
            >
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">Delivery time depends on your location and when you place your order:</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-4 text-lg">For orders placed before 10 AM on weekdays:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h5 className="font-medium text-gray-800">Colombo & Suburbs</h5>
                      </div>
                      <p className="text-green-700 font-bold">Within 48 hours</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h5 className="font-medium text-gray-800">Western Province</h5>
                      </div>
                      <p className="text-blue-700 font-bold">48 hours</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <h5 className="font-medium text-gray-800">Outstation</h5>
                      </div>
                      <p className="text-purple-700 font-bold">1-3 working days</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-amber-800">
                    <strong>Weekend Orders:</strong> Orders placed over the weekend are dispatched on Monday.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">
                    Our team has one goal: To get your order delivered to your doorstep as soon as possible.
                  </p>
                </div>
              </div>
            </FAQItem>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <FAQItem
              question="How to contact the store?"
              icon={Phone}
              color="purple"
              isOpen={openFAQ === 2}
              onToggle={() => toggleFAQ(2)}
            >
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">We are always here to help you! Choose the contact method that works best for you:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800">WhatsApp Hotline</h4>
                        <p className="text-green-600 text-sm">Quick messaging support</p>
                      </div>
                    </div>
                    <a 
                      href="https://wa.me/94782898993" 
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-medium"
                    >
                      <MessageCircle className="w-5 h-5" />
                      0782898993
                    </a>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800">Email Support</h4>
                        <p className="text-blue-600 text-sm">Detailed inquiries welcome</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:cannibal.co2001@gmail.com" 
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-medium"
                    >
                      <Mail className="w-5 h-5" />
                      Email Us
                    </a>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-gray-700 font-medium">
                    Our customer service team is dedicated to providing you with the best shopping experience possible.
                  </p>
                </div>
              </div>
            </FAQItem>
          </AnimatedSection>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-gradient-to-r from-teal-900 to-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">Still have questions?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our friendly customer service team is ready to help you with any questions or concerns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/94782898993"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 
                  rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              
              <a
                href="mailto:cannibal.co2001@gmail.com"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 
                  rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Mail className="w-5 h-5" />
                Send an Email
              </a>
            </div>
            
            <div className="mt-8 text-gray-400">
              <p>We're here to make your shopping experience as smooth as possible!</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}