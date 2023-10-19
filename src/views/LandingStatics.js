import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import worldMap from "../assets/img/World Map.svg";

const LandingStatics = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  useEffect(
    () => {
      const startAnimation = () => {
        if (!animationStarted) {
          setAnimationStarted(true);
          const duration = 3000;
          const startTime = Date.now();
          const updateCounter = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
              const progress = elapsedTime / duration * 100;
              const downloads = 10 * progress / 100;
              const starsRate = 50 * progress / 100;
              const deliveryEfficiency = 90 * progress / 100;
              const localCoverage = 18 * progress / 100;
              setStatistics({
                downloads,
                starsRate,
                deliveryEfficiency,
                localCoverage
              });
              requestAnimationFrame(updateCounter);
            }
          };
          updateCounter();
        }
      };
      const section = document.querySelector(".statics");
      const handleScroll = () => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top < window.innerHeight &&
          rect.bottom >= 0 &&
          !animationStarted
        ) {
          startAnimation();
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [animationStarted]
  );
  useEffect(() => {
    AOS.init({
      offset: 20,
      delay: 50,
      duration: 750,
      once: true
    });
  }, []);
  const [statistics, setStatistics] = useState({
    downloads: 0,
    starsRate: 0,
    deliveryEfficiency: 0,
    localCoverage: 0
  });
  return (
    <section className="statics">
      <div className="container">
        <div className="header">
          <p data-aos="fade-up">Industry knowlege</p>
          <h2 data-aos="fade-up">
            Powering innovation <br /> across industries, globally.
          </h2>
        </div>
        <div className="img">
          <img data-aos="zoom-in" src={worldMap} alt="" />
        </div>
        <div className="statistics">
          <div className="static" data-aos="fade-up">
            <h2>
              +{statistics.downloads.toFixed(0)} K
            </h2>
            <h3>downloads</h3>
          </div>
          <div className="static" data-aos="fade-up">
            <h2>
              +{statistics.starsRate.toFixed(0)} K
            </h2>
            <h3>5 Stars Rate</h3>
          </div>
          <div className="static" data-aos="fade-up">
            <h2>
              +{statistics.deliveryEfficiency.toFixed(0)} %
            </h2>
            <h3>Delivery Efficiency</h3>
          </div>
          <div className="static" data-aos="fade-up">
            <h2>
              +{statistics.localCoverage.toFixed(0)} city
            </h2>
            <h3>Local Coverage</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingStatics;
