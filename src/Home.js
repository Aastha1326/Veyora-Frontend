import './Home.css';
import Destination from './Destination';
import Features from './FeaturesSection';
import Testimonial from './Testimonial';
import main from './assets/main.jpg'; // Ensure this image path is correct
import Footer from './Footer';
import logo from './logo.png'; // Ensure this logo path is correct
import { FaPlane } from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Home() {

  //this is user login logout logic

  let user = null;

const storedUser = localStorage.getItem("user");

if (storedUser && storedUser !== "undefined") {
  try {
    user = JSON.parse(storedUser);
  } catch {
    user = null;
  }
}



const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload(); // refresh navbar state
};


  // Function to scroll to the Features section (assuming it has id="upp")
  const scrollToFeatures = () => {
    const element = document.getElementById("upp");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  const scrollIntoDestination=()=>{
    const element=document.getElementById("destination-section");
    if(element){
      element.scrollIntoView({behavior:"smooth"});
    }
  };

  const scrollIntoTestimonials=()=>{
    const element=document.getElementById("testimonial-section");
    if(element){
      element.scrollIntoView({behavior:"smooth"});
    }
  };

  const scrollIntoContact=()=>{
    const element=document.getElementById("footer-section");
    if(element){
      element.scrollIntoView({behavior:"smooth"});
    }
  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="left">
          <img src={logo} alt="VEYORA Logo" height="50px" />
        </div>

        <div className="right">
          <ul className="nav-links">
            <li>Home</li>
            <li onClick={scrollToFeatures}>Features</li>
            <li onClick={scrollIntoDestination}>Destinations</li>
            <li onClick={scrollIntoTestimonials}>Testimonials</li>
            <li onClick={scrollIntoContact}>Contact</li>
            {user ? (
               <div className="veyora-auth">
                 <span className="veyora-greeting">
                   Hello, <strong>{user.username}</strong>
                 </span>
             
                 <button className="veyora-logout" onClick={handleLogout}>
                   Logout
                 </button>
               </div>
             ) : (
               <Link to="/login">
                 <button className="login-btn">Login</button>
               </Link>
            )}
             
          </ul>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <FaPlane className="plane-icon top-left floating" />

        <div className="hero-content-wrapper">

          {/* LEFT SIDE */}
          <div className="hero-left">
            <h1 className="hero-title">AI-Powered Travel Planner</h1>
            <p className="hero-subtitle">
              You desire to visiting, to world catching quickly day trip.
            </p>
            <Link to="/input"><button className="cta-btn">Start Planning</button></Link>
          </div>

          {/* RIGHT SIDE — Circle + Itinerary */}
          <div className="hero-center">

  <div className="circle-wrapper">

    <div className="travel-circle">
      <p className="circle-title">AI Suggestion</p>

      <div className="circle-image-box">
        <img src={main} alt="Udaipur Palace" />
        <p className="circle-location">Udaipur, India</p>
      </div>
    </div>

    

  </div>

  {/* ITINERARY LIST */}
  <div className="itinerary-clean">
    <h3 className="itinerary-header">Your Personalized Stay</h3>
    <ul>
      <li>Day 1: Palace Tour</li>
      <li>Day 2: Lakes</li>
      <li>Day 3: Cruises</li>
      <li>Historical…</li>
    </ul>
  </div>

</div>

        </div>
      </div>

      {/* SECTIONS */}
      {/* Note: Ensure Destination, Features, Testimonial, and Footer components exist */}
      <Features /><br />
      <Destination /><br />
      <Testimonial /><br />
      <Footer />

    </div>
  );
}

export default Home;