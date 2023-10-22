import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import HomeFooter from "components/Footer/HomeFooter.js";
import SectionHeader from "components/SectionHeader";
import aboutImg from "../assets/img/abbout.jpg";
import icon2 from "../assets/img/icon-2.svg";
import icon3 from "../assets/img/icon-3.svg";
import icon4 from "../assets/img/icon-4.svg";
import icon5 from "../assets/img/icon-5.svg";
import vision from "../assets/img/vision.svg";
import team from "../assets/img/team.svg";
import network from "../assets/img/network.svg";
import LandingDownloadApp from "./LandingDownloadApp";

const dashboardRoutes = [];
export default function AboutUs(props) {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      const sectionDivs = section.querySelectorAll("[data-aos]");
      sectionDivs.forEach((element, index) => {
        element.setAttribute("data-aos-delay", (index + 1) * 100);
      });
    });
    AOS.init({
      offset: 20,
      delay: 50,
      duration: 750,
      once: true
    });
  }, []);
  const { ...rest } = props;
  return (
    <div style={{ margin: "-8px" }}>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <SectionHeader />
      <section className="whoWeAre">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="text">
                <h5 data-aos="fade-up">Who we are</h5>
                <p data-aos="fade-up">
                  We are the largest mobility platform and one of the world's
                  largest online on-demand services provider. Manage bookings,
                  request quotes, or book a online service with our simple and
                  quick online booking system. We are an on-demand services
                  company that allows guests to easily book verious services
                  online. We offer the best services in the country.
                </p>
                <ul>
                  <li data-aos="fade-up">
                    <img src={icon4} alt="icon" />
                    Exceptional Safety Standards
                  </li>
                  <li data-aos="fade-up">
                    <img src={icon2} alt="icon" />
                    Reliable Services
                  </li>
                  <li data-aos="fade-up">
                    <img src={icon3} alt="icon" />
                    Punctuality Matters
                  </li>
                  <li data-aos="fade-up">
                    <img src={icon5} alt="icon" />
                    Efficient Route Planning
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="image">
                <img src={aboutImg} alt="about" data-aos="zoom-in-up" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cardsSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-12 p-3">
              <div className="about_card" data-aos="fade-up">
                <img src={vision} alt="vision" />
                <h5>Our Vision</h5>
                <p>
                  🌍 Local Dedication: We're here to serve Egypt's logistics
                  needs, making in-country transportation seamless and
                  efficient.
                </p>
                <p>
                  🚚 Local Efficiency: We optimize deliveries for prompt,
                  cost-effective service, focusing on local routes and
                  conditions.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 p-3">
              <div className="about_card" data-aos="fade-up">
                <img src={team} alt="" />
                <h5>Our Team</h5>
                <p>
                  🤝 Egypt Logistics Experts: We're your local logistics
                  specialists, guaranteeing efficient cargo delivery from
                  regulations to traffic.
                </p>
                <p>
                  💡 Regional Innovation: We're committed to innovation,
                  tailoring solutions to meet the region's unique needs and
                  providing you with cutting-edge solutions.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 p-3">
              <div className="about_card" data-aos="fade-up">
                <img src={network} alt="network" />
                <h5>Our Network</h5>
                <p>
                  🌐 Nationwide Reach: Our network spans from Cairo to
                  Alexandria, ensuring we're accessible wherever you are in
                  Egypt.
                </p>
                <p>
                  ⏰ Punctual Deliveries: We're committed to meeting your
                  delivery deadlines, keeping your operations running smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LandingDownloadApp />
      <HomeFooter />
    </div>
  );
}
