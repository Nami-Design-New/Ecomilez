import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import about from "../assets/img/about.jpg";
import icon1 from "../assets/img/icon-1.svg";
import icon2 from "../assets/img/icon-2.svg";

const LandingAbout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      offset: 20,
      delay: 50,
      duration: 750,
      once: true,
    });
  }, []);
  return (
    <section className="about">
      <div className="container">
        <div className="row">
          <div className="co-50">
            <div className="image" data-aos="zoom-in">
              <img src={about} alt="about" />
            </div>
          </div>
          <div className="co-50">
            <div className="content" data-aos="fade-up">
              <span>WELCOME TO SHIPPING</span>
              <h2>Providing full range of transportation</h2>
              <p>
                We are the largest mobility platform and one of the world's
                largest online on-demand services provider. Manage bookings,
                request quotes, or book a online service with our simple and
                quick online booking system
              </p>
              <ul>
                <li>
                  <img src={icon1} alt="icon" />
                  Safety and reliabilit
                </li>
                <li>
                  <img src={icon2} alt="icon" />
                  On time delivery service
                </li>
              </ul>
              <button
                onClick={e => {
                  e.preventDefault();
                  navigate("/about-us");
                }}
              >
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAbout;
