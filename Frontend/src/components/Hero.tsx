import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection({ scrollY = 0 }) {
  const navigate = (path) => console.log(`Navigating to: ${path}`); // Mock navigation for demo
  
  const images = [
    "https://i.ibb.co/cSKKhkvb/4.png",
    "https://i.ibb.co/fztMnrRn/3.png",
    "https://i.ibb.co/FqCDSGM7/1.png",
    "https://i.ibb.co/sZHGq3d/heroiew-2.png",
    "https://i.ibb.co/WWTBcX9G/2.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900 visible">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px) scale(1.05)`,
          filter: 'brightness(0.6) contrast(1.1)'
        }}
      >
        <source src="https://videos.pexels.com/video-files/3611029/3611029-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Image - Mobile Optimized Positioning */}
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        {/* Mobile: Center positioned, Desktop: Right aligned */}
        <div className="md:absolute md:right-24 md:top-1/2 md:transform md:-translate-y-1/2">
          <img
            src="https://i.ibb.co/VYnMw3Ps/web-banner-1-png.png"
            alt="Hero image"
            className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[800px] transition-all duration-500 
                       drop-shadow-2xl md:drop-shadow-xl
                       animate-pulse md:animate-none
                       opacity-90 md:opacity-100"
          />
        </div>
      </div>

      {/* Logo and Content Container - Mobile Optimized */}
      <div className="relative h-full flex items-end md:items-center justify-center md:justify-start px-5 lg:px-64 z-20 pb-32 md:pb-0">
        <div className="text-center md:text-left max-w-5xl">
          {/* Logo - Mobile Centered, Desktop Left */}
          <div className="mb-8 md:mb-6">
            <img
              src="https://i.ibb.co/SDVHYD8f/canibal-web-banner-1-png-55.png"
              alt="Hero Overlay"
              className="w-[200px] sm:w-[280px] md:w-[400px] lg:w-[500px] transition-all duration-500
                         mx-auto md:mx-0
                         drop-shadow-2xl md:drop-shadow-xl
                         hover:scale-105 md:hover:scale-100
                         animate-fadeInUp"
            />
          </div>

          {/* Call to Action - Mobile Centered */}
          <div className="flex flex-col sm:flex-row gap-6 items-center md:items-start animate-fadeInUp animation-delay-400">
            <button
              onClick={() => navigate('/store')}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden 
                         transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20
                         w-full sm:w-auto max-w-xs md:max-w-none
                         backdrop-blur-sm bg-white/95 md:bg-white
                         border-2 border-white/20 md:border-transparent"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Shop Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-xs md:text-sm font-medium mb-2 tracking-wider">SCROLL</span>
          <div className="w-px h-6 md:h-8 bg-white/60"></div>
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 mt-1" />
        </div>
      </div>
      
      {/* Mobile Enhancement: Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden z-5"></div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .duration-600 {
          transition-duration: 600ms;
        }
        
        /* Mobile-specific enhancements */
        @media (max-width: 768px) {
          .drop-shadow-2xl {
            filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.8));
          }
        }
      `}</style>
    </section>
  );
}