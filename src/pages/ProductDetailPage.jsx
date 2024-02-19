import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductDetail from "../components/ProductDetail/ProductDetail";

const ProductDetailPage = () => {
  const productData = useLoaderData();
  return <ProductDetail product={productData} />;
};

export default ProductDetailPage;

export async function loader(context) {
  const response = await fetch(
    `http://localhost:8080/products/${context.params.productId}`
  );
  if (!response.ok) {
    return null;
  } else {
    const data = await response.json();
    return data;
  }
}
