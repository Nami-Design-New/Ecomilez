import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import slide from "../assets/img/s1.jpg";
import { useNavigate } from "react-router-dom";
const LandingSlider = () => {
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
    <section className="landing-slider">
      <img src={slide} className="home-img" alt="slide-1" />
      <div className="over-lay">
        <div className="content">
          <h2 data-aos="fade-up">Cargo Transportation Simplified to Perfection</h2>
          <button data-aos="fade-up"
            onClick={e => {
              e.preventDefault();
              navigate("/contact-us");
            }}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingSlider;
