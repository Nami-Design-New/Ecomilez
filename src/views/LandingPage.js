import React from "react";
import Header from "components/Header/Header.js";
import HomeFooter from "components/Footer/HomeFooter.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import LandingSlider from "./LandingSlider";
import LandingWhyUs from "./LandingWhyUs";
import LandingStatics from "./LandingStatics";
import LandingAbout from "./LandingAbout";
// import Hero from "../components/Hero";
// import Download from "../components/Download";
// import { useSelector } from "react-redux";
const dashboardRoutes = [];
export default function LandingPage(props) {
  // const auth = useSelector(state => state.auth);
  const { ...rest } = props;
  // const [role, setRole] = useState();
  // useEffect(
  //   () => {
  //     if (auth && auth.profile) {
  //       if (auth.profile.uid) {
  //         let role = auth.profile.usertype;
  //         if (
  //           role === "admin" ||
  //           role === "fleetadmin" ||
  //           role === "customer"
  //         ) {
  //           setRole("customer");
  //         } else if (role === "driver") {
  //           setRole("driver");
  //         }
  //       }
  //     }
  //   },
  //   [auth]
  // );
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
