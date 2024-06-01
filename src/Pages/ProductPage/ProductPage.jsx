import React from "react";
import Nav from "../../Component/Nav";
import ProductCard from "../../Component/ProductCard/ProductCard";
import "./ProductPage.scss";
import Footer from "../../Component/Footer";
import Gallery from "../../Component/Gallery/Gallery";
import VideoGallery from "../../Component/VideoGallery/VideoGallery";
import InfoCard from "../../Component/InfoCard/InfoCard"; //

function ProductPage() {
  return (
    <div className="ProductPage">
      <div className="backdrop-blur-sm p-4 z-10 relative">
        <Nav />
      </div>
      <ProductCard />
      <Gallery /> 
      <VideoGallery /> 
      <InfoCard /> 
      <Footer />
    </div>
  );
}

export default ProductPage;
