import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import Loading from '../../common/Loading';

const OrderStatusManager = ({ user, onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 1001,
          customer: 'John Doe',
          date: '2023-05-20',
          total: 125.99,
          status: 'pending',
          items: [
            { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
            { name: 'Charging Cable', quantity: 2, price: 13.00 }
          ]
        },
        {
          id: 1002,
          customer: 'Jane Smith',
          date: '2023-05-19',
          total: 89.50,
          status: 'processing',
          items: [
            { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
            { name: 'Audio Cable', quantity: 1, price: 9.51 }
          ]
        },
        {
          id: 1003,
          customer: 'Bob Johnson',
          date: '2023-05-18',
          total: 45.75,
          status: 'shipped',
          items: [
            { name: 'Phone Case', quantity: 3, price: 15.25 }
          ]
        },
        {
          id: 1004,
          customer: 'Alice Brown',
          date: '2023-05-17',
          total: 199.99,
          status: 'delivered',
          items: [
            { name: 'Smart Watch', quantity: 1, price: 199.99 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusOptions = (currentStatus) => {
    const statusFlow = {
      pending: ['processing', 'cancelled'],
      processing: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: []
    };
    
    return statusFlow[currentStatus] || [];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Status Management</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getStatusOptions(order.status).length > 0 ? (
                      <select
                        value=""
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="">Change status...</option>
                        {getStatusOptions(order.status).map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-gray-500">No updates available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
            <p className="text-gray-600">No orders found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderStatusManager;