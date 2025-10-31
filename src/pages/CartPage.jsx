import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(AuthContext);

  // Calculate total price using the correct data structure (item.product.price)
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 5.00 : 0; // Add a dummy shipping fee
  const total = subtotal + shippingFee;

  return (
    <div className="cart-page-container">
      <h1 className="cart-main-title">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <svg className="empty-cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="shop-now-button">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Left Column: Cart Items */}
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div className="cart-item-card" key={item.id}>
                <img src={`http://localhost:8080${item.product.imageUrl}`} alt={item.product.name} className="item-img" />
                <div className="item-info">
                  <h3>{item.product.name}</h3>
                  <p className="item-price">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total-price">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="cart-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
          </div>
        </div>
      )}

      {/* --- Modern & Creative Styles --- */}
      <style>{`
        .cart-page-container { 
          padding: 40px; 
          max-width: 1200px; 
          margin: 0 auto; 
          font-family: 'Poppins', sans-serif; 
          animation: pageFadeIn 0.6s ease-out;
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cart-main-title { 
          text-align: center; 
          font-size: 2.5rem; 
          margin-bottom: 40px; 
          color: #1f2937; 
          font-weight: 700;
        }

        /* --- Empty Cart View --- */
        .empty-cart-container { 
          text-align: center; 
          padding: 60px 40px; 
          background: #f9fafb; 
          border-radius: 20px;
          border: 1px dashed #d1d5db;
        }
        .empty-cart-icon {
          width: 80px;
          height: 80px;
          color: #d1d5db;
          margin: 0 auto 20px;
        }
        .empty-cart-container h2 { font-size: 1.8rem; color: #374151; margin-bottom: 10px; }
        .empty-cart-container p { font-size: 1.1rem; color: #6b7280; margin-bottom: 30px; }
        .shop-now-button { 
          background: #f97316; 
          color: white; 
          padding: 14px 28px; 
          border-radius: 12px; 
          text-decoration: none; 
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .shop-now-button:hover {
          background: #ea580c;
          box-shadow: 0 6px 15px rgba(249,115,22,0.4);
          transform: translateY(-3px);
        }

        /* --- Cart Layout --- */
        .cart-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        /* --- Items List (Left) --- */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-item-card { 
          display: grid;
          grid-template-columns: auto 1fr auto auto auto;
          align-items: center; 
          gap: 16px; 
          padding: 20px; 
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease;
        }
        .cart-item-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .item-img { width: 90px; height: 90px; border-radius: 12px; object-fit: cover; }
        .item-info h3 { font-size: 1.1rem; margin: 0 0 4px 0; font-weight: 600; }
        .item-info .item-price { color: #6b7280; font-size: 0.9rem; }
        
        .quantity-controls { display: flex; align-items: center; gap: 12px; }
        .quantity-controls button { 
          background: #f3f4f6; 
          border: none; 
          width: 32px; 
          height: 32px; 
          border-radius: 50%; 
          cursor: pointer; 
          font-size: 1.3rem; 
          color: #374151;
          transition: background 0.2s ease;
          outline:none;
        }
        .quantity-controls button:hover { background: #e5e7eb; }
        .quantity-controls span { font-weight: 600; font-size: 1.1rem; }

        .item-total-price { font-weight: 700; font-size: 1.1rem; width: 100px; text-align: right; }
        .remove-item-btn { background: none; border: none; font-size: 1.6rem; color: #9ca3af; cursor: pointer; transition: color 0.2s ease; outline:none; }
        .remove-item-btn:hover { color: #ef4444;  outline:none; }

        /* --- Summary Card (Right) --- */
        .cart-summary-card {
          background: #f9fafb;
          padding: 30px;
          border-radius: 20px;
          align-self: flex-start; /* Stick to the top */
          position: sticky;
          top: 100px; /* Adjust based on navbar height */
        }
        .cart-summary-card h2 { font-size: 1.5rem; margin-top: 0; margin-bottom: 24px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 16px; color: #4b5563; }
        .summary-divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
        .total-row { font-weight: 700; font-size: 1.2rem; color: #111827; }

        .checkout-button { 
          background: #16a34a; 
          color: white; 
          border: none; 
          padding: 16px; 
          border-radius: 12px; 
          font-size: 1.1rem; 
          font-weight: 600;
          cursor: pointer; 
          width: 100%;
          margin-top: 20px;
          transition: all 0.3s ease;
        }
        .checkout-button:hover {
          background: #15803d;
          box-shadow: 0 6px 15px rgba(22,163,74,0.4);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-summary-card { position: static; top: auto; }
        }
        @media (max-width: 500px) {
          .cart-item-card { grid-template-columns: auto 1fr auto; grid-template-rows: auto auto; padding: 16px; }
          .item-img { grid-row: 1 / 3; }
          .item-info { grid-column: 2 / 3; }
          .quantity-controls { grid-row: 2 / 3; grid-column: 2 / 3; }
          .item-total-price { grid-row: 1 / 2; grid-column: 3 / 4; align-self: flex-start; }
          .remove-item-btn { grid-row: 2 / 3; grid-column: 3 / 4; align-self: flex-start; }
        }
      `}</style>
    </div>
  );
}

export default CartPage;