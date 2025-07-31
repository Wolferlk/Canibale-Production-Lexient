import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryShowcase() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'women',
      name: 'Women',
      image: "https://i.ibb.co/dDN5B2s/DSC07656.png",
      description: "Explore our collection designed for the modern woman"
    },
    {
      id: 'men',
      name: 'Men',
      image: "https://i.ibb.co/yQ8HcsZ/DSC07600.png",
      description: "Discover style and comfort in our men's collection"
    },
    {
      id: 'unisex',
      name: 'Unisex',
      image: "https://i.ibb.co/QJM0TMP/DSC07607.png",
      description: "Fashion without boundaries for everyone"
    }
  ];

  const handleNavigate = (categoryId: string) => {
    navigate(`/store?category=${categoryId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
       
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group relative flex flex-col bg-white border border-gray-200 overflow-hidden cursor-pointer"
              onClick={() => handleNavigate(category.id)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4 text-sm">{category.description}</p>
                <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <button 
                    className="bg-white text-black py-2 px-4 font-medium text-sm border border-white hover:bg-transparent hover:text-white transition-colors duration-300"
                  >
                    Shop {category.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
}