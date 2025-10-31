import React, { useState, useContext, useEffect, useRef } from 'react'; // useRef එකත් import කරන්න
import { AuthContext } from '../context/AuthContext';
import api from '../service/api';
import { toast } from 'react-toastify';
import avatar from '../assets/logo/logo.png';

// --- Password Change Form Component (No Change) ---
function PasswordChangeForm() {
    // ... (Your existing PasswordChangeForm component code) ...
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        if (passwords.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        const promiseToast = toast.loading("Changing your password...");
        try {
            await api.post('/user/change-password', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            toast.update(promiseToast, { render: "Password changed successfully!", type: "success", isLoading: false, autoClose: 3000 });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Clear fields after success
        } catch (error) {
            const errorMessage = error.response?.data || "Failed to change password. Please check your current password.";
            toast.update(promiseToast, { render: errorMessage, type: "error", isLoading: false, autoClose: 4000 });
        }
    };

    return (
        <form onSubmit={handleSubmitPassword}>
            <h2>Change Password</h2>
            <div className="details-grid">
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <label>Current Password</label>
                    <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} className="input-edit" required />
                </div>
                <div className="detail-item">
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="input-edit" required />
                </div>
                <div className="detail-item">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="input-edit" required />
                </div>
            </div>
            <div className="edit-actions">
                <button type="submit" className="save-btn">Update Password</button>
            </div>
        </form>
    );
}

