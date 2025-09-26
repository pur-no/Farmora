// client/src/pages/ProductEditPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const ProductEditPage = () => {
  const { id } = useParams();
  return <ProductForm productId={id} />;
};

export default ProductEditPage;