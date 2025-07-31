import React, { useState, useEffect } from 'react';
import { FileText, Eye, Lock, Database, Globe, Users, ArrowRight, CheckCircle, AlertTriangle, Scale, Shield, Copyright } from 'lucide-react';

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
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
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

export default function TermsAndConditions() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
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
                <FileText className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                Terms & Conditions
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8">
                Clear, fair terms that govern your use of Cannibal's services and website.
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
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Fair & Transparent Terms</h2>
            <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              Our terms are designed to protect both you and Cannibal while ensuring a great experience for everyone
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={100}>
              <IconCard 
                icon={Scale} 
                title="Fair Usage"
                description="Balanced terms that protect your rights as a customer"
                color="purple"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <IconCard 
                icon={Shield} 
                title="Legal Protection"
                description="Clear guidelines to keep everyone safe and secure"
                color="pink"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <IconCard 
                icon={Copyright} 
                title="IP Respect"
                description="Protecting intellectual property and creative content"
                color="blue"
              />
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <IconCard 
                icon={Globe} 
                title="Sri Lankan Law"
                description="Governed by clear, local jurisdiction and regulations"
                color="green"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-24 bg-gray-50">
        <AnimatedSection>
          <PolicySection title="Copyright and Submitted Material" icon={Copyright}>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-bold mb-3 text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Content Ownership
                </h3>
                <p className="text-amber-700">All content on the Cannibal website, including logos, designs, text, and graphics is licensed to or owned by Cannibal.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">What You Cannot Do</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Copy, distribute, or republish our content without permission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Download, display, post, or transmit content without authorization</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Material You Submit</h3>
                <p className="text-gray-700">Any material you contribute to our website becomes the property of Cannibal. We reserve the right to remove any content for any reason.</p>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <PolicySection title="Trademarks" icon={Shield}>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Copyright className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Cannibal Brand Protection</h3>
                  <p className="text-gray-600">The Cannibal name and logo are registered trademarks</p>
                </div>
              </div>
              
              <p className="text-gray-700">Any other trademarks on the website belong to their respective owners and must not be used without written consent.</p>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <PolicySection title="Third-Party Links" icon={Globe}>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">We may provide links to third-party websites for your convenience.</p>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Important Notice</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>We have no control over third-party websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>We do not monitor or endorse their content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Your access is governed by their terms of use</span>
                  </li>
                </ul>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <PolicySection title="User Conduct" icon={Users}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Your Responsibilities</h3>
                <p className="text-gray-700 mb-4">You are responsible for all activity in connection with accessing our website.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Acceptable Use
                  </h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Respectful interaction with other users</li>
                    <li>• Following all applicable laws</li>
                    <li>• Using the website as intended</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Prohibited Activities
                  </h4>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Fraudulent or illegal activity</li>
                    <li>• Disrupting website functionality</li>
                    <li>• Interfering with other users</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium">
                  <AlertTriangle className="w-5 h-5 inline mr-2" />
                  Any fraudulent or illegal activity may result in termination of your access.
                </p>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <PolicySection title="Warranties and Disclaimers" icon={AlertTriangle}>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg border border-gray-300">
                <h3 className="text-xl font-bold mb-3 text-gray-800">"As Is" Service</h3>
                <p className="text-gray-700">The content and website are provided "as is" and "as available." We disclaim all warranties, express or implied.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">We Do Not Warrant:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Freedom from viruses or disruptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Uninterrupted service availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Complete accuracy of all information</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Your Risk:</h4>
                  <p className="text-gray-700">You assume the entire risk of using the website and accessing its content.</p>
                </div>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <PolicySection title="Limitation of Liability" icon={Scale}>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold mb-3 text-red-800">Liability Disclaimer</h3>
                <p className="text-red-700">We disclaim all liability for any losses or damages arising out of or related to the content or website. Any liabilities imposed on us under law are excluded to the fullest extent permitted.</p>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <PolicySection title="Product Information" icon={Database}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Product Descriptions</h3>
                <p className="text-gray-700 mb-4">Each product is sold subject to its Product Description, including specific conditions.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Our Commitment</h4>
                  <p className="text-blue-700">We make every effort to ensure the accuracy of product details and descriptions.</p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-orange-800 mb-3">Pricing & Availability</h4>
                  <p className="text-orange-700">We cannot confirm the price until your order is accepted. We will contact you if a product is unavailable.</p>
                </div>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>

        <AnimatedSection delay={700}>
          <PolicySection title="Termination & Legal" icon={FileText}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Service Termination</h3>
                <p className="text-gray-700 mb-4">We reserve the right to discontinue, suspend, or terminate any service or the website at any time without notice.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Applicable Law</h4>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <Globe className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Sri Lankan Law</p>
                      <p className="text-green-600 text-sm">Exclusive jurisdiction of Sri Lankan Courts</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Severability</h4>
                  <p className="text-gray-700">If any part of these Terms is deemed unlawful or unenforceable, it will not affect the validity of the remaining provisions.</p>
                </div>
              </div>
            </div>
          </PolicySection>
        </AnimatedSection>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">Questions About Our Terms?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Need clarification on any of our terms? Our legal team is here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@cannibal.lk"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 
                  rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Scale className="w-5 h-5" />
                Contact Legal Team
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