import React, { useState } from "react";
import "./HowWeWork.scss"
import DiagramMy from "../../Assets/Frame73.png"; 
import SubmitForm from "../SubmitForm/SubmitForm";


function HowWeWork() {
    const [isFormVisible, setFormVisible] = useState(false);

    const handleFormOpen = () => {
      setFormVisible(true);
    };
  
    const handleFormClose = () => {
      setFormVisible(false);
    };

    return (
        <div className="howWeWork">
                  {isFormVisible && <SubmitForm onClose={handleFormClose} />}

            <div className="howWeWork-page">
            <h2 className="howWeWork-page__title">How do we work?</h2>
            <p className="howWeWork-page__describe">the main stages from idea to implementation</p>
            <div className="howWeWork-page__img">
                <img src={DiagramMy} alt="How We Work Diagram"/>
            </div>
            <button className="howWeWork-page__button" type="button" onClick={handleFormOpen}>Leave request</button>
            </div>
        </div>
    )
}




export default HowWeWork;

