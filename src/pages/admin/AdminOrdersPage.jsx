import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { Loader2, PackageSearch } from 'lucide-react';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders/all');
      setOrders(response.data);
    } catch (error) {
      toast.error("Could not fetch orders.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (orderId, newStatus) => {
    try {
        const response = await api.put(`/orders/${orderId}/status`, { status: newStatus });
        // Update the specific order in the local state
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? response.data : order
            )
        );
        toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (error) {
        toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="admin-page-content">
      <div className="page-header">
        <h1>Order Management</h1>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={32} />
            <p>Loading all orders...</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan="5" className="no-data-msg">
                    <PackageSearch size={40} />
                    No orders found.
                </td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.user.fname} {order.user.lname}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`status-select status-${order.status?.toLowerCase()}`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-page-content { animation: fadeIn 0.4s ease; }
        .page-header { margin-bottom: 30px; }
        .page-header h1 { font-size: 1.8rem; font-weight: 600; color: #1e293b; }
        .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 16px 20px; text-align: left; border-bottom: 1px solid #e5e7eb; white-space: nowrap; }
        th { background: #f9fafb; font-weight: 600; color: #6b7280; text-transform: uppercase; font-size: 0.8rem; }
        
        .status-select {
          border: none;
          border-radius: 6px;
          padding: 6px 10px;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }
        .status-pending { background-color: #ffedd5; color: #f97316; }
        .status-processing { background-color: #dbeafe; color: #2563eb; }
        .status-shipped { background-color: #e0e7ff; color: #4f46e5; }
        .status-delivered { background-color: #dcfce7; color: #16a34a; }
        .status-cancelled { background-color: #fee2e2; color: #ef4444; }

        .loading-state, .no-data-msg { text-align: center; padding: 60px; color: #64748b; }
        .spinner { animation: spin 1s linear infinite; margin-bottom: 12px; color: #3b82f6; }
        .no-data-msg { display: flex; flex-direction: column; align-items: center; gap: 16px; font-size: 1.1rem; font-weight: 500; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default AdminOrdersPage;