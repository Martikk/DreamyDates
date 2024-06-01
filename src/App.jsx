import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import ProductPage from "./Pages/ProductPage/ProductPage"
import Contact from './Pages/Contact/Contact';
import Flowers from './Pages/Flowers/Flowers'


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ProductPage" element={<ProductPage />} />
                    <Route path="/Flowers" element={<Flowers />} />
                    <Route path="/Contact-us" element={<Contact />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;