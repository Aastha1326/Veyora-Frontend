import React, { useState } from "react";
import './Destination.css';
import {useNavigate} from 'react-router-dom';

function Destination() {

    const navigate = useNavigate();

const handleGenerate = (place) => {
  navigate("/dest_next", {
    state: { destination: place }
  });
};

    const [category, setCategory] = useState('Historical');

    const destinations = {
        Cultural: [
            { name: "Varanasi, Uttar Pradesh", image: "varanasi.jpeg" },
            { name: "Mysore, Karnataka", image: "mysore.jpeg" },
            { name: "Kolkata, West Bengal", image: "kolkata.jpeg" },
            { name: "Ujjain, Madhya Pradesh", image: "ujjain.jpeg" }
        ],
        Historical: [
            { name: "Jaipur, Rajasthan", image: "jaipur.jpeg" },
            { name: "Khajuraho, Madhya Pradesh", image: "khajuraho.jpeg" },
            { name: "Hampi, Karnataka", image: "hampi.jpeg" },
            { name: "Agra, Uttar Pradesh", image: "agra.jpeg" }
        ],
        Beaches: [
            { name: "Goa", image: "goa.jpeg" },
            { name: "Pondicherry", image: "pondicherry.jpeg" },
            { name: "Puri, Odisha", image: "puri.jpeg" },
            { name: "Andaman and Nicobar Islands", image: "andaman.jpeg" }
        ],
        Mountains: [
            { name: "Manali, Himachal Pradesh", image: "manali.jpeg" },
            { name: "Munnar, Kerala", image: "munnar.jpeg" },
            { name: "Darjeeling, West Bengal", image: "darjeeling.jpeg" },
            { name: "Leh-Ladakh, Jammu and Kashmir", image: "leh.jpeg" }
        ]
    };

    const categories = ["Cultural", "Historical", "Beaches", "Mountains"];

    return (
        <div className="destination-section" id="destination-section">

            <h2>Find Your Perfect Indian Vibe</h2><br/>
            <p>Explore the diverse states of India curated for your next adventure.</p><br/>
            

            <div className="category-buttons">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`category-btn ${category === cat ? "active" : ""}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="destination-grid">
                {destinations[category].map((dest) => (
                    <div className="destination-card" key={dest.name}>
                        <img src={require(`./assets/${dest.image}`)} alt={dest.name} />
                        <h4>{dest.name}</h4>
                        <button className="itinerary-btn" onClick={()=>handleGenerate(dest.name)}>Generate Itinerary</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Destination;
