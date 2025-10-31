import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../service/api';
import { AuthContext } from '../context/AuthContext'; // 2. Import AuthContext
import { toast } from 'react-toastify';

function ProductPageSkeleton() {
  return (
    <div className="page product" style={{ opacity: 0.6 }}>
      <div className="product-media skeleton-box"></div>
      <div className="product-body">
        <div className="skeleton-box skeleton-title"></div>
        <div className="skeleton-box skeleton-meta"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-text skeleton-short"></div>
      </div>
      <style>{`
        .skeleton-box { 
          background-color: #e0e0e0; 
          border-radius: 12px; 
          position: relative;
          overflow: hidden;
          margin: 6px 0;
        }
        .skeleton-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(to right, transparent 0%, #f0f0f0 50%, transparent 100%);
          animation: shimmer 1.5s infinite;
        }
        .skeleton-title { height: 36px; width: 70%; }
        .skeleton-meta { height: 24px; width: 50%; }
        .skeleton-text { height: 16px; width: 100%; }
        .skeleton-short { width: 80%; }
        @keyframes shimmer { 0% { left: -150%; } 100% { left: 150%; } }
      `}</style>
    </div>
  );
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(fetchProduct, 300);
  }, [id]);

  const handleQuantity = (type) => {
    setQuantity(prev => (type === 'inc' ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  // 5. "Add to Cart" click කළාම run වෙන function එක
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} ${product.name}(s) added to cart!`);
    }
  };

  if (loading) return <ProductPageSkeleton />;

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h1>404 - Product Not Found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .page.product {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 1200px;
          margin: 80px auto;
          padding: 40px 20px;
          font-family: 'Poppins', sans-serif;
          gap: 60px;
        }

        .product-media {
          flex: 1 1 480px;
          max-width: 500px;
          height: 480px;
          border-radius: 24px;
          background: #f9fafb center/cover no-repeat;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .product-media:hover {
          transform: scale(1.04) rotate(-1deg);
          box-shadow: 0 18px 48px rgba(0,0,0,0.18);
        }

        .product-body {
          flex: 1 1 420px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeIn 0.6s ease;
        }

        .product-body h1 {
          font-size: 2.3rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .meta {
          display: flex;
          gap: 14px;
          font-size: 0.95rem;
          color: #6b7280;
        }
        .meta span {
          background: #f3f4f6;
          padding: 6px 14px;
          border-radius: 16px;
          font-weight: 500;
        }

        .desc {
          font-size: 1rem;
          color: #4b5563;
          line-height: 1.7;
        }

        .qty {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 12px;
        }
        .qty button {
          background: #ff7a18;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          outline: none;
        }
        .qty button:hover { transform: scale(1.1); box-shadow: 0 6px 14px rgba(255,122,24,0.5); }
        .qty span { font-size: 1.25rem; font-weight: 600; min-width: 28px; text-align: center; }

        .actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid #f3f4f6;
        }

        .price {
          font-size: 1.9rem;
          font-weight: 700;
          color: #f97316;
        }

        .primary {
          background: linear-gradient(135deg, #f97316, #ea580c);
          border: none;
          color: white;
          font-weight: 600;
          padding: 14px 36px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          letter-spacing: 0.3px;
          outline: none;
        }
        .primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(249,115,22,0.45);
          outline: none;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .page.product { flex-direction: column; align-items: center; gap: 40px; margin: 40px 0; padding: 20px; }
          .product-media { width: 100%; height: 360px; }
          .product-body h1 { font-size: 1.9rem; }
          .actions { flex-direction: column; gap: 16px; }
          .price { font-size: 1.6rem; }
          .primary { width: 100%; }
        }
      `}</style>

      <div className="page product">
        <div 
          className="product-media" 
          style={{ backgroundImage: `url(http://localhost:8080${product.imageUrl})` }}
        />
        <div className="product-body">
          <h1>{product.name}</h1>
          <div className="meta">
            <span>⭐ {product.rating}</span>
            <span>🚚 Free Shipping</span>
            <span>⏱️ 10–15 min</span>
          </div>
          <p className="desc">{product.description || "No description available for this product."}</p>

          <div className="qty">
            <button onClick={() => handleQuantity('dec')}>−</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantity('inc')}>+</button>
          </div>

          <div className="actions">
            <div className="price">${(product.price * quantity).toFixed(2)}</div>
            <button className="primary" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
