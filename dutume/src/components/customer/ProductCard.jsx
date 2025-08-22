import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add to cart logic would go here
    alert(`Added ${quantity} ${product.name}(s) to cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-indigo-600">${product.price}</span>
          <span
            className={`text-sm ${
              product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {product.stockQuantity > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <label htmlFor={`quantity-${product.id}`} className="text-sm text-gray-700">
              Qty:
            </label>
            <input
              id={`quantity-${product.id}`}
              type="number"
              min="1"
              max={product.stockQuantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0}
          className={`w-full py-2 px-4 rounded-md ${
            product.stockQuantity > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;