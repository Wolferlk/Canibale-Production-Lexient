import React, { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Database, Globe, Users, ArrowRight, CheckCircle } from 'lucide-react';

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

// Policy section component
const PolicySection = ({ title, children, icon: Icon }) => (
  <div className="mb-12">
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      {children}
    </div>
  </div>
);

export default function PrivacyPolicy() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
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
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8">
                Your privacy is our priority. Learn how we protect and respect your personal information.
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Why Trust Cannibal?</h2>
            <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              We believe in transparency and your right to understand how your data is handled
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={100}>
              <IconCard 
                icon={Lock} 
                title="Secure Encryption"
                description="All data is encrypted using industry-standard SSL technology"
                color="purple"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <IconCard 
                icon={Eye} 
                title="Full Transparency"
                description="Clear policies with no hidden terms or conditions"
                color="pink"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <IconCard 
                icon={Database} 
                title="Minimal Collection"
                description="We only collect data necessary for our services"
                color="blue"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <IconCard 
                icon={Users} 
                title="Your Control"
                description="You decide what information to share with us"
                color="green"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-24 bg-gray-50">
        <AnimatedSection>
          <PolicySection title="Information We Collect" icon={Database}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Personal Information</h3>
                <p className="text-gray-700 mb-4">When you create an account or make a purchase, we collect:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Name, email address, and contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Billing and shipping addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Payment information (securely processed by our payment partners)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Usage Information</h3>
                <p className="text-gray-700">We automatically collect certain information about your device and usage patterns, including IP address, browser type, pages visited, and interaction data to improve our services.</p>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <PolicySection title="How We Use Your Information" icon={Globe}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Service Delivery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Process and fulfill your orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Provide customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Send order confirmations and updates</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Improvement & Marketing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>Improve our website and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>Send promotional communications (with consent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>Personalize your shopping experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <PolicySection title="Information Sharing" icon={Users}>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold mb-3 text-red-800">We Never Sell Your Data</h3>
                <p className="text-red-700">Cannibal does not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">We Share Information Only When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>You give us explicit consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Required by law or legal process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>With trusted service providers (payment processors, shipping companies)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>To protect our rights and prevent fraud</span>
                  </li>
                </ul>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <PolicySection title="Your Rights & Choices" icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Data Rights</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Access your personal data</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <Lock className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Correct inaccurate information</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Request data deletion</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Communication Preferences</h3>
                <p className="text-gray-700 mb-4">You can opt out of promotional communications at any time by:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Clicking unsubscribe in our emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Updating your account preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Contacting our support team</span>
                  </li>
                </ul>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <PolicySection title="Data Security" icon={Lock}>
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">We implement comprehensive security measures to protect your personal information:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">SSL Encryption</h4>
                  <p className="text-gray-600 text-sm">All data transmission is encrypted using 256-bit SSL</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Database className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Secure Storage</h4>
                  <p className="text-gray-600 text-sm">Data stored in protected, monitored environments</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Regular Audits</h4>
                  <p className="text-gray-600 text-sm">Continuous security assessments and updates</p>
                </div>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-purple-900 to-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">Questions About Privacy?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're here to help. Contact us anytime for privacy-related questions or concerns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@cannibal.lk"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 
                  rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Shield className="w-5 h-5" />
                Contact Privacy Team
              </a>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 
                  rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 font-medium"
              >
                General Support <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}