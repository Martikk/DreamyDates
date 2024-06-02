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
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/experience/:id" element={<ExperiencePage />} />
                    <Route path="/Flowers" element={<Flowers />} />
                    <Route path="/Dates" element={<Dates />} />
                    <Route path="/MarriageProposal" element={<MarriageProposal />} />
                    <Route path="/Surprises" element={<Surprises />} />
                    <Route path="/Contact-us" element={<Contact />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
