import React from "react";
import { Link, useLocation } from "react-router-dom";
const SectionHeader = () => {
  let pathname = useLocation().pathname;
  let label = "";
  if (pathname === "/contact-us") {
    label = "Contact us";
  } else if (pathname === "/about-us") {
    label = "About us";
  }
  return (
    <div className="section-header">
      <div className="container">
        <div className="text">
          <h1>
            {label}
          </h1>
          <h4>
            <Link to="/">Home</Link> / {label}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
