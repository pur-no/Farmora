// client/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <main style={{ paddingBottom: '4rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;