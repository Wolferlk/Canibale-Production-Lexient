import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from "../services/apiClients";


interface Product {
  _id: string;
  [key: string]: any; // You can customize this further based on ProductCard props
}

const FeaturedCollection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        container.scrollBy({ left: 1, behavior: 'smooth' });

        if (
          container.scrollLeft + container.offsetWidth >= container.scrollWidth
        ) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 2000); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace direct axios call with apiClient
        const response = await api.products.getAll();
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <section className="py-12 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2 md:flex hidden">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 md:flex hidden">
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="shrink-0 pl-4 sm:pl-8 lg:pl-0" />

          {products.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="shrink-0 w-64 md:w-72 lg:w-80 px-3 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}

          

          <div className="shrink-0 pr-4 sm:pr-8 lg:pr-0" />
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-6 gap-2 md:hidden">
        {Array.from({ length: Math.min(Math.ceil(products.length / 2), 4) }).map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-500 transition-colors"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              if (scrollContainerRef.current) {
                const slideWidth = scrollContainerRef.current.offsetWidth;
                scrollContainerRef.current.scrollTo({
                  left: slideWidth * index,
                  behavior: 'smooth',
                });
              }
            }}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
  <Link
    to="/store"
    className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition duration-300"
  >
    Shop More
  </Link>
</div>

        
    </section>
  );
};

export default FeaturedCollection;
