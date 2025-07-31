import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden h-80 w-full md:h-96 md:w-72 ">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-102"
          />
          {product.status === 'new' && (
            <div className="absolute top-0 left-0 bg-emerald-500 text-white px-3 py-1 text-xs font-medium">
              NEW
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-gray-600 font-semibold">LKR {product.price.toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-1">
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-red-600">-{product.discountPercentage}%</span>
              )}
            </div>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
            
            <div className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="absolute bottom-0 left-0 right-0">
        <button
  className={`w-full py-2 text-sm font-medium border-2 transition-colors duration-300 
    ${
      product.status === 'sold-out'
        ? 'border-gray-300 bg-white text-gray-400 cursor-not-allowed'
        : 'border-black bg-white text-black hover:bg-black hover:text-white'
    }`}
  disabled={product.status === 'sold-out'}
>
  {product.status === 'sold-out' ? 'Sold Out' : 'Add to Cart'}
</button>
      </div>
      
    </div>
  );
}