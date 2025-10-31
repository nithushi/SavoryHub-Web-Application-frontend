import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../service/api';

// --- Reusable Component 1: Product Card ---
function ProductCard({ product }) {
  const defaultImage = "https://via.placeholder.com/300x200.png?text=No+Image";
  return (
    <Link to={`/product/${product.id}`} className="food-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="food-img"
        style={{ backgroundImage: `url(http://localhost:8080${product.imageUrl || defaultImage})` }}
      ></div>
      <div className="food-info">
        <h3>{product.name}</h3>
        <div className="meta">
          <span>⭐ {product.rating}</span>
        </div>
        <div className="price">${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}

// --- Reusable Component 2: Skeleton Loader ---
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
function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/category/${categoryName}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Failed to fetch ${categoryName} products:`, error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchProductsByCategory, 1100);
  }, [categoryName]);

  return (
    <div className="page-container">

      {/* --- Category Navigation --- */}
      <div className="category-nav">
        <Link to="/categories/Pizza" className={`category-link ${categoryName === 'Pizza' ? 'active' : ''}`}>Pizza</Link>
        <Link to="/categories/Chicken" className={`category-link ${categoryName === 'Chicken' ? 'active' : ''}`}>Chicken</Link>
        <Link to="/categories/Sushi" className={`category-link ${categoryName === 'Sushi' ? 'active' : ''}`}>Sushi</Link>
        <Link to="/categories/Meat" className={`category-link ${categoryName === 'Meat' ? 'active' : ''}`}>Meat</Link>
        <Link to="/categories/HotDog" className={`category-link ${categoryName === 'HotDog' ? 'active' : ''}`}>HotDog</Link>
        <Link to="/categories/Burger" className={`category-link ${categoryName === 'Burger' ? 'active' : ''}`}>Burger</Link>
        <Link to="/categories/Drink" className={`category-link ${categoryName === 'Drink' ? 'active' : ''}`}>Drinks</Link>
        <Link to="/categories/More" className={`category-link ${categoryName === 'More' ? 'active' : ''}`}>More</Link>
      </div>

      <h1 className="page-title">{categoryName}</h1>

      <div className="food-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )
        )}
      </div>

      {/* --- Modern Styles --- */}
      <style>{`
        .page-container { 
          padding: 40px; 
          max-width: 1280px; 
          margin: auto; 
          animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-title { 
          font-size: 2.3rem; 
          margin-bottom: 30px; 
          text-transform: capitalize; 
          color: #1f2937; 
          text-align: center;
          font-weight: 700;
        }

        /* --- Category Navigation --- */
        .category-nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 30px;
        }

        .category-link {
          padding: 10px 22px;
          background: #f3f4f6;
          border-radius: 30px;
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .category-link:hover {
          background: #f97316;
          color: white;
          transform: translateY(-3px);
        }

        .category-link.active {
          background: #f97316;
          color: white;
          box-shadow: 0 4px 12px rgba(249,115,22,0.4);
        }

        /* --- Product Grid --- */
        .food-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); 
          gap: 24px; 
        }

        /* --- Product Card --- */
        .food-card { 
          background: #fff; 
          border-radius: 16px; 
          box-shadow: 0 6px 16px rgba(0,0,0,0.08); 
          overflow: hidden; 
          transition: all 0.3s ease; 
          transform: translateY(0);
          animation: fadeIn 0.5s ease-in;
        }

        .food-card:hover { 
          transform: translateY(-8px) scale(1.02); 
          box-shadow: 0 10px 24px rgba(0,0,0,0.15); 
        }

        .food-img { 
          height: 180px; 
          background-size: cover; 
          background-position: center; 
          background-color: #f3f4f6; 
        }

        .food-info { 
          padding: 20px; 
        }

        .food-info h3 { 
          font-size: 1.2rem; 
          margin-bottom: 10px; 
        }

        .meta { 
          display: flex; 
          gap: 14px; 
          color: #6b7280; 
          margin-bottom: 8px; 
        }

        .price { 
          color: #f97316; 
          font-weight: 700; 
          font-size: 1.2rem; 
        }

        /* --- Skeleton Loader --- */
        .skeleton-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          overflow: hidden;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .skeleton {
          background-color: #e0e0e0;
          position: relative;
          overflow: hidden;
        }

        .skeleton-img { height: 180px; }
        .skeleton-info { padding: 20px; }
        .skeleton-text {
          height: 20px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .skeleton-small { width: 50%; }
        .skeleton::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(to right, transparent 0%, #f0f0f0 50%, transparent 100%);
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
}

export default CategoryPage;
