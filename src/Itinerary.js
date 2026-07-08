//this file is responsible for displaying the generated itinerary to the user. It fetches the itinerary data from the backend API and renders it in a visually appealing format. The itinerary includes a summary card with trip details and day-by-day cards that show activities for morning, afternoon, and evening, along with local tips and safety notes. It also provides options for the user to download the itinerary as a PDF or generate a new one. The component uses React hooks for managing state and side effects, and it integrates with external libraries like html2canvas and jsPDF for PDF generation.


import React, { useEffect, useState } from "react";   //useEffect for API calls, useState for managing itinerary data and loading state
import axios from "axios";
import "./Itinerary.css";
import Navbar from "./Navbar";
import BASE_URL from "./config";

import html2canvas from "html2canvas";  // For capturing the itinerary as an image
import jsPDF from "jspdf";    // For generating a PDF from the captured image

const Itinerary = () => {
  const [data, setData] = useState(null); //this is null bcoz we want to show loading screen until we get the data from backend. Once we have the data, we set it in state and render the itinerary. If we initialized it as an empty object or array, it would not allow us to differentiate between loading state and no data state effectively.
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {  //this function is responsible for generating a PDF of the itinerary. It uses html2canvas to capture the itinerary content as an image and then uses jsPDF to create a PDF document from that image. The function also includes some logic to hide certain elements (like buttons) during the PDF generation process to ensure a clean output, and it restores the visibility of those elements afterward. Finally, it saves the generated PDF with a filename that includes the destination from the itinerary data.
    const element = document.getElementById("itinerary-content");  //it selects the DOM element with the id "itinerary-content", which is the container for the itinerary that we want to capture and convert into a PDF. This element will be passed to html2canvas to create a canvas representation of the itinerary content, which can then be used to generate the PDF.
    const noPdfElements = document.querySelectorAll(".no-pdf");   //it selects all DOM elements with the class "no-pdf". These are elements that we want to hide during the PDF generation process (such as buttons or interactive elements) to ensure that they do not appear in the final PDF. The function will set the visibility of these elements to "hidden" before capturing the itinerary content and will restore their visibility afterward. This allows us to create a cleaner and more professional-looking PDF of the itinerary without any unnecessary UI elements.
  
    //  Activate PDF mode
    element.classList.add("pdf-mode");
  
    // hide buttons
    noPdfElements.forEach(el => el.style.visibility = "hidden");
  
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
  
    // restore
    element.classList.remove("pdf-mode");   //after the canvas has been generated, this line removes the "pdf-mode" class from the itinerary content element. This is important to restore the original styling of the itinerary content after the PDF generation process is complete. The "pdf-mode" class may have been used to apply specific styles for PDF generation (such as adjusting layout or hiding certain elements), and removing it ensures that the UI returns to its normal state for the user.
    noPdfElements.forEach(el => el.style.visibility = "visible"); //this line restores the visibility of all elements that were previously hidden during the PDF generation process. It iterates through each element in the noPdfElements NodeList and sets their style.visibility property back to "visible". This ensures that any buttons or interactive elements that were hidden while capturing the itinerary content for the PDF are now visible again for the user to interact with after the PDF has been generated.
  
    const imgData = canvas.toDataURL("image/png");  //this line converts the generated canvas into a data URL in PNG format. The resulting imgData variable will contain a base64-encoded string representation of the image, which can then be used to add the image to the PDF document using jsPDF. This allows us to include a visual representation of the itinerary content in the generated PDF.
  
    const pdf = new jsPDF("p", "mm", "a4");
  
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    let heightLeft = imgHeight;
    let position = 0;
  
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;  //it calculates the remaining height of the image after adding the first page to the PDF. If the image height exceeds the page height, it will need to add additional pages to accommodate the entire image. The heightLeft variable is used to keep track of how much of the image still needs to be added to the PDF, and the position variable is used to determine where on the next page the remaining part of the image should be placed.
  
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  
    pdf.save(`Veyora_${data.tripOverview.destination}.pdf`);  //this line saves the generated PDF document with a filename that includes the destination from the itinerary data. The filename is constructed using a template literal, where "Veyora_" is a prefix, followed by the destination name extracted from data.tripOverview.destination, and ending with the ".pdf" extension. This allows the user to easily identify the PDF file based on the destination of their trip when they download it.
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
                Please hold on… luxury takes a moment   {/* this message is displayed while the itinerary is being generated, indicating to the user that the process may take some time. It adds a touch of personality and reassurance, letting the user know that their personalized itinerary is being crafted with care and attention to detail, which can help manage expectations during the loading period. */}
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
          <button className="save-btn" onClick={downloadPDF}>   {/* this message is displayed while the itinerary is being generated, indicating to the user that the process may take some time. It adds a touch of personality and reassurance, letting the user know that their personalized itinerary is being crafted with care and attention to detail, which can help manage expectations during the loading period.*/}
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
