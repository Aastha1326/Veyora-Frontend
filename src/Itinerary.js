import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Itinerary.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Itinerary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // No auto API call on refresh
  useEffect(() => {
    // intentionally empty
  }, []);

  // User-triggered generation
  const generateItinerary = () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setLoading(true);

    axios
      .post("http://localhost:3001/api/itinerary/final-itinerary")
      .then((res) => {
        setData(res.data);
        localStorage.setItem(
          "finalItinerary",
          JSON.stringify(res.data)
        );
        setIsGenerating(false);
        setLoading(false);
      })
      .catch(() => {
        setIsGenerating(false);
        setLoading(false);
      });
  };

  // VEYORA LOADING SCREEN
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="veyora-loading-wrapper">
          <div className="veyora-loading-card">
            <div className="veyora-spinner-gold"></div>

            <h2 className="veyora-loading-title">
              Crafting your Veyora experience
            </h2>

            <p className="veyora-loading-sub">
              Designing moments, not just itineraries ✨
            </p>

            {!isGenerating && (
              <button
                className="veyora-generate-btn"
                onClick={generateItinerary}
              >
                Generate Itinerary
              </button>
            )}

            {isGenerating && (
              <span className="veyora-loading-hint">
                Please hold on… luxury takes a moment
              </span>
            )}
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center" }}>
          Unable to load itinerary
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="itinerary-container">
        

        {/* SUMMARY CARD */}
        <div className="summary-card">
          <h2>Itinerary Overview</h2>

          <div className="summary-grid">
            <div>📍 <span>{data.tripOverview.destination}</span></div>
            <div>📅 <span>{data.tripOverview.dates}</span></div>
            <div>⏳ <span>{data.tripOverview.totalDays} Days</span></div>
            <div>✈ <span>{data.tripOverview.travelMode}</span></div>
          </div>
        </div>

        {/* DAY CARDS */}
        {data.dayByDayItinerary.map((day) => (
          <div className="day-card" key={day.dayNumber}>
            <div className="day-header">
              <span className="day-chip">Day {day.dayNumber}</span>
              <h3>{day.dayTitle}</h3>
            </div>

            <div className="image-row">
              <img src={day.morning.image} alt="Morning" />
              <img src={day.afternoon.image} alt="Afternoon" />
              <img src={day.evening.image} alt="Evening" />
            </div>

            <div className="time-row">
              <TimeBlock label="Morning" data={day.morning} />
              <TimeBlock label="Afternoon" data={day.afternoon} />
              <TimeBlock label="Evening" data={day.evening} />
            </div>

            <div className="extras">
              <div className="extra tip">
                <h4>Local Tip</h4>
                <p>{day.localTip}</p>
              </div>

              <div className="extra safety">
                <h4>Safety Note</h4>
                <p>{day.safetyNote}</p>
              </div>
            </div>
          </div>
        ))}

        {/* REGENERATE */}
        <div className="save-section">
          <button
            className="save-btn"
            onClick={() => {
              setData(null);
              setLoading(true);
            }}
          >
            🔄 Generate New Itinerary
          </button>
        </div>
      </div>
    </>
  );
};

/* --------- Time Block Component --------- */
const TimeBlock = ({ label, data }) => (
  <div className="time-block">
    <h4>{label}</h4>
    <span className="time">{data.time}</span>

    <ul>
      {data.activities.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <p className="speciality">⭐ {data.speciality}</p>
  </div>
);

export default Itinerary;
