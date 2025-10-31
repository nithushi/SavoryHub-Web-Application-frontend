import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { Loader2, Users, CheckCircle, XCircle } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/user/all');
      setUsers(response.data);
    } catch (error) {
      toast.error("Could not fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    // ... (this function is unchanged)
  };

  // --- NEW: Function to handle user status toggle ---
  const handleToggleStatus = async (userId, currentStatus) => {
    const action = currentStatus ? "Deactivate" : "Activate";
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const response = await api.put(`/user/${userId}/toggle-status`);
        setUsers(prevUsers =>
          prevUsers.map(u => (u.id === userId ? response.data : u))
        );
        toast.success(`User successfully ${action}d.`);
      } catch (error) {
        toast.error(error.response?.data || `Failed to ${action} user.`);
      }
    }
  };

  return (
    <div className="admin-page-content">
      <div className="page-header">
        <h1>User Management</h1>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={32} />
            <p>Loading users...</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th> {/* <-- NEW COLUMN */}
                <th>Actions</th> {/* <-- NEW COLUMN */}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="6" className="no-data-msg">
                    <Users size={40} />
                    No users found.
                </td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`role-select role-${user.role?.toLowerCase()}`}
                        disabled={currentUser?.id === user.id}
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    {/* --- NEW: Status Column --- */}
                    <td>
                      <span className={`status ${user.enabled ? 'status-active' : 'status-inactive'}`}>
                        {user.enabled ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {user.enabled ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    {/* --- NEW: Actions Column --- */}
                    <td>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.enabled)}
                        className={`btn-toggle ${user.enabled ? 'toggle-deactivate' : 'toggle-activate'}`}
                        disabled={currentUser?.id === user.id}
                      >
                        {user.enabled ? 'Deactivate' : 'Activate'}
                      </button>
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
        
        .role-select { border: none; border-radius: 6px; padding: 8px 12px; font-weight: 600; cursor: pointer; outline: none; }
        .role-select:disabled { cursor: not-allowed; opacity: 0.7; }
        .role-user { background-color: #e0e7ff; color: #4338ca; }
        .role-admin { background-color: #dcfce7; color: #166534; }

        .status { display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; padding: 5px 10px; border-radius: 20px; }
        .status-active { background: #dcfce7; color: #166534; }
        .status-inactive { background: #fee2e2; color: #b91c1c; }

        .btn-toggle { border: none; border-radius: 6px; padding: 8px 12px; font-weight: 600; cursor: pointer; }
        .btn-toggle:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }
        .toggle-activate { background: #22c55e; color: white; }
        .toggle-deactivate { background: #fef08a; color: #a16207; }

        .loading-state, .no-data-msg { text-align: center; padding: 60px; color: #64748b; }
        .spinner { animation: spin 1s linear infinite; margin-bottom: 12px; color: #3b82f6; }
        .no-data-msg { display: flex; flex-direction: column; align-items: center; gap: 16px; font-size: 1.1rem; font-weight: 500; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default AdminUsersPage;