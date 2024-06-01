import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import ProductPage from "./Pages/ProductPage/ProductPage"
import Contact from './Pages/Contact/Contact';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ProductPage" element={<ProductPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/Contact-us" element={<Contact />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;