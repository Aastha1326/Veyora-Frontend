import React, { useState } from "react";
import "./Input.css";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";


function Input() {

  const navigate=useNavigate();

  const [formData,setFormData]=useState({
    source:"",
    destination:"",
    fromDate:"",
    toDate:"",
    budget:"",
    travellers:"",
    mode:"",
    interests:[]
  });

   const [selectedTags, setSelectedTags] = useState([]);

  const handleChange=(e)=>{

    const{ name,value} = e.target;
        setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      await axios.post( 'http://localhost:3001/api/trips/input', formData);
      navigate('/itinerary');
    }
    catch(err){
      alert("error saving trip data");
    }
  };

 


   const toggleTag = (tag) => {
  let updatedTags;

  if (selectedTags.includes(tag)) {
    updatedTags = selectedTags.filter((t) => t !== tag);
  } else {
    updatedTags = [...selectedTags, tag];
  }

  setSelectedTags(updatedTags);

  setFormData((prev) => ({
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
          
          {/* <h1 className="logo-text">
            <Link to="/"><p>←Back to Home</p></Link>
          </h1> */}
        <h1 className="form-title"><center>Trip Details Form</center></h1>

          <form className="trip-form" onSubmit={handleSubmit}>

            <div className="form-row two-row">
            <div className="half">
              <label>Source Location</label>
              <input type="text" placeholder="Enter source" name="source" value={formData.source} onChange={handleChange} />
            </div>

                <div className="half">
                <label>Destination</label>
                <input type="text" placeholder="Enter destination"  name="destination" value={formData.destination} onChange={handleChange}/>
            </div>
            </div>

            <div className="form-row date-row">
             <div className="half">
               <label>From Date</label>
               <input type="date"  name="fromDate" value={formData.fromDate} onChange={handleChange}/>
             </div>
           
             <div className="half">
               <label>To Date</label>
               <input type="date" value={formData.toDate} name="toDate" onChange={handleChange} />
             </div>
            </div>


            <div className="form-row two-row">
              <div className="half">
                <label>Budget (₹)</label>
                <input type="number" placeholder="Your budget" name="budget" value={formData.budget} onChange={handleChange}/>
              </div>
            
              <div className="half">
                <label>Travellers</label>
                <input type="number" placeholder="No. of people"  name="travellers" value={formData.travellers} onChange={handleChange}/>
              </div>
            </div>
            

            <div className="form-row">
              <label>Travel Mode Preferences</label>
              <input type="text" placeholder="Flight / Train / Bus" name="mode" value={formData.mode} onChange={handleChange}/>
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
                   className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
                   onClick={() => toggleTag(tag)}
                 >
                   {tag}
                 </span>
               ))}
            </div>
</div>


            <button className="submit-btn" type="submit">Generate Itinerary</button>
          </form>
        </div>
 
 {/* RIght Panel */}
       <div className="right-box"></div>

  
      </div>
    </div>
    </div>
  );
}

export default Input;
