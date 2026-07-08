//it is the core component for taking user input for trip details and preferences. It includes a form where users can enter their source, destination, travel dates, budget, number of travelers, travel mode preferences, and select interest tags. Upon submission, it sends the data to the backend API and navigates the user to the itinerary page if successful. It also includes a tag selection mechanism that allows users to choose their interests, which are then included in the form data sent to the backend.

import React, { useState } from "react";
import "./Input.css";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import BASE_URL from "./config";

function Input() {
  const navigate = useNavigate();  //it allows to programmatically navigate to different routes in the application. In this code, it is used to navigate the user to the itinerary page after successfully submitting the trip details form.

  const [formData, setFormData] = useState({  //formData is a state variable that holds the values of the trip details form fields. It is initialized with an object containing empty strings for source, destination, fromDate, toDate, budget, travellers, mode, and an empty array for interests. As the user fills out the form, the handleChange function updates the corresponding values in formData, allowing us to keep track of the user's input in real-time.
    source: "",
    destination: "",
    fromDate: "",
    toDate: "",
    budget: "",
    travellers: "",
    mode: "",
    interests: []
  });

  const [selectedTags, setSelectedTags] = useState([]);  //selectedTags is a state variable that holds the currently selected interest tags. It is initialized as an empty array. When a user clicks on an interest tag, the toggleTag function updates this state by adding or removing the clicked tag from the selectedTags array. This allows us to keep track of which interest tags the user has selected, and this information is also included in the formData when submitting the trip details.

  const handleChange = (e) => {    //this function updates the formData state whenever the user types into any of the input fields (source, destination, fromDate, toDate, budget, travellers, mode). It uses the name attribute of the input fields to determine which field is being updated and sets the corresponding value in the formData state. This allows us to keep track of the user's input in real-time as they fill out the trip details form.
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {   //this function is called when the trip details form is submitted. It prevents the default form submission behavior, retrieves the authentication token from local storage, and sends a POST request to the backend API with the form data and the token in the headers for authentication. If the request is successful, it navigates the user to the itinerary page. If there is an error during the submission process, it alerts the user with an error message.
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/api/trips/input`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/itinerary");
    } catch (err) {
      alert("Error saving trip data");
    }
  };

  // ================= TAG HANDLER =================
  const toggleTag = (tag) => {   //this function is called when a user clicks on an interest tag. It checks if the clicked tag is already in the selectedTags array. If it is, it removes the tag from the array; if it is not, it adds the tag to the array. After updating the selectedTags state, it also updates the formData state to include the updated list of selected interest tags under the interests field. This allows us to keep track of which interest tags the user has selected and include that information when submitting the trip details form.
    let updatedTags;

    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag);   //if the clicked tag is already in the selectedTags array, this line creates a new array (updatedTags) that includes all tags from selectedTags except the one that was clicked. This effectively removes the clicked tag from the list of selected tags.
    } else {
      updatedTags = [...selectedTags, tag];
    }

    setSelectedTags(updatedTags);   //this line updates the selectedTags state with the new array of selected tags (updatedTags). This will trigger a re-render of the component, allowing the UI to reflect the changes in tag selection (e.g., highlighting the selected tags).

    setFormData((prev) => ({  //this line updates the formData state to include the updated list of selected interest tags under the interests field. It takes the previous formData state (prev) and spreads it to keep all existing fields unchanged, while updating the interests field with the new array of selected tags (updatedTags). This ensures that when the form is submitted, it includes the current selection of interest tags along with the other trip details.
      ...prev,
      interests: updatedTags
    }));
  };

  return (
    <div>
      <Navbar />

      <div className="page">
        <div className="main-box">

          {/* LEFT PANEL */}
          <div className="left-box">
            <h1 className="form-title">
              <center>Trip Details Form</center>
            </h1>

            <form className="trip-form" onSubmit={handleSubmit}>

              <div className="form-row two-row">
                <div className="half">
                  <label>Source Location</label>
                  <input
                    type="text"
                    placeholder="Enter source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                  />
                </div>

                <div className="half">
                  <label>Destination</label>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row date-row">
                <div className="half">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="half">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row two-row">
                <div className="half">
                  <label>Budget (₹)</label>
                  <input
                    type="number"
                    placeholder="Your budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                <div className="half">
                  <label>Travellers</label>
                  <input
                    type="number"
                    placeholder="No. of people"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <label>Travel Mode Preferences</label>
                <input
                  type="text"
                  placeholder="Flight / Train / Bus"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row interest-row">
                <label>Interest Tags</label>
                <div className="tag-box">
                  {[
                    "⛰️Adventure",
                    "🧘Relaxation",
                    "🌳Nature",
                    "🏛️Historical",
                    "🌴Beaches"
                  ].map((tag) => (
                    <span
                      key={tag}
                      className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}   //this line conditionally applies the "selected" class to the tag if it is included in the selectedTags array. This allows the UI to visually indicate which tags have been selected by the user (e.g., by changing the background color or border of the selected tags).
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="submit-btn" type="submit">
                Generate Itinerary
              </button>

            </form>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-box"></div>

        </div>
      </div>
    </div>
  );
}

export default Input;
