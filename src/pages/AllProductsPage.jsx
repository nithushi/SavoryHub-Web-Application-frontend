import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/api';

// --- Skeleton Loader Component (for a modern loading experience) ---
function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton-info">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-small"></div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect runs once when the component loads
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // We call the '/products/all' endpoint to get all products
        const response = await api.get('/products/all');
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch all products:", err);
        setError("Oops! Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };
    
    setTimeout(fetchAllProducts, 500); // Simulate loading
  }, []); // Empty array means this runs only once

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ));
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (products.length > 0) {
      return products.map((product) => (
        <Link to={`/product/${product.id}`} className="food-card" key={product.id}>
          <div 
            className="food-img"
            style={{ backgroundImage: `url(http://localhost:8080${product.imageUrl})` }}
          ></div>
          <div className="food-info">
            <h3>{product.name}</h3>
            <div className="meta">
              <span>⭐ {product.rating}</span>
            </div>
            <div className="price">${product.price.toFixed(2)}</div>
          </div>
        </Link>
      ));
    }

    return <p className="info-message">No products found.</p>;
  };

  return (
    <div className="page-container">
      <h1 className="page-title">All Products</h1>
      
      <div className="food-grid">
        {renderContent()}
      </div>

      {/* --- Styles --- */}
      <style>{`
        /* You can reuse the styles from CategoryPage.css or copy them here */
        .page-container { padding: 40px; max-width: 1280px; margin: 0 auto; }
        .page-title { font-size: 2.5rem; margin-bottom: 30px; text-align: center; color: #1f2937; }
        .food-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }
        .error-message, .info-message { grid-column: 1 / -1; text-align: center; padding: 40px; }
        .food-card { background: #fff; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.07); overflow: hidden; text-decoration: none; color: inherit; transition: all 0.3s ease; }
        .food-card:hover { transform: translateY(-10px); box-shadow: 0 14px 28px rgba(0,0,0,0.1); }
        .food-img { height: 200px; background-size: cover; background-position: center; }
        .food-info { padding: 20px; }
        /* Skeleton styles */
        .skeleton-card { background: #fff; border-radius: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.07); overflow: hidden; }
        .skeleton { background-color: #e5e7eb; position: relative; overflow: hidden; }
        .skeleton-img { height: 200px; }
        .skeleton-info { padding: 20px; }
        .skeleton-text { height: 22px; border-radius: 6px; margin-bottom: 12px; }
        .skeleton-small { width: 60%; height: 18px; }
        .skeleton::before { content: ''; position: absolute; top: 0; left: -150%; height: 100%; width: 150%; background: linear-gradient(to right, transparent 0%, #f3f4f6 50%, transparent 100%); animation: shimmer 1.8s infinite; }
        @keyframes shimmer { 0% { left: -150%; } 100% { left: 150%; } }
      `}</style>
    </div>
  );
}

export default AllProductsPage;