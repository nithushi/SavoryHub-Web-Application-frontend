import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../service/api';
import { toast } from 'react-toastify';

function AddProductPage() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '', // Start with an empty value to force selection
    imageUrl: '',
    rating: '4.0',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.category) {
        toast.error("Please select a category.");
        return;
    }
    const promiseToast = toast.loading("Adding new product...");
    try {
      await api.post('/products', productData);
      toast.update(promiseToast, { render: "Product added successfully!", type: "success", isLoading: false, autoClose: 2000 });
      navigate('/admin/products');
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.update(promiseToast, { render: "Failed to add product. Please check details.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <div className="admin-form-page">
      {/* --- Modern Navigation Header --- */}
      <div className="page-header">
        <h1>Add New Product</h1>
        <Link to="/admin/products" className="back-btn">← Back to All Products</Link>
      </div>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} placeholder="e.g., Margherita Pizza" required />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={productData.description} onChange={handleInputChange} placeholder="Write a short product description..." rows="4"></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={productData.price} onChange={handleInputChange} required step="0.01" placeholder="0.00" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={productData.category} onChange={handleInputChange} required>
              <option value="" disabled>Select a category</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Chicken">Chicken</option>
              <option value="Sushi">Sushi</option>
              <option value="Meat">Meat</option>
              <option value="HotDog">HotDog</option>
              <option value="Drinks">Drinks</option>
              <option value="More">More</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="imageUrl" value={productData.imageUrl} onChange={handleInputChange} required placeholder="/images/pizza/new-pizza.jpg" />
        </div>
        
        <div className="form-group">
          <label>Rating (0.0 - 5.0)</label>
          <input type="number" name="rating" value={productData.rating} onChange={handleInputChange} step="0.1" min="0" max="5" />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">Save Product</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/admin/products')}>Cancel</button>
        </div>
      </form>

      <style>{`
        .admin-form-page { 
          padding: 40px; 
          max-width: 800px; 
          margin: 40px auto;
          font-family: 'Poppins', sans-serif;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1e293b;
        }

        .back-btn {
          background: #e2e8f0;
          color: #475569;
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s;
        }
        .back-btn:hover {
          background: #cbd5e1;
        }

        .form-container { 
          background: white; 
          padding: 35px; 
          border-radius: 16px; 
          box-shadow: 0 8px 25px rgba(0,0,0,0.08); 
        }

        .form-group { 
          margin-bottom: 24px; 
        }

        .form-group label { 
          font-weight: 600; 
          display: block; 
          color: #334155; 
          margin-bottom: 8px; 
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          font-size: 1rem;
          background-color: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
          outline: none;
        }

        .form-row { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 40px; 
        }

        .form-actions { 
          display: flex; 
          justify-content: flex-end; 
          gap: 16px; 
          margin-top: 30px; 
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .save-btn, .cancel-btn { 
          padding: 12px 28px; 
          border-radius: 10px; 
          font-size: 1rem; 
          font-weight: 600; 
          cursor: pointer; 
          border: none; 
          transition: all 0.3s ease; 
        }

        .save-btn { 
          background: #16a34a; 
          color: white; 
        }
        .save-btn:hover {
            background: #15803d;
            transform: translateY(-2px);
        }

        .cancel-btn { 
          background: #f1f5f9; 
          color: #475569; 
          border: 1px solid #e2e8f0;
        }
        .cancel-btn:hover {
            background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}

export default AddProductPage;