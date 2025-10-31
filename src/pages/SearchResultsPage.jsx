import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../service/api'; // 'service' වෙනුවට 'services' ලෙස නිවැරදි කර ඇත

// --- Product Card Skeleton Component for Loading State ---
function ProductCardSkeleton() {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 6px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <div style={{ height: '180px', backgroundColor: '#e5e7eb', animation: 'pulse 1.5s infinite' }}></div>
      <div style={{ padding: '20px' }}>
        <div style={{ height: '20px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '10px', animation: 'pulse 1.5s infinite 0.2s' }}></div>
        <div style={{ height: '16px', backgroundColor: '#e5e7eb', borderRadius: '4px', width: '50%', animation: 'pulse 1.5s infinite 0.4s' }}></div>
        <div style={{ height: '24px', backgroundColor: '#e5e7eb', borderRadius: '4px', width: '30%', marginTop: '15px', animation: 'pulse 1.5s infinite 0.6s' }}></div>
      </div>
      {/* Skeleton animation style */}
      <style>{`
        @keyframes pulse {
          0% { background-color: #e5e7eb; }
          50% { background-color: #d1d5db; }
          100% { background-color: #e5e7eb; }
        }
      `}</style>
    </div>
  );
}

// --- Main SearchResultsPage Component ---
function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // URL එකෙන් search query එක ගන්නවා (e.g., ?q=pizza)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return; // Query එකක් නැත්නම් search කරන්නේ නෑ
      }
      setLoading(true);
      try {
        const response = await api.get(`/products/search?q=${query}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]); // URL එකේ search query එක වෙනස් වුනොත්, ආයෙත් data fetch කරනවා

  return (
    <div style={{ padding: '40px', maxWidth: '1280px', margin: 'auto', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', color: '#1f2937' }}>
        Search Results for: <span style={{ color: '#f97316' }}>"{query}"</span>
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
        {loading ? (
          // Loading වෙද්දී Skeleton Cards පෙන්වනවා
          Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              // Actual Product Card
              <Link to={`/product/${product.id}`} key={product.id} style={{textDecoration: 'none', color: 'inherit'}}>
                <div style={{ 
                    background: '#fff', 
                    borderRadius: '16px', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)', 
                    overflow: 'hidden', 
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    cursor: 'pointer'
                }}>
                  <div style={{ 
                    height: '200px', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundImage: `url(http://localhost:8080${product.imageUrl})`,
                    flexShrink: 0 // Image won't shrink
                  }}></div>
                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#1f2937' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ color: '#facc15', fontSize: '1.2rem', marginRight: '5px' }}>★</span>
                        <p style={{ margin: 0, color: '#4b5563', fontWeight: '500' }}>{product.rating ? product.rating.toFixed(1) : 'N/A'}</p>
                    </div>
                    <p style={{ color: '#f97316', fontWeight: '800', fontSize: '1.6rem', margin: 0 }}>${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // No results message
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>
                Oops! No products found matching your search for "<span style={{ fontWeight: 'bold', color: '#f97316' }}>{query}</span>".
              </p>
              <p style={{ color: '#9ca3af' }}>Try searching for something else, or browse our categories.</p>
              <Link to="/products" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 25px', background: '#f97316', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'background 0.3s ease' }}>
                Browse All Products
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;