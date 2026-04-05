import React from "react";
import user3 from "./assets/user3.jpg";
import user2 from "./assets/user2.jpg";

function Testimonial() {
  return (
    <>
      {/* INTERNAL CSS */}
      <style>
        {`
.testimonial-section {
  background: radial-gradient(circle at 50% 10%, #171f30ff 0%, #0c0f17 80%);
  padding: 60px 20px;
  color: #f5e1b7;
  font-family: 'Poppins', sans-serif;
}

.one {
  text-align: center;
  margin-bottom: 40px;
}

.one h1 {
  font-size: 32px;
}

.one p {
  color: rgba(255,255,255,0.7);
  font-size: 15px;
}

/* FEATURED TESTIMONIAL CARD */
.two {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.box {
  width: 90%;
  max-width: 850px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(245,225,164,0.4);
  border-radius: 14px;
  padding: 30px;
  position: relative;
  paddinng-left:90px;
}

.icon {
  position: absolute;
  top: 1px;
  left: 30px;
  font-size: 150px;
  color: rgba(255, 255, 255, 0.73);
}



.text {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255,255,255,0.9);
  margin-left:90px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left:90px;
  margin-right:39px;
}

.stars {
  color: #f7d778;
  font-size: 18px;
}

/* SMALL TESTIMONIAL CARDS */
.three {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.smallCard,
.small-card {
  width: 260px;
  padding: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(245,225,164,0.3);
  border-radius: 12px;
  text-align: center;
  transition: 0.3s;
}

.smallCard:hover,
.small-card:hover {
  transform: translateY(-6px);
  border-color: #f5e1b7;
  box-shadow: 0 0 12px rgba(245,225,164,0.2);
}

.smallCard img,
.small-card img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 2px solid #f5e1b7;
  object-fit: cover;
  margin-bottom: 10px;
}

.smallCard h4,
.small-card h4 {
  color: #f5d36c;
  margin-bottom: 2px;
}

.smallCard span,
.small-card span {
  color: rgba(255,255,255,0.7);
  font-size: 13px;
}

.review {
  font-size: 14px;
  margin: 10px 0;
  color: rgba(255,255,255,0.85);
}
        `}
      </style>

      {/* HTML STRUCTURE */}
      <div className="testimonial-section" id="testimonial-section">
        
        {/* HEADING */}
        <div className="one">
          <h1><center>Loved By Travellers Everywhere</center></h1>
          <p>Real Stories from our happy Customers...</p>
        </div>

        {/* BIG FEATURED CARD */}
        <div className="two">
          <div className="box">
            <div className="icon">“</div>

            <p className="text">
              Our grand Indian adventure was a dream! Every detail, from the
              customized itinerary to the five-star accommodation, was handled
              flawlessly. The private cultural immersions were truly spectacular.
            </p>

            <div className="bottom">
              <div>
                <h3>- Raj and Priya Sharma</h3>
                <span>Mumbai, India</span>
              </div>

              <div className="stars">★★★★★</div>
            </div>
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="three">

          {/* CARD 1 */}
          <div className="smallCard">
            <img src={user2} alt="" />

            <h4>Mansi J.</h4>
            <span>Bengaluru, India</span>

            <p className="review">“Seamless booking experience.”</p>
            <div className="stars">★★★★★</div>
          </div>

          {/* CARD 2 */}
          <div className="small-card">
            <img src={user3}alt="" />

            <h4>Rohit K.</h4>
            <span>Delhi, India</span>

            <p className="review">“Best family vacation ever!”</p>
            <div className="stars">★★★★★</div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Testimonial;
