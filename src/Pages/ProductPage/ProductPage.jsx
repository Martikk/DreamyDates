import React from "react";
import Nav from "../../Component/Nav";
import ProductCard from "../../Component/ProductCard/ProductCard";
import "./ProductPage.scss";
import Footer from "../../Component/Footer";

function ProductPage() {
  return (
    <div className="ProductPage">
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>
      <ProductCard />
      <Footer />
    </div>
  );
}

export default ProductPage;
