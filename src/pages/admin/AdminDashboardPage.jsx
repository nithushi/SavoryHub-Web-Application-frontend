import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import { Package, ShoppingCart, Users, BarChart3, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

// Reusable component for displaying a single statistic card
const StatCard = ({ icon, title, value, colorClass, loading }) => (
  <div className={`stat-card ${colorClass}`}>
    <div className="icon-wrapper">{icon}</div>
    <div className="stat-info">
      <h3>{title}</h3>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <span className="card-value">{value}</span>
      )}
    </div>
  </div>
);

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        toast.error("Could not load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>An overview of your store's performance.</p>
        </div>
        <div className="admin-badge">Administrator</div>
      </div>

      {/* --- Stat Cards Section --- */}
      <div className="stat-cards-grid">
        <StatCard 
          icon={<BarChart3 size={28} />} 
          title="Total Revenue" 
          value={`$${stats?.totalRevenue.toFixed(2) || '0.00'}`} 
          colorClass="revenue"
          loading={loading}
        />
        <StatCard 
          icon={<ShoppingCart size={28} />} 
          title="Total Orders" 
          value={stats?.totalOrders ?? 0}
          colorClass="orders"
          loading={loading}
        />
        <StatCard 
          icon={<Package size={28} />} 
          title="Pending Orders" 
          value={stats?.pendingOrders ?? 0} 
          colorClass="pending"
          loading={loading}
        />
        <StatCard 
          icon={<Users size={28} />} 
          title="Total Users" 
          value={stats?.totalUsers ?? 0}
          colorClass="users"
          loading={loading}
        />
      </div>

      {/* --- Quick Overview / Navigation Cards Section --- */}
      <div className="dashboard-content">
        <h2>Quick Overview</h2>
        <div className="nav-cards-grid">
          <Link to="/admin/products" className="nav-card">
            <div className="icon-wrapper bg-orange-100 text-orange-600">
              <Package size={28} />
            </div>
            <div>
              <h3>Products</h3>
              <p>Manage and update your product catalog.</p>
            </div>
          </Link>

          <Link to="/admin/orders" className="nav-card">
            <div className="icon-wrapper bg-blue-100 text-blue-600">
              <ShoppingCart size={28} />
            </div>
            <div>
              <h3>Orders</h3>
              <p>Track and manage customer orders.</p>
            </div>
          </Link>

          <Link to="/admin/users" className="nav-card">
            <div className="icon-wrapper bg-green-100 text-green-600">
              <Users size={28} />
            </div>
            <div>
              <h3>Users</h3>
              <p>View and control registered users.</p>
            </div>
          </Link>

          <Link to="/admin/reports" className="nav-card">
            <div className="icon-wrapper bg-purple-100 text-purple-600">
              <BarChart3 size={28} />
            </div>
            <div>
              <h3>Reports</h3>
              <p>Analyze performance and insights.</p>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          font-family: 'Poppins', sans-serif;
          padding: 40px;
          background: #f8fafc;
          min-height: 100vh;
          color: #111827;
        }

        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .dashboard-header h1 { font-size: 2.2rem; margin: 0; color: #1e293b; }
        .dashboard-header p { color: #64748b; margin-top: 6px; }
        .admin-badge { background: #1e293b; color: white; font-weight: 500; padding: 8px 18px; border-radius: 9999px; }

        /* Stat Cards */
        .stat-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 50px; }
        .stat-card { display: flex; align-items: center; gap: 20px; background: white; border-radius: 18px; padding: 28px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .stat-info h3 { margin: 0; font-size: 1rem; color: #4b5563; font-weight: 500; }
        .card-value { font-size: 2rem; font-weight: 700; color: #1e293b; margin-top: 4px; display: block; }
        
        .icon-wrapper { display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 16px; flex-shrink: 0; }
        .revenue { border-left: 4px solid #16a34a; }
        .revenue .icon-wrapper { background-color: #dcfce7; color: #16a34a; }
        .orders { border-left: 4px solid #3b82f6; }
        .orders .icon-wrapper { background-color: #dbeafe; color: #3b82f6; }
        .pending { border-left: 4px solid #f97316; }
        .pending .icon-wrapper { background-color: #ffedd5; color: #f97316; }
        .users { border-left: 4px solid #4f46e5; }
        .users .icon-wrapper { background-color: #e0e7ff; color: #4f46e5; }
        
        .loading-spinner { border: 3px solid rgba(0,0,0,0.1); border-top: 3px solid #3b82f6; border-radius: 50%; width: 32px; height: 32px; animation: spin 1s linear infinite; margin-top: 4px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Navigation Cards */
        .dashboard-content { background: white; padding: 32px; border-radius: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .dashboard-content h2 { margin-top: 0; color: #1e293b; font-size: 1.5rem; }
        
        .nav-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 24px; }
        .nav-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        .nav-card:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-color: #f97316; }
        .nav-card h3 { margin: 0; font-size: 1.2rem; color: #111827; }
        .nav-card p { color: #6b7280; font-size: 0.9rem; margin-top: 4px; }

        .bg-orange-100 { background-color: #ffedd5; }
        .text-orange-600 { color: #ea580c; }
        .bg-blue-100 { background-color: #dbeafe; }
        .text-blue-600 { color: #2563eb; }
        .bg-green-100 { background-color: #dcfce7; }
        .text-green-600 { color: #16a34a; }
        .bg-purple-100 { background-color: #e0e7ff; }
        .text-purple-600 { color: #4f46e5; }
      `}</style>
    </div>
  );
}

export default AdminDashboardPage;