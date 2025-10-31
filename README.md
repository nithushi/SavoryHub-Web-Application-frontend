# 🍔 SavoryHub - Frontend (React)

Welcome to the frontend repository for **SavoryHub**, a full-stack food delivery web application. This application provides a complete, modern user experience, from browsing and ordering food to a full-featured admin panel for site management.

This frontend is built with **React (Vite)** and communicates with a separate **[Spring Boot Backend API](https://github.com/nithushi/SavoryHub-Web-Application-backend)**.

---

## ✨ Key Features

This application is divided into two main parts: a feature-rich User-facing site and a powerful Admin Panel.

### 👤 User Features
* **Authentication:** Secure user registration and login (JWT-based).
* **Product Browsing:** View all products, filter by category, and view single product details.
* **Search:** Real-time search functionality for all products.
* **Shopping Cart:** A persistent, database-backed shopping cart. (Add, update quantity, remove items).
* **Checkout:** Multi-step checkout process with shipping address validation and order placement.
* **Profile Management:**
    * View all past order history.
    * Update personal details (name, contact).
    * Update shipping address (auto-fills at next checkout).
    * Change password (requires current password).
    * Upload a custom profile picture.

### 🔐 Admin Features
* **Role-Based Access:** A secure `/admin` route accessible only to users with the `ADMIN` role.
* **Analytics Dashboard:** A central dashboard showing key statistics (Total Revenue, Total Orders, Total Users, Pending Orders).
* **Product Management (CRUD):**
    * View all products in a table.
    * Create new products via a dedicated form.
    * Edit existing product details.
    * Delete products from the database.
* **Order Management:**
    * View all orders from all users.
    * Update the status of any order (e.g., "Pending", "Processing", "Delivered").
* **User Management:**
    * View a list of all registered users.
    * Change any user's role (e.g., "USER" to "ADMIN").
    * Activate or Deactivate user accounts.

---

## 📸 Screenshots

| Home Page | Product Page |
| :---: | :---: |
| ![Home Page](https://github.com/user-attachments/assets/adde721e-3ea5-4115-afaf-b7ebdad1f05a) | ![Product Page](https://github.com/user-attachments/assets/a69da8e4-c8a4-4ce1-9b30-13fd8adbf44a) |

| Admin Dashboard | Product Management |
| :---: | :---: |
| ![Admin Dashboard](https://github.com/user-attachments/assets/90285e9f-0306-46e5-84c2-b39e375090a3) | **[IMAGE UPLOAD FAILED]** <br/> *(Please re-upload this image)* |

---

## 🛠️ Tech Stack

* **Core:** React (Vite)
* **Routing:** React Router
* **API Client:** Axios (using interceptors for auth tokens)
* **Global State:** React Context API (for Auth & Cart)
* **Notifications:** React-Toastify
* **Charts (Admin):** Recharts
* **Icons:** Lucide-React
* **Styling:** Custom CSS (via inline `<style>` tags)

---

## 🏁 Getting Started

### Prerequisites
* Node.js (v18 or newer)
* npm
* The **[SavoryHub Backend](https://github.com/nithushi/SavoryHub-Web-Application-backend)** server must be running on `http://localhost:8080`.

### How to Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/nithushi/SavoryHub-Web-Application-frontend.git](https://github.com/nithushi/SavoryHub-Web-Application-frontend.git)
    cd SavoryHub-Web-Application-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open **`http://localhost:5173`** in your browser to see the application.
