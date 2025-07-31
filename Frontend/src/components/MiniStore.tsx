import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';

// Reuse the same types from your main Store component
type Category = 'all' | 'mens' | 'womens' | 'unisex' ;
type Subcategory = string;

interface Product {
  id: string;
  name: string;
  price: number;
  colors: string[];
  sizes: string[];
  category: Category | Subcategory;
  status: 'available' | 'low-stock' | 'sold-out';
  images: string[];
}

interface MiniStoreProps {
  maxProducts?: number;
  featuredOnly?: boolean;
}

const MiniStore = ({ 
  maxProducts = 8,
  featuredOnly = false
}) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Limited categories for the mini store
  const categories = ['all', 'mens', 'womens', 'unisex'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Using fetch instead of axios
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Error fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesCategory;
  });

  // Sort products by newest first (assuming higher id = newer)
  const sortedProducts = filteredProducts
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, maxProducts);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="animate-pulse">
          <ShoppingBag size={36} className="text-black" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="text-center">
          <X size={36} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">{error}</h2>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-4 sm:px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Header section - More compact on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Store</h2>
            <p className="text-sm sm:text-base text-gray-600">Check out our latest collection</p>
          </div>
          
          <a href="/store" className="mt-3 sm:mt-0 text-sm sm:text-base inline-flex items-center text-black hover:underline font-medium">
            View all products <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        
        {/* Category selector - Horizontal scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 mb-4 sm:mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5  text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
                ${selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Product grid - 2 per row on mobile, 4 per row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
  {sortedProducts.map((product) => (
    <div
      key={product.id}
      className="bg-white overflow-hidden shadow hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <a href={`/product/${product.id}`}>
        <div className="relative h-72 sm:h-80 bg-gray-100"> {/* increased card height */}
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
          )}
          
          {product.status === 'low-stock' && (
            <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded">
              Low Stock
            </span>
          )}
          
          {product.status === 'sold-out' && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
              Sold Out
            </span>
          )}
        </div>
        
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{product.name}</h3>
          <div className="mt-2 flex justify-between items-center">
            <p className="font-bold text-gray-900 text-sm sm:text-base">LKR {product.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500 capitalize hidden sm:block">{product.category}</p>
          </div>
        </div>
      </a>
    </div>
  ))}
</div>

        
        {sortedProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm sm:text-base">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniStore;