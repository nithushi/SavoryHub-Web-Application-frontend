import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api'; // Path එක නිවැරදිද කියා බලන්න
import { toast } from 'react-toastify';
import { Loader2, Plus, Trash2, Edit3, ChevronDown, ChevronUp, CheckCircle, Search } from 'lucide-react';

function AdminProductsPage() {
  const [products, setProducts] = useState([]); // This holds the original full list from the backend
  const [filteredProducts, setFilteredProducts] = useState([]); // This is the list that gets displayed
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products/all');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially, display all products
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Could not fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATED SEARCH LOGIC ---
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search bar is cleared, show all products
    if (value === "") {
      setFilteredProducts(products);
      return;
    }

    // Filter the original `products` array as the user types
    const filteredList = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredList);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${productId}`);
        toast.success("Product deleted successfully!");
        fetchAllProducts(); // Refresh the list from the database
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product.");
      }
    }
  };

  const toggleDescription = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="admin-products-page">
      <header className="admin-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage, edit, and organize all your store products.</p>
        </div>
        <Link to="/admin/products/new" className="add-btn">
          <Plus size={18} /> Add Product
        </Link>
      </header>

      {/* 🔍 Search bar section */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={searchTerm}
          onChange={handleSearchChange} // Updated handler
        />
      </div>

      <div className="table-card">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={28} />
            <p>Loading products...</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th className='table-heading'>Image</th>
                <th className='table-heading'>Product</th>
                <th className='table-heading'>Category</th>
                <th className='table-heading'>Price</th>
                <th className='table-heading'>Status</th>
                <th className='table-heading'>Description</th>
                <th className='table-heading'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr><td colSpan="7" className="no-products">
                    {searchTerm ? `No products found for "${searchTerm}"` : "No products available."}
                </td></tr>
              ) : (
                filteredProducts.map(product => (
                  <React.Fragment key={product.id}>
                    <tr>
                      <td><img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} className="product-thumb" /></td>
                      <td className="product-name">{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td><span className="status in-stock"><CheckCircle size={14} /> In Stock</span></td>
                      <td>
                        <button className="desc-toggle" onClick={() => toggleDescription(product.id)}>
                          {expanded === product.id ? <>Hide <ChevronUp size={14} /></> : <>View <ChevronDown size={14} /></>}
                        </button>
                      </td>
                      <td className="action-buttons">
                        <Link to={`/admin/products/edit/${product.id}`} className="btn edit"><Edit3 size={16} /> Edit</Link>
                        <button onClick={() => handleDelete(product.id)} className="btn delete"><Trash2 size={16} /> Delete</button>
                      </td>
                    </tr>
                    {expanded === product.id && (
                      <tr className="desc-row">
                        <td colSpan="7">
                          <div className="description-box">
                            <strong>Description:</strong>
                            <p>{product.description || "No description provided."}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-products-page { padding: 50px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .admin-header h1 { font-size: 1.9rem; font-weight: 700; color: #1e293b; }
        .admin-header p { color: #64748b; margin-top: 6px; }

        /* Search Bar Styling */
        .search-bar { display: flex; align-items: center; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 10px 16px; margin-bottom: 25px; transition: 0.3s; border: 1px solid #e2e8f0; }
        .search-bar:focus-within { box-shadow: 0 0 0 3px rgba(59,130,246,0.2); border-color: #3b82f6; }
        .search-bar input { border: none; outline: none; width: 100%; font-size: 0.95rem; color: #1e293b; margin-left: 8px; background: transparent; }
        .search-bar input::placeholder { color: #94a3b8; }
        .search-icon { color: #64748b; }

        .add-btn { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-weight: 500; transition: 0.3s; box-shadow: 0 3px 10px rgba(22, 163, 74, 0.2); }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 16px rgba(22, 163, 74, 0.3); }

        .table-card { background: white; border-radius: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 18px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background: #f1f5f9; color: #475569; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; }
        tr:hover { background: #f9fafb; transition: 0.3s; }
        .product-thumb { width: 60px; height: 60px; border-radius: 10px; object-fit: cover; }
        .product-name { font-weight: 500; color: #1e293b; }
        .status { display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; padding: 5px 10px; border-radius: 20px; }
        .in-stock { background: #dcfce7; color: #15803d; }
        .desc-toggle { background: transparent; border: none; color: #2563eb; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 4px; }
        .desc-row td { background: #f9fafb; }
        .description-box { background: #f1f5f9; border-radius: 10px; padding: 15px 18px; color: #334155; box-shadow: inset 0 0 5px rgba(0,0,0,0.05); }
        .description-box p { margin-top: 6px; line-height: 1.6; }
        .action-buttons { display: flex; gap: 10px; }
        .btn { display: flex; align-items: center; gap: 6px; border: none; border-radius: 8px; padding: 8px 14px; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: 0.3s; }
        .btn.edit { background: #3b82f6; color: white; }
        .btn.edit:hover { background: #2563eb; }
        .btn.delete { background: #ef4444; color: white; }
        .btn.delete:hover { background: #dc2626; }
        .loading-state { text-align: center; padding: 50px; color: #64748b; }
        .spinner { animation: spin 1s linear infinite; margin-bottom: 10px; color: #3b82f6; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .no-products { text-align: center; padding: 50px; color: #94a3b8; font-weight: 500; }
      `}</style>
    </div>
  );
}

export default AdminProductsPage;