// --- Main Profile Page Component ---
function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const { user, updateUser } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fname: user?.fname || '',
        lname: user?.lname || '',
        contact: user?.contact || '',
    });

    const fileInputRef = useRef(null); // <-- File input එකට reference එකක්

    useEffect(() => {
        const fetchOrders = async () => {
            if (activeTab === 'orders' && orders.length === 0) {
                setLoadingOrders(true);
                try {
                    const response = await api.get('/orders/my-orders');
                    setOrders(response.data);
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                } finally {
                    setLoadingOrders(false);
                }
            }
        };
        fetchOrders();
    }, [activeTab, orders.length]);

    useEffect(() => {
        if (user) {
            setFormData({
                fname: user.fname,
                lname: user.lname,
                contact: user.contact,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        const promiseToast = toast.loading("Updating your details...");
        try {
            const response = await api.put('/user/update', formData);
            updateUser(response.data);
            toast.update(promiseToast, { render: "Details updated successfully!", type: "success", isLoading: false, autoClose: 2000 });
            setIsEditing(false);
        } catch (error) {
            toast.update(promiseToast, { render: "Failed to update. Please try again.", type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    // --- NEW: Handle Image Upload ---
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        const promiseToast = toast.loading("Uploading profile image...");
        try {
            const response = await api.post('/user/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Update the user context with the new profile image URL
            updateUser({ ...user, profileImage: response.data });
            toast.update(promiseToast, { render: "Profile image updated!", type: "success", isLoading: false, autoClose: 2000 });
        } catch (error) {
            const errorMessage = error.response?.data || "Failed to upload image.";
            toast.update(promiseToast, { render: errorMessage, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (!user) {
        return <div className="loading-container">Loading user profile...</div>;
    }

    const renderOrderContent = () => {
        if (loadingOrders) {
            return <tr><td colSpan="4" className="table-message">Loading your orders...</td></tr>;
        }
        if (orders.length === 0) {
            return <tr><td colSpan="4" className="table-message">You have no orders yet.</td></tr>;
        }
        return orders.map(order => (
            <tr key={order.id} className="order-row">
                <td>
                    {order.orderItems.length > 0
                        ? `${order.orderItems[0].product.name}${order.orderItems.length > 1 ? ` + ${order.orderItems.length - 1} more` : ''}`
                        : 'N/A'}
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td className={`status-${order.status?.toLowerCase()}`}>{order.status}</td>
            </tr>
        ));
    };

    // Correctly determine the image source
    const imageUrl = user.profileImage 
        ? `http://localhost:8080${user.profileImage}` 
        : avatar;

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                {/* --- UPDATED: Profile Avatar with Upload --- */}
                <div className="avatar-upload-container">
                    <img src={imageUrl}  className="profile-avatar" onClick={triggerFileInput} />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        style={{ display: 'none' }} 
                        accept="image/*" 
                    />
                    <button className="upload-overlay-btn" onClick={triggerFileInput}>
                        Upload
                    </button>
                </div>
                <div>
                    <h1>{`${user.fname} ${user.lname}`}</h1>
                    <p>{user.email}</p>
                    <p>{user.contact}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>
                    Profile Info
                </button>
                <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>
                    Order History
                </button>
                <button onClick={() => setActiveTab('security')} className={activeTab === 'security' ? 'active' : ''}>
                    Security
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'profile' && (
                    <div className="profile-card">
                        <div className="card-header">
                            <h2>Personal Details</h2>
                            {!isEditing && <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Details</button>}
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <label>First Name</label>
                                {isEditing ? <input name="fname" value={formData.fname} onChange={handleInputChange} className="input-edit" /> : <p>{user.fname}</p>}
                            </div>
                            <div className="detail-item">
                                <label>Last Name</label>
                                {isEditing ? <input name="lname" value={formData.lname} onChange={handleInputChange} className="input-edit" /> : <p>{user.lname}</p>}
                            </div>
                            <div className="detail-item">
                                <label>Email</label>
                                <p>{user.email}</p>
                            </div>
                            <div className="detail-item">
                                <label>Phone</label>
                                {isEditing ? <input name="contact" value={formData.contact} onChange={handleInputChange} className="input-edit" /> : <p>{user.contact}</p>}
                            </div>
                            <div className="detail-item">
                                <label>Address</label>
                                <p>{user.address ? `${user.address}, ${user.city}, ${user.postalCode}` : 'Not Set'}</p>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
                                <button className="cancel-btn" onClick={() => setIsEditing(false)}>✖ Cancel</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="profile-card">
                        <h2>My Orders</h2>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order Summary</th>
                                    <th>Date</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>{renderOrderContent()}</tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="profile-card">
                        <PasswordChangeForm />
                    </div>
                )}
            </div>

            <style>{`
                .profile-page {
                    font-family: 'Poppins', sans-serif;
                    padding: 40px;
                    max-width: 1000px;
                    margin: 0 auto;
                    animation: fadeIn 0.5s ease;
                }
                .loading-container {
                    padding: 40px;
                    text-align: center;
                }
                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    margin-bottom: 30px;
                }
                /* --- NEW: Avatar Upload Container Styles --- */
                .avatar-upload-container {
                    position: relative;
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    cursor: pointer;
                }
                .profile-avatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    transition: all 0.3s ease;
                }
                .avatar-upload-container:hover .profile-avatar {
                    filter: brightness(0.7); /* Darken image on hover */
                    transform: scale(1.05);
                }
                .upload-overlay-btn {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
                    color: white;
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 0.9rem;
                    opacity: 0; /* Hidden by default */
                    transition: opacity 0.3s ease;
                    cursor: pointer;
                    pointer-events: none; /* Allow clicks to pass through to avatar until hovered */
                    outline: none;
                }
                .avatar-upload-container:hover .upload-overlay-btn {
                    opacity: 1; /* Show on hover */
                    pointer-events: auto; /* Enable clicks on button */
                }

                /* --- Existing Styles (from previous steps) --- */
                .profile-header h1 {
                    margin: 0;
                    font-size: 2.2rem;
                    color: #111827;
                }
                .profile-header p {
                    margin: 4px 0;
                    color: #6b7280;
                }
                .profile-tabs {
                    display: flex;
                    border-bottom: 2px solid #e5e7eb;
                    margin-bottom: 20px;
                }
                .profile-tabs button {
                    padding: 12px 24px;
                    border: none;
                    border-bottom: 3px solid transparent;
                    background: none;
                    font-weight: 600;
                    cursor: pointer;
                    color: #6b7280;
                    transition: all 0.2s ease;
                    font-size: 1rem;
                    outline: none;
                }
                .profile-tabs button:hover {
                    color: #111827;
                    background-color: #f9fafb;
                }
                .profile-tabs button.active {
                    color: #111827;
                    border-bottom-color: #f97316;
                }
                .profile-card {
                    background: #ffffff;
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.06);
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .edit-btn {
                    background: linear-gradient(90deg, #f97316, #fb923c);
                    color: white;
                    border: none;
                    padding: 8px 18px;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    outline: none;
                }
                .edit-btn:hover {
                    box-shadow: 0 4px 15px rgba(249,115,22,0.4);
                    transform: translateY(-1px);
                }
                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    margin-top: 20px;
                }
                .detail-item label {
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 6px;
                    display: block;
                    font-size: 0.9rem;
                }
                .detail-item p {
                    color: #6b7280;
                    margin: 0;
                }
                .input-edit {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 10px;
                    border: 1.5px solid #d1d5db;
                    background: #f9fafb;
                    outline: none;
                    transition: border 0.3s ease, box-shadow 0.3s ease;
                }
                .input-edit:focus {
                    border-color: #f97316;
                    box-shadow: 0 0 0 4px rgba(249,115,22,0.15);
                }
                .edit-actions {
                    margin-top: 30px;
                    display: flex;
                    gap: 14px;
                }
                .save-btn {
                    background: linear-gradient(90deg, #16a34a, #22c55e);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .save-btn:hover {
                    box-shadow: 0 4px 15px rgba(22,163,74,0.4);
                    transform: translateY(-1px);
                }
                .cancel-btn {
                    background: #f3f4f6;
                    color: #374151;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .cancel-btn:hover {
                    background: #e5e7eb;
                    transform: translateY(-1px);
                }
                .cancel-btn:focus {
                    outline: none;
                    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.4);
                }
                .orders-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .orders-table th, .orders-table td {
                    padding: 14px;
                    text-align: left;
                }
                .orders-table thead {
                    border-bottom: 2px solid #e5e7eb;
                    color: #6b7280;
                }
                .order-row {
                    border-bottom: 1px solid #e5e7eb;
                    transition: background 0.2s ease;
                }
                .order-row:hover {
                    background: #fff7ed;
                }
                .status-delivered { color: #16a34a; font-weight: 600; }
                .status-pending { color: #f97316; font-weight: 600; }
                .status-cancelled { color: #ef4444; font-weight: 600; }
                .status-processing { color: #1361c7ff; font-weight: 600; }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default ProfilePage;