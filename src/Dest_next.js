//this file defines the Dest_next component, which is responsible for displaying the generated itinerary for a selected destination. It uses React hooks to manage state and side effects, and it interacts with the backend API to generate the itinerary. The component also handles loading states, error handling, and caching of the itinerary in session storage to improve performance and user experience.

import React, { useEffect, useState } from "react";  //useEffect is a React hook that allows you to perform side effects in functional components, such as fetching data or updating the DOM. useState is another React hook that allows you to add state to functional components, enabling them to manage and respond to user interactions and data changes.
import { useLocation, useNavigate } from "react-router-dom"; //useLocation is a hook from React Router that provides access to the current location object, allowing the component to read the state passed through navigation. useNavigate is another hook from React Router that provides a function to programmatically navigate to different routes within the application.
import axios from "axios";  //axios is a popular JavaScript library used to make HTTP requests from the browser or Node.js. It simplifies the process of sending asynchronous requests to REST endpoints and handling responses, making it easier to interact with APIs and fetch data for the application.
import "./dest_next.css";
import Navbar from './Navbar';
import BASE_URL from "./config";

function Dest_next() {  //this is the main functional component that renders the itinerary for a specific destination. It manages the state of the itinerary, loading status, and error messages. The component fetches the itinerary data from the backend API when the user requests it and displays it in a structured format, including day-wise activities, images, and notes. It also provides a button to generate the itinerary if it hasn't been created yet.
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.destination;

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {  //this useEffect hook runs when the component mounts or when the destination or navigate dependencies change. It checks if a destination is provided; if not, it navigates back to the home page. If a destination is available, it attempts to retrieve a cached itinerary from session storage. If a cached itinerary exists, it sets the itinerary state with the cached data, allowing for faster loading and improved user experience without needing to fetch the data again from the backend.
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
        `${BASE_URL}/api/ai/generate-itinerary`,
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

const TimeSlot = ({ title, items }) => (  //this is a functional component that represents a time slot (morning, afternoon, or evening) in the itinerary. It takes in a title and an array of items (activities) as props and renders them in a structured format. The component displays the title of the time slot and maps over the items array to create a list of activities for that specific time of day.
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
