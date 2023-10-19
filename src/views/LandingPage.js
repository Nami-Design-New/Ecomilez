import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "components/Header/Header.js";
import HomeFooter from "components/Footer/HomeFooter.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import LandingSlider from "./LandingSlider";
import LandingWhyUs from "./LandingWhyUs";
import LandingStatics from "./LandingStatics";
import LandingAbout from "./LandingAbout";

const dashboardRoutes = [];
export default function LandingPage(props) {
  const { ...rest } = props;
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
  return (
    <div>
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
      <LandingSlider />
      <LandingAbout />
      <LandingWhyUs />
      <LandingStatics />
      <HomeFooter />
    </div>
  );
}
