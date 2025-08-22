import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import Loading from '../../common/Loading';

const OrderHistory = ({ user, onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          date: '2023-05-15',
          total: 125.99,
          status: 'delivered',
          items: [
            { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
            { name: 'Charging Cable', quantity: 2, price: 13.00 }
          ]
        },
        {
          id: 2,
          date: '2023-05-18',
          total: 89.50,
          status: 'shipped',
          items: [
            { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
            { name: 'Audio Cable', quantity: 1, price: 9.51 }
          ]
        },
        {
          id: 3,
          date: '2023-05-20',
          total: 45.75,
          status: 'pending',
          items: [
            { name: 'Phone Case', quantity: 3, price: 15.25 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">No orders found.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        Order #{order.id}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Date: {order.date}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>Total: ${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                      <ul className="mt-1 space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm text-gray-500">
                            {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderHistory;