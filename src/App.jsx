import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the layout and page components
import Layout from './components/Layout';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AllProductsPage from './pages/AllProductsPage';
import { ToastContainer } from 'react-toastify'; // <-- Step 1: Import Container
import 'react-toastify/dist/ReactToastify.css';  // <-- Step 2: Import CSS
import AdminRoute from './components/routes/AdminRoute'; // 1. AdminRoute import කරගන්න
import AdminDashboardPage from './pages/admin/AdminDashboardPage'; // 2. Admin page එක import කරගන්න
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminLayout from './components/AdminLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* ========================================================== */}
          {/* PUBLIC ROUTES - Only for guests (not logged in) */}
          {/* ========================================================== */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* ========================================================== */}
          {/* PRIVATE ROUTES - Only for authenticated (logged in) users */}
          {/* ========================================================== */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories/:categoryName" element={<CategoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            {/* ඔබට අවශ්‍ය අනෙකුත් private routes මෙතනට එකතු කරන්න */}
          </Route>

          {/* You can add a 404 Not Found page here later */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

          {/* --- ADMIN ROUTES (uses AdminLayout) --- */}
          <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}> {/* 2. AdminLayout එකෙන් wrap කරනවා */}
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/products" element={<AdminProductsPage />} />
                  <Route path="/admin/products/new" element={<AddProductPage />} />
                  <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
                  <Route path="/admin/orders" element={<AdminOrdersPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/reports" element={<AdminReportsPage />} />
              </Route>
          </Route>

          
        </Routes>
        <Footer></Footer>
      </Layout>

      {/* Step 3: Add the ToastContainer here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </BrowserRouter>
  );
}



<Routes>
  {/* Public Routes for guests */}
  <Route element={<PublicRoute />}>
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Route>

  {/* Private Routes for logged-in users */}
  <Route element={<PrivateRoute />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/categories" element={<CategoriesPage />} />
    {/* Add other private routes here later, like /profile or /orders */}
  </Route>

  {/* Default landing page */}
  <Route path="/" element={<div>This is the Landing Page</div>} />
</Routes>