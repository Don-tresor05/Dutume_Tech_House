import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import DashboardLayout from '../../layout/DashboardLayout';
import Loading from '../../common/Loading';

const ProductList = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 99.99,
          stockQuantity: 25,
          image: 'https://via.placeholder.com/300'
        },
        {
          id: 2,
          name: 'Smart Watch',
          description: 'Feature-rich smartwatch with health monitoring',
          price: 199.99,
          stockQuantity: 15,
          image: 'https://via.placeholder.com/300'
        },
        {
          id: 3,
          name: 'Bluetooth Speaker',
          description: 'Portable Bluetooth speaker with excellent sound quality',
          price: 79.99,
          stockQuantity: 30,
          image: 'https://via.placeholder.com/300'
        },
        {
          id: 4,
          name: 'Gaming Mouse',
          description: 'Precision gaming mouse with RGB lighting',
          price: 49.99,
          stockQuantity: 0,
          image: 'https://via.placeholder.com/300'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout user={user} onLogout={onLogout}>
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductList;