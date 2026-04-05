import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./dest_next.css";
import Navbar from './Navbar';

function Dest_next() {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.destination;

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination) {
      navigate("/");
      return;
    }

    const cached = sessionStorage.getItem(`itinerary-${destination}`);
    if (cached) setItinerary(JSON.parse(cached));
  }, [destination, navigate]);

  const generateItinerary = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/ai/generate-itinerary",
        { destination }
      );

      setItinerary(res.data);
      sessionStorage.setItem(
        `itinerary-${destination}`,
        JSON.stringify(res.data)
      );
    } catch (err) {
      setError("Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-box">
          <div className="spinner"></div>
          <h2>Crafting your Veyora experience</h2>
          <p>Designing moments, not just itineraries ✨</p>
        </div>
      </div>
    );
  }

  if (!itinerary && !error) {
    return (
      <div className="loading-screen">
        <div className="loading-box">
          <h2>Your trip is ready to be planned</h2>
          <button className="generate-btn" onClick={generateItinerary}>
            ⭐ Generate Itinerary
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <div className="loading-box">
          <h2>Something went wrong</h2>
          <button className="generate-btn" onClick={generateItinerary}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    <div className="veyora-itinerary">
      <header className="header">
        <h1>{itinerary.title}</h1>
        <p>2 People · 2 Days · {destination}</p>
      </header>

      {itinerary.days.map((day) => (
        <section className="day-card" key={day.day}>
          <div className="day-title">
            <h2>Day {day.day}</h2>
            <span>{day.theme}</span>
          </div>

          {/* IMAGES */}
          <div className="image-row">
            {day.images?.morning && <img src={day.images.morning} alt="Morning" />}
            {day.images?.afternoon && <img src={day.images.afternoon} alt="Afternoon" />}
            {day.images?.evening && <img src={day.images.evening} alt="Evening" />}
          </div>

          <div className="timeline">
            <TimeSlot title="Morning" items={day.morning} />
            <TimeSlot title="Afternoon" items={day.afternoon} />
            <TimeSlot title="Evening" items={day.evening} />
          </div>

          <div className="notes">
            <p><strong>FOMO:</strong> {day.fomo}</p>
            <p><strong>Safety:</strong> {day.safety}</p>
            <p><strong>Unexplored:</strong> {day.unexplored}</p>
          </div>
        </section>
      ))}
    </div>
    </div>
  );
}

const TimeSlot = ({ title, items }) => (
  <div className="slot">
    <h3>{title}</h3>
    <ul>
      {items?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export default Dest_next;
