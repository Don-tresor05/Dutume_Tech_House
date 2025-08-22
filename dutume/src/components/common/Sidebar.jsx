import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const customerLinks = [
    { name: 'Products', path: '/customer/products', icon: '🛒' },
    { name: 'Cart', path: '/customer/cart', icon: '🛍️' },
    { name: 'Order History', path: '/customer/orders', icon: '📋' },
  ];

  const adminLinks = [
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Orders', path: '/admin/orders', icon: '📋' },
  ];

  const managerLinks = [
    { name: 'Orders', path: '/manager/orders', icon: '📋' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin':
        return adminLinks;
      case 'manager':
        return managerLinks;
      case 'customer':
        return customerLinks;
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
      </div>
      <nav className="mt-4">
        {getLinks().map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
              isActive(link.path) ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;