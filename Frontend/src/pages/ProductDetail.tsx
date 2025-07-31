import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Featuredcollection from '../components/FeaturedCollection'

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Fetch product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setSelectedSize(response.data.sizes[0] || '');
        setSelectedColor(response.data.colors[0] || '');
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProduct();
  }, [id]);

  // Show a loading state or error if product not found
  if (!product) {
    return (
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <p>Loading or product not found...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      },
    });
    navigate('/cart');
  };

  const sizeChartData = {
    "S": { chest: "34-36", waist: "28-30", hip: "34-36" },
    "M": { chest: "38-40", waist: "32-34", hip: "38-40" },
    "L": { chest: "42-44", waist: "36-38", hip: "42-44" },
    "XL": { chest: "46-48", waist: "40-42", hip: "46-48" },
    "XXL": { chest: "50-52", waist: "44-46", hip: "50-52" }
  };

  return (
    <div className="pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-10 pt-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="absolute h-max max-full object-contain "
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between">
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )}
                  className="p-2 bg-white/80 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )}
                  className="p-2 bg-white/80 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">LKR {product.price}</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button 
                    onClick={() => setShowSizeChart(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Show Size Chart
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-black'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <select
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="rounded-full border-gray-300 focus:border-black focus:ring-black"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  {quantity > 1 
                    ? `You're purchasing ${quantity} items for a total of LKR ${product.price * quantity}`
                    : 'Select the quantity you wish to purchase'}
                </p>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.status === 'sold-out'}
                className={`w-full py-3 rounded-full ${
                  product.status === 'sold-out'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {product.status === 'sold-out' ? 'Sold Out' : 'Add to Cart'}
              </button>

              {/* Product Description Section - Moved after Add to Cart button */}
              {/* Product Description Section - Updated with conditional rendering */}
<div className="pt-4 border-t border-gray-200">
  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
  
  {/* Main tagline */}
  {product.tagline && (
    <div className="mb-4">
      <p className="text-gray-800 font-medium text-base">
        {product.tagline}
      </p>
    </div>
  )}

  {/* Key Features - Only show if at least one field has data */}
  {(product.fit || product.fabric || product.functionality) && (
    <div className="mb-4 space-y-2">
      {product.fit && (
        <div className="flex">
          <span className="text-gray-700 font-medium min-w-[120px]">• Fit:</span>
          <span className="text-gray-600 flex-1">{product.fit}</span>
        </div>
      )}
      {product.fabric && (
        <div className="flex">
          <span className="text-gray-700 font-medium min-w-[120px]">• Fabric:</span>
          <span className="text-gray-600 flex-1">{product.fabric}</span>
        </div>
      )}
      {product.functionality && (
        <div className="flex">
          <span className="text-gray-700 font-medium min-w-[120px]">• Functionality:</span>
          <span className="text-gray-600 flex-1">{product.functionality}</span>
        </div>
      )}
    </div>
  )}

  {/* Product Details - Only show section if at least one field has data */}
  {(product.material || product.fabricWeight || product.care) && (
    <div className="mb-4">
      <h4 className="text-gray-900 font-semibold mb-2">Product Details:</h4>
      <div className="space-y-2">
        {product.material && (
          <div className="flex">
            <span className="text-gray-700 font-medium min-w-[140px]">• Material:</span>
            <span className="text-gray-600 flex-1">{product.material}</span>
          </div>
        )}
        {product.fabricWeight && (
          <div className="flex">
            <span className="text-gray-700 font-medium min-w-[140px]">• Fabric Weight:</span>
            <span className="text-gray-600 flex-1">{product.fabricWeight}</span>
          </div>
        )}
        {product.care && (
          <div className="flex">
            <span className="text-gray-700 font-medium min-w-[140px]">• Materials & Care:</span>
            <span className="text-gray-600 flex-1">{product.care}</span>
          </div>
        )}
      </div>
    </div>
  )}

  {/* Size & Fit - Only show section if at least one field has data */}
  {(product.sizeFit || product.maleModel || product.femaleModel) && (
    <div className="mb-4">
      <h4 className="text-gray-900 font-semibold mb-2">SIZE & FIT:</h4>
      <div className="space-y-2">
        {product.sizeFit && (
          <div className="flex">
            <span className="text-gray-700 font-medium">• </span>
            <span className="text-gray-600 flex-1">{product.sizeFit}</span>
          </div>
        )}
        {product.maleModel && (
          <div className="flex">
            <span className="text-gray-700 font-medium min-w-[120px]">• Male Model:</span>
            <span className="text-gray-600 flex-1">{product.maleModel}</span>
          </div>
        )}
        {product.femaleModel && (
          <div className="flex">
            <span className="text-gray-700 font-medium min-w-[120px]">• Female Model:</span>
            <span className="text-gray-600 flex-1">{product.femaleModel}</span>
          </div>
        )}
      </div>
    </div>
  )}

  {/* Additional description if available */}
  {product.description && (
    <div className="mt-4 pt-3 border-t border-gray-100">
      <div className="text-gray-600 leading-relaxed">
        {product.description}
      </div>
    </div>
  )}
</div>
            </div>
          </div>
          
        </div>
        <Featuredcollection/>
      </div>
      

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Size Chart</h2>
              <button 
                onClick={() => setShowSizeChart(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border">Size</th>
                    <th className="p-2 text-left border">Chest (inches)</th>
                    <th className="p-2 text-left border">Waist (inches)</th>
                    <th className="p-2 text-left border">Hip (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(sizeChartData).map(([size, measurements]) => (
                    <tr key={size} className="hover:bg-gray-50">
                      <td className="p-2 border font-medium">{size}</td>
                      <td className="p-2 border">{measurements.chest}</td>
                      <td className="p-2 border">{measurements.waist}</td>
                      <td className="p-2 border">{measurements.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>Measurements are approximate. For the best fit, we recommend taking your own measurements and comparing them to the chart.</p>
            </div>
            
            <button
              onClick={() => setShowSizeChart(false)}
              className="mt-4 w-full py-2 bg-black text-white rounded-full hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
}