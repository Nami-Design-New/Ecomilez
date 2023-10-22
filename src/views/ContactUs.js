import React from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { useSelector } from "react-redux";
import HomeFooter from "components/Footer/HomeFooter.js";
import SectionHeader from "components/SectionHeader";
import marker from "../assets/img/marker.svg";
import email from "../assets/img/email.svg";
import phone from "../assets/img/phone.svg";
import faceBook from "../assets/img/facebook.svg";
import instagram from "../assets/img/instgram.svg";
import twitter from "../assets/img/twitter.svg";

const dashboardRoutes = [];

export default function ContactUs(props) {
  const { ...rest } = props;
  const settings = useSelector(state => state.settingsdata.settings);
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
      <SectionHeader />
      <section className="contacts">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="info">
                <div className="text">
                  <h3>Get in touch</h3>
                  <p>
                    We are always keen to hear from people that would like to
                    add a new perspectives to our team.
                  </p>
                </div>
                <ul>
                  <li>
                    <div className="icon">
                      <img src={marker} alt="icon" />
                    </div>
                    <p>New Maadi , Cairo ,Egypt</p>
                  </li>
                  <li>
                    <div className="icon">
                      <img src={email} alt="icon" />
                    </div>
                    <a href="mailto:ecomilez@gmail.com">ecomilez@gmail.com</a>
                  </li>
                  <li>
                    <div className="icon">
                      <img src={phone} alt="icon" />
                    </div>
                    <a href="tel:+201020778430">01020778430</a>
                  </li>
                </ul>
                <div className="social">
                  <h6>Follow us on</h6>
                  <ul>
                    {settings && settings.FacebookHandle
                      ? <li>
                          <a
                            href={settings.FacebookHandle}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={faceBook} alt="facebook" />
                          </a>
                        </li>
                      : null}
                    {settings && settings.InstagramHandle
                      ? <li>
                          <a
                            href={settings.InstagramHandle}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={instagram} alt="facebook" />
                          </a>
                        </li>
                      : null}
                    {settings && settings.TwitterHandle
                      ? <li>
                          <a
                            href={settings.TwitterHandle}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={twitter} alt="twitter" />
                          </a>
                        </li>
                      : null}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27643.226688739058!2d31.34229948916014!3d29.996573000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145838dfa7e82b9f%3A0x1436c0e5bedbd927!2sNew%20Maadi!5e0!3m2!1sar!2seg!4v1697976464005!5m2!1sar!2seg"
                style={{ border: 0 }}
                allowFullScreen
                title="ourLocation"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </div>
  );
}
