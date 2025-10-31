import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../service/api'; // Path එක නිවැරදි බවට වග බලාගන්න

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // To show a loader on initial app start

  // --- Core Authentication Functions ---

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setCartItems([]);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        logout(); // Logout if token is invalid
      }
    }
  }, [logout]); // Dependency array includes logout

  // This effect runs only once when the app starts
  useEffect(() => {
    const bootstrapApp = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // Fetch fresh user data from backend instead of trusting localStorage blindly
          const response = await api.get('/user/me');
          setUser(response.data);
          // After confirming the user is valid, fetch their cart
          await fetchCart();
        } catch (error) {
          console.error("Session token is invalid, logging out.", error);
          logout(); // If token is expired/invalid, log out
        }
      }
      setLoading(false);
    };

    bootstrapApp();
  }, [fetchCart, logout]); // Add dependencies

  const login = useCallback(async (loginResponse) => {
    const { token, user } = loginResponse;
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      await fetchCart(); // Fetch cart immediately after login
    }
  }, [fetchCart]); // Dependency array includes fetchCart

  const updateUser = useCallback((updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  }, []);

  // --- Cart Management Functions ---

  const addToCart = useCallback(async (productToAdd, quantity) => {
    try {
      const response = await api.post('/cart/add', { productId: productToAdd.id, quantity });
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }, []);

  const updateQuantity = useCallback(async (cartItemId, newQuantity) => {
    try {
      const response = await api.put('/cart/update', { cartItemId, quantity: newQuantity });
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  }, []);

  const removeFromCart = useCallback(async (cartItemId) => {
    try {
      const response = await api.delete(`/cart/remove/${cartItemId}`);
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // --- Final Setup ---

  const isAuthenticated = !!user;

  // Show a loading screen until authentication status is checked
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Application...</div>;
  }

  // Provide all values and functions to the rest of the app
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      updateUser,
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </AuthContext.Provider>
  );
};