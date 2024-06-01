import React from 'react';
import './Flowers.scss';
import Nav from "../../Component/Nav";
import Footer from "../../Component/Footer";
import StripeCheckoutButton from "../../Component/StripeCheckoutButton/StripeCheckoutButton"; 

const flowers = [
    { name: "Peperomia", price: 25, rating: 5.0, reviews: 10, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/lf1012c2.jpg" },
    { name: "Snake Plant", price: 29, rating: 4.9, reviews: 59, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/lf1155c_reg.png" },
    { name: "Fiddle Leaf Fig", price: 30, rating: 4.5, reviews: 42, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/six_sweetheart_roses_0.png" },
    { name: "Ponytail Palm", price: 49, rating: 4.7, reviews: 7, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/LF11-92/36-Long-Stemmed-Yellow-Roses.jpg" },
    { name: "Philodendron", price: 39, rating: 4.9, reviews: 21, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/24_long_stem_red_roses_0.jpg" },
    { name: "Aloe Vera", price: 20, rating: 4.1, reviews: 15, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/LF212-50/Sweetheart-Bouquet.png" },
    { name: "ZZ Plant", price: 40, rating: 4.2, reviews: 17, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/lf1180w.jpg" },
    { name: "Jade Pothos", price: 35, rating: 4.6, reviews: 13, img: "https://bloomex.ca/components/com_virtuemart/shop_image/product/LM-499/The-Love-Machine.jpg" },
];

function Flowers() {
    const handleToken = (token, addresses) => {
        console.log(token, addresses);
        alert('Payment Successful');
    };

    return (
        <div className="flowers-page">
            <div className="backdrop-blur-sm p-4 z-10 relative">
                <Nav />
            </div>

            <div className="flowers">
                <h2 className="flowers__title">Flowers</h2>
                <div className="flowers__list">
                    {flowers.map((flower, index) => (
                        <div key={index} className="flower-card">
                            <div className="flower-card__img">
                                <img src={`${flower.img}`} alt={flower.name} />
                            </div>
                            <h3 className="flower-card__name">{flower.name}</h3>
                            <p className="flower-card__rating">
                                <span className="flower-card__rating-star">★</span>
                                {flower.rating} ({flower.reviews} reviews)
                            </p>
                            <p className="flower-card__price">${flower.price}</p>
                            <StripeCheckoutButton price={flower.price} onToken={handleToken}>
                                <button className="flower-card__button">Buy</button>
                            </StripeCheckoutButton>
                        </div>
                    ))}
                </div>
            </div>

            <div className="backdrop-blur-sm p-4 z-10 relative">
                <Footer />
            </div>
        </div>
    );
}

export default Flowers;
