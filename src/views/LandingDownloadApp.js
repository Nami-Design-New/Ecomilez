import React from "react";
import appStore from "../assets/img/app-store.svg";
import googlePlay from "../assets/img/google-play.svg";
const LandingDownloadApp = () => {
  return (
    <section className="downloadApp">
      <div className="innerContent">
        <h2 data-aos="fade-up">Reach your destination 100% sure and safe</h2>
        <p data-aos="fade-up">
          Experience effortless cargo and logistics management with the
          Ecomilez mobile app. Download it today for easy shipment management
          and real-time delivery tracking.
        </p>
        <div className="btns" data-aos="fade-up">
          <a href="#!">
            <img src={appStore} alt="app-store" />
          </a>
          <a href="#!">
            <img src={googlePlay} alt="google-play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingDownloadApp;
