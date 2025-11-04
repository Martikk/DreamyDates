import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import ExperiencePage from "./Pages/ExperiencePage/ExperiencePage";
import Contact from './Pages/Contact/Contact';
import Flowers from './Pages/Flowers/Flowers';
import Dates from './Pages/Dates/Dates';
import MarriageProposal from './Pages/MarriageProposal/MarriageProposal';
import Surprises from './Pages/Surprises/Surprises';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<ExperiencePage />} />
        <Route path="/flowers" element={<Flowers />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/marriage-proposal" element={<MarriageProposal />} />
        <Route path="/surprises" element={<Surprises />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;