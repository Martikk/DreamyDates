import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ExperiencePage from './Pages/ExperiencePage/ExperiencePage';
import Contact from './Pages/Contact/Contact';
import Flowers from './Pages/Flowers/Flowers';
import Dates from './Pages/Dates/Dates';
import MarriageProposal from './Pages/MarriageProposal/MarriageProposal';
import Surprises from './Pages/Surprises/Surprises';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<ExperiencePage />} />
        <Route path="/flowers" element={<Flowers />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/MarriageProposal" element={<MarriageProposal />} />
        <Route path="/surprises" element={<Surprises />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} newestOnTop />
    </BrowserRouter>
  );
}

export default App;