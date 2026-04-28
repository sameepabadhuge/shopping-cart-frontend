# Shopping Cart Frontend

This is the React user interface for the shopping cart application. It lets users browse products, view details, manage cart items, and access authentication flows. It also includes the admin interface for managing products and categories.

## Features

### User Experience

- Browse products by category
- View product details
- Add items to cart
- Increase or decrease quantity in cart
- Remove items from cart
- View checkout summary
- Register and log in
- Access profile settings and security pages

### Admin Experience

- Admin login
- Dashboard overview
- Manage products
- Manage categories

### Authentication

- Google login
- Facebook login
- Passkey support
- Protected routes for user and admin pages

## Technology Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- SimpleWebAuthn browser client

## Project Structure

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── public/
│   └── images/
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── CategoryCard.jsx
    │   ├── Footer.jsx
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   └── admin/
    │       ├── AdminSidebar.jsx
    │       └── StatCard.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── layouts/
    │   └── AdminLayout.jsx
    ├── pages/
    │   ├── admin/
    │   │   ├── AdminLogin.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ManageCategories.jsx
    │   │   └── ManageProducts.jsx
    │   └── user/
    │       ├── Cart.jsx
    │       ├── Checkout.jsx
    │       ├── Home.jsx
    │       ├── Login.jsx
    │       ├── OrderSuccess.jsx
    │       ├── ProductDetails.jsx
    │       ├── Products.jsx
    │       ├── Register.jsx
    │       └── profile/
    │           ├── Security.jsx
    │           └── Settings.jsx
    ├── routes/
    │   └── AppRoutes.jsx
    ├── services/
    │   └── authService.js
    └── utils/
        └── axiosInstance.js
```

## Main Flow

1. The app starts in `src/main.jsx`.
2. `BrowserRouter` and `AuthProvider` wrap the application.
3. `src/routes/AppRoutes.jsx` handles public, protected user, and admin routes.
4. Product browsing and cart actions use the backend API through `src/utils/axiosInstance.js`.

## Setup

### Prerequisites

- Node.js
- A running backend API

### Install and Run

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

The frontend expects the backend API URL through:

- `VITE_API_URL`

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

## Build

```bash
npm run build
```

## Notes

- The frontend is responsive for desktop and mobile browsers.
- Authentication and protected navigation are handled through the shared auth context.
- Cart totals are updated dynamically from cart data returned by the backend.
