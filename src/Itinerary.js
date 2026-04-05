import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Itinerary.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import BASE_URL from "./config";

import html2canvas from "html2canvas";  // For capturing the itinerary as an image
import jsPDF from "jspdf";    // For generating a PDF from the captured image

const Itinerary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById("itinerary-content");
    const noPdfElements = document.querySelectorAll(".no-pdf");
  
    // ✅ Activate PDF mode
    element.classList.add("pdf-mode");
  
    // hide buttons
    noPdfElements.forEach(el => el.style.visibility = "hidden");
  
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
  
    // restore
    element.classList.remove("pdf-mode");
    noPdfElements.forEach(el => el.style.visibility = "visible");
  
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF("p", "mm", "a4");
  
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    let heightLeft = imgHeight;
    let position = 0;
  
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  
    pdf.save(`Veyora_${data.tripOverview.destination}.pdf`);
  };

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
      .post(`${BASE_URL}/api/itinerary/final-itinerary`)
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

      <div id="itinerary-content" className="itinerary-container">
        

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
        <div className="save-section no-pdf">
          <button className="save-btn" onClick={downloadPDF}>
            📄 Download PDF
          </button>
        
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
