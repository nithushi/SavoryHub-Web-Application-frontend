import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../service/api'; // Make sure the path is correct
import { toast } from 'react-toastify';

function CheckoutPage() {
  const { user, cartItems, clearCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadingDetails, setLoadingDetails] = useState(true);

  // State for form inputs, pre-filled with basic user data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user ? `${user.fname} ${user.lname}` : '',
    address: '',
    city: '',
    postalCode: '',
    phone: user?.contact || '',
  });

  // Fetch user's saved details (including address) when the page loads
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoadingDetails(true);
      try {
        const response = await api.get('/user/me');
        const userDetails = response.data;
        
        // Update form fields only if the user has a saved address
        if (userDetails.address) {
            setShippingInfo(prev => ({
              ...prev,
              address: userDetails.address,
              city: userDetails.city,
              postalCode: userDetails.postalCode,
            }));
        }
      } catch (error) {
        console.error("Could not fetch user details.", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    if (user) {
        fetchUserDetails();
    } else {
        setLoadingDetails(false);
    }
  }, [user]); // Run this effect when the user object from context is available

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handles form submission, places the order via API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const promiseToast = toast.loading("Placing your order...");

    try {
      await api.post('/orders/place', shippingInfo);
      
      clearCart();
      
      // Clear the form fields after successful submission
      setShippingInfo({ fullName: '', address: '', city: '', postalCode: '', phone: '' });

      toast.update(promiseToast, { 
        render: "Order placed successfully!", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error("Failed to place order:", error);
      toast.update(promiseToast, { 
        render: "Failed to place order. Please try again.", 
        type: "error", 
        isLoading: false, 
        autoClose: 5000 
      });
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shippingFee;

  if (loadingDetails) {
    return <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Loading your details...</div>;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-layout">
        {/* Left Side: Shipping Form */}
        <div className="shipping-form-container">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit} className="shipping-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Street name and house number" value={shippingInfo.address} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={shippingInfo.phone} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="submit-btn">Continue to Payment</button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="order-summary-container">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div className="summary-item" key={item.id}>
                <img src={`http://localhost:8080${item.product.imageUrl}`} alt={item.product.name} />
                <div className="summary-item-details">
                  <span>{item.product.name}</span>
                  <span className="summary-item-qty">x {item.quantity}</span>
                </div>
                <span className="summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-total-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-total-row">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-total-row final-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Styles for the Checkout Page */}
      <style>{`
        .checkout-container { padding: 40px; max-width: 1200px; margin: 0 auto; font-family: 'Poppins', sans-serif; animation: pageFadeIn 0.6s ease-out; }
        .checkout-title { text-align: center; font-size: 2.5rem; margin-bottom: 40px; color: #1f2937; }
        .checkout-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 50px; }

        /* Shipping Form Styles */
        .shipping-form-container h2 { font-size: 1.5rem; margin-bottom: 24px; }
        .shipping-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; }
        .form-group label { margin-bottom: 8px; font-weight: 500; color: #374151; }
        .form-group input { padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: #f97316; box-shadow: 0 0 0 2px rgba(249,115,22,0.2); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .submit-btn { background: #f97316; color: white; padding: 14px; border-radius: 8px; border: none; font-size: 1rem; font-weight: 600; cursor: pointer; margin-top: 10px; transition: all 0.3s ease; }
        .submit-btn:hover { background: #ea580c; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(249,115,22,0.3); }

        /* Order Summary Styles */
        .order-summary-container { background: #f9fafb; padding: 30px; border-radius: 16px; align-self: flex-start; position: sticky; top: 100px; }
        .order-summary-container h2 { font-size: 1.5rem; margin-top: 0; margin-bottom: 24px; }
        .summary-items { display: flex; flex-direction: column; gap: 16px; max-height: 300px; overflow-y: auto; padding-right: 10px; }
        .summary-item { display: flex; align-items: center; gap: 16px; }
        .summary-item img { width: 50px; height: 50px; border-radius: 8px; object-fit: cover; }
        .summary-item-details { flex-grow: 1; }
        .summary-item-qty { color: #6b7280; margin-left: 8px; }
        .summary-item-price { font-weight: 600; }
        .summary-total-row { display: flex; justify-content: space-between; margin-top: 12px; }
        .final-total { font-weight: 700; font-size: 1.2rem; }
        hr { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
        
        /* Responsive */
        @media (max-width: 900px) { .checkout-layout { grid-template-columns: 1fr; } .order-summary-container { position: static; top: auto; } }
      `}</style>
    </div>
  );
}

export default CheckoutPage;