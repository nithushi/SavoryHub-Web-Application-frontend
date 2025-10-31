import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Users, Loader2 } from 'lucide-react';

const chartData = [
    { name: 'Mon', Orders: 4 },
    { name: 'Tue', Orders: 3 },
    { name: 'Wed', Orders: 5 },
    { name: 'Thu', Orders: 2 },
    { name: 'Fri', Orders: 7 },
    { name: 'Sat', Orders: 9 },
    { name: 'Sun', Orders: 6 },
];

const StatCard = ({ icon, title, value, gradient }) => (
    <div className="stat-card" style={{ background: gradient }}>
        <div className="stat-content">
            <div className="icon-wrapper">{icon}</div>
            <div>
                <h3>{title}</h3>
                <span className="card-value">{value}</span>
            </div>
        </div>
    </div>
);

function AdminReportsPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const response = await api.get('/admin/reports/analytics');
                setStats(response.data);
            } catch (error) {
                toast.error("Could not load analytics.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Reports & Analytics</h1>
                <p className="subtitle">Track your store’s performance this week</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <Loader2 className="spinner" size={36} />
                    <p>Loading analytics...</p>
                </div>
            ) : (
                <>
                    <div className="stats-grid">
                        <StatCard 
                            icon={<DollarSign size={26} />}
                            title="Total Revenue"
                            value={`$${stats?.totalRevenue.toFixed(2) || '0.00'}`}
                            gradient="linear-gradient(135deg, #dcfce7, #bbf7d0)"
                        />
                        <StatCard 
                            icon={<ShoppingCart size={26} />}
                            title="Total Orders"
                            value={stats?.totalOrders ?? 0}
                            gradient="linear-gradient(135deg, #dbeafe, #bfdbfe)"
                        />
                        <StatCard 
                            icon={<Users size={26} />}
                            title="Total Users"
                            value={stats?.totalUsers ?? 0}
                            gradient="linear-gradient(135deg, #e0e7ff, #c7d2fe)"
                        />
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">
                            <h2>Weekly Orders Overview</h2>
                            <p className="chart-subtext">Visual breakdown of orders this week</p>
                        </div>

                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip contentStyle={{ borderRadius: 10, background: "#f8fafc" }} />
                                <Bar dataKey="Orders" fill="#fb923c" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            <style>{`
                .admin-page-content {
                    padding: 40px 50px;
                    background: linear-gradient(to right, #f8fafc, #f1f5f9);
                    min-height: 100vh;
                    animation: fadeIn 0.5s ease;
                }

                .page-header {
                    text-align: left;
                    margin-bottom: 40px;
                }

                .page-header h1 {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }

                .subtitle {
                    color: #64748b;
                    margin-top: 6px;
                    font-size: 1rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
                    gap: 28px;
                    margin-bottom: 50px;
                }

                .stat-card {
                    border-radius: 16px;
                    padding: 26px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    background: white;
                    cursor: pointer;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.12);
                }

                .stat-content {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .icon-wrapper {
                    width: 60px;
                    height: 60px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.5);
                    color: #1e293b;
                    box-shadow: inset 0 0 10px rgba(255,255,255,0.3);
                }

                .stat-card h3 {
                    margin: 0;
                    color: #334155;
                    font-size: 1rem;
                    font-weight: 500;
                }

                .card-value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #0f172a;
                }

                .chart-container {
                    background: white;
                    padding: 30px;
                    border-radius: 16px;
                    box-shadow: 0 6px 25px rgba(0,0,0,0.05);
                }

                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .chart-header h2 {
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #1e293b;
                }

                .chart-subtext {
                    color: #94a3b8;
                    font-size: 0.9rem;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 80px;
                    color: #475569;
                    font-size: 1.1rem;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                    margin-bottom: 10px;
                    color: #3b82f6;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default AdminReportsPage;
