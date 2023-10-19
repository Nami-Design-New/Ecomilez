import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Ecommilez from "../../assets/img/ecomilez.svg";
import marker from "../../assets/img/marker.svg";
import email from "../../assets/img/email.svg";
import phone from "../../assets/img/phone.svg";

export default function HomeFooter() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="review">
              <img src={Ecommilez} alt="logo" />
              <p>
                Ecomilez - Where Excellence Meets Logistics. Your Trusted
                Partner for Reliable Cargo Transportation Solutions Across the
                Globe.
              </p>
            </div>
          </div>
          <div className="col">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    navigate("/bookings");
                  }}
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    navigate("/about-us");
                  }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    navigate("/contact-us");
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={e => {
                    e.preventDefault();
                    navigate("/privacy-policy");
                  }}
                >
                  Privacy and Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h2>Contact Info</h2>
            <ul className="info">
              <li>
                <img src={marker} alt="icon" />
                <p>Eighth district Sixth region Nasr City Cairo Governorate</p>
              </li>
              <li>
                <img src={email} alt="icon" />
                <a href="mailto:Ecomilez@gmail.com">Ecomilez@gmail.com</a>
              </li>
              <li>
                <img src={phone} alt="icon" />
                <a href="tel:+201020778430">01020778430</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <p>
            Copyright © 2010 - {new Date().getFullYear()}{" "}
            <Link to="/">Ecomilez</Link>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
