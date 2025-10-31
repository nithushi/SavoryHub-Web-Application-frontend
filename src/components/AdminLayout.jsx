import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3 } from 'lucide-react';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin" end> <LayoutDashboard size={18} /> Dashboard </NavLink>
          <NavLink to="/admin/products"> <Package size={18} /> Products </NavLink>
          <NavLink to="/admin/orders"> <ShoppingCart size={18} /> Orders </NavLink>
          <NavLink to="/admin/users"> <Users size={18} /> Users </NavLink>
          <NavLink to="/admin/reports"> <BarChart3 size={18} /> Reports </NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet /> {/* Admin pages ටික render වෙන්නේ මෙතන */}
      </main>

      <style>{`
        .admin-layout { display: flex; min-height: 100vh; background-color: #f1f5f9; }
        .admin-sidebar { width: 250px; background: #28313eff; color: #e2e8f0; display: flex; flex-direction: column; flex-shrink: 0; }
        .sidebar-header { padding: 24px; font-size: 1.4rem; font-weight: 600; border-bottom: 1px solid #334155; }
        .sidebar-nav { display: flex; flex-direction: column; padding: 16px; }
        .sidebar-nav a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: #94a3b8;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-nav a:hover { background: #334155; color: #f1f5f9; }
        .sidebar-nav a.active { background: #f97316; color: white; }
        .admin-content { flex-grow: 1; padding: 40px; overflow-y: auto; }
      `}</style>
    </div>
  );
}

export default AdminLayout;