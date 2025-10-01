// client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductEditPage from './pages/ProductEditPage';
import WeatherPage from './pages/WeatherPage';
import UserListPage from './pages/admin/UserListPage';
import ProductListPage from './pages/admin/ProductListPage'; // Import ProductListPage

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Routes for regular users */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products/new" element={<ProductCreatePage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
          <Route path="weather" element={<WeatherPage />} />
        </Route>

        {/* Protected Routes for Admins */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="users" element={<UserListPage />} />
          <Route path="products" element={<ProductListPage />} /> {/* Add ProductList route */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;