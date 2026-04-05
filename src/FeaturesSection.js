import React from "react";
import { FaMapMarkedAlt,FaPlane, FaUsers } from "react-icons/fa";
import './FeaturesSection.css';


function FeaturesSection() {
  return (
    <div>

        <div className="up" id="upp">
            <h1><center>Why Choose Veyora?</center></h1>
            <h3><center>AI-Powered Features for Smarter Journeys</center></h3>
        </div>

        <div className="down">
            

            <div className="card1" id="features-section">
                 <FaMapMarkedAlt className="feature-icon" />
                 <h3>Smart Destinations Picking</h3><br/>
                 <p className="feature-text">
                     Leverage AI to suggest destinations that match your interests and budget.
                 </p><br/>
                 <p className="feature-bottom">200+ Destinations</p>
            </div>

            <div className="card2">
                <FaPlane className="feature-icon" />
                <h3 className="feature-title">Effortless Trip Planning</h3><br/>
                <p className="feature-text">
                    Generate complete itineraries, book flights, and find hotels in minutes.
                 </p><br/>
                 <p className="feature-bottom">95% Automation</p>
            </div>

            <div className="card3">
                <FaUsers className="feature-icon"/>
                <h3 className="feature-title">Collaborative Board</h3><br/>
                <p className="feature-text">
                    Share plans, get feedback, and coordinate group travel instantly.
                 </p><br/>
                 <p className="feature-bottom">Team Access</p>
            </div>

        </div>

    </div>
    );
}

export default FeaturesSection;