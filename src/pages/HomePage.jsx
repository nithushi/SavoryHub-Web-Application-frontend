import React, { useState, useEffect, useContext } from 'react'; // <-- useContext මෙතනට එකතු කරන්න
import { AuthContext } from '../context/AuthContext'; // <-- AuthContext එක import කරගන්න
import { Link } from 'react-router-dom';

import logo from '../assets/logo/logo.png';
import pizzaImage from '../assets/btn/btn_1.jpg';
import BurgerImage from '../assets/btn/btn_2.jpg';
import ChickenImage from '../assets/btn/btn_3.jpg';
import SushiImage from '../assets/btn/btn_4.jpg';
import MeatImage from '../assets/btn/btn_5.jpg';
import HotdogImage from '../assets/btn/btn_6.jpg';
import DrinkImage from '../assets/btn/btn_7.jpg';
import MoreImage from '../assets/btn/btn_9.jpg';

import Margherita from '../assets/pizza/margherita.jpg';
import SpicyBuffaloMeat from '../assets/meat/spicyBuffaloWings.jpg';
import HawaiianBBQDog from '../assets/hotdog/HawaiianBBQDog.jpg';
import BaconAndCheeseHeaven from '../assets/burger/BaconAndCheeseHeaven.jpg';




function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: 'Pizza', img: pizzaImage },
    { name: 'Burger', img: BurgerImage },
    { name: 'Chicken', img: ChickenImage },
    { name: 'Sushi', img: SushiImage },
    { name: 'Meat', img: MeatImage },
    { name: 'Hotdog', img: HotdogImage },
    { name: 'Drink', img: DrinkImage },
    { name: 'More', img: MoreImage },
  ];

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { user } = useContext(AuthContext); // <-- 1. AuthContext එකෙන් userව ලබාගන්න


  return (
    <div className="home-page">

      {/* 🎨 Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Discover. Order. Enjoy.</h2>
          <p>Experience food ordering like never before with SavoryHub’s delightful collection.</p>
          <a href="/categories" className="hero-btn">Explore Now</a>
        </div>
      </section>

      {/* 🍽️ Best Foods */}
      <section className="best-section">
        <div className="section-header">
          <h2>Today's Best Picks</h2>
          <a href="/products" className="view-all">View All</a>
        </div>

        <div className="food-grid">
          {[
            { id: 65, name: 'Margherita', img: Margherita, rating: 4.1, time: '10–15 min', price: 40 },
            { id: 100, name: 'Spicy Buffalo Wings', img: SpicyBuffaloMeat, rating: 4.2, time: '15–20 min', price: 35 },
            { id: 89, name: 'Hawaiian BBQ Dog', img: HawaiianBBQDog, rating: 4.3, time: '12–18 min', price: 45 },
            { id: 99, name: 'Bacon & Cheese Heaven', img: BaconAndCheeseHeaven, rating: 4.4, time: '20–25 min', price: 50 },
          ].map((food) => (
            <div className="food-card" key={food.id}>
              <div className="food-img" style={{ backgroundImage: `url(${food.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', height: '180px' }}></div>
              <div className="food-info">
                <h3>{food.name}</h3>
                <div className="meta">
                  <span>⭐ {food.rating}</span>
                  <span>{food.time}</span>
                </div>
                <div className="price">${food.price}.00</div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 🧭 Categories */}
      <section className="categories-section">
        <h2>Browse Categories</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link
              to={`/categories/${c.name}`} // e.g., /categories/Pizza
              className="category-card"
              key={c.name}
            >
              <img src={c.img} alt={c.name} />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* <section className="categories-section">
        <h2>Browse Categories</h2>
        <div className="category-grid">
          {filteredCategories.map((c) => (
            <div className="category-card" key={c.name}>
              <img src={c.img} alt={c.name} />
              <span>{c.name}</span>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <p className="no-results">No matching categories found.</p>
          )}
        </div>
      </section> */}

      <style>{`
        /* --- Base --- */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: #fff; color: #1f2937; }

        /* --- Hero --- */
        .hero {
          background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
          padding: 100px 20px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1s ease-in-out;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero h2 {
          font-size: 2.8rem;
          color: #c2410c;
          margin-bottom: 16px;
        }

        .hero p {
          font-size: 1.2rem;
          color: #78350f;
          margin-bottom: 24px;
        }

        .hero-btn {
          background: #f97316;
          color: white;
          padding: 14px 32px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .hero-btn:hover {
          background: #ea580c;
          transform: translateY(-3px);
        }

        /* --- Best Section --- */
        .best-section {
          padding: 80px 40px;
          max-width: 1280px;
          margin: auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .view-all {
          text-decoration: none;
          color: #f97316;
          font-weight: 600;
        }

        .food-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .food-card {
          background: rgba(255,255,255,0.9);
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .food-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.15);
        }

        .food-img {
          height: 180px;
          background: linear-gradient(135deg, #fed7aa 0%, #fecaca 100%);
        }

        .food-info {
          padding: 20px;
        }

        .food-info h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #1f2937;
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

        /* --- Categories --- */
        .categories-section {
          background: #f9fafb;
          padding: 80px 40px;
        }

        .categories-section h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #1f2937;
          font-size: 2rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 20px;
          justify-items: center;
        }

        .category-card {
          background: #fff7ed;
          padding: 16px 20px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          color:#000000;
        }

        .category-card img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 8px;
        }

        .category-card:hover {
          transform: scale(1.05);
          background: #ffedd5;
          box-shadow: 0 6px 12px rgba(249,115,22,0.2);
        }

        .no-results {
          grid-column: 1/-1;
          text-align: center;
          color: #6b7280;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .nav-right { display: none; }
          .search-bar { width: 80%; }
          .hero h2 { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
