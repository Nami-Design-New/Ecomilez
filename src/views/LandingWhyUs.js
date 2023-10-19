import React from "react";
import reliableServices from "../assets/img/ReliableServices.svg";
import networksymbol from "../assets/img/networksymbol.svg";
import teamwork from "../assets/img/teamwork.svg";
import CompetitivePricing from "../assets/img/CompetitivePricing.svg";
import gear from "../assets/img/gear.svg";
import CustomerSatisfaction from "../assets/img/CustomerSatisfaction.svg";
const LandingWhyUs = () => {
  const features = [
    {
      id: "f1",
      icon: reliableServices,
      title: "Reliable Services",
      description:
        "Our commitment to reliability ensures your cargo arrives on time, every time."
    },
    {
      id: "f2",
      icon: networksymbol,
      title: "Extensive Network",
      description:
        "Our network spans near and far, providing endless opportunities."
    },
    {
      id: "f3",
      icon: teamwork,
      title: "Professional Team",
      description:
        "Our expert team is committed to safe and efficient cargo delivery."
    },
    {
      id: "f4",
      icon: CompetitivePricing,
      title: "Competitive Pricing",
      description:
        "We offer cost-effective, quality solutions, cutting shipping expenses."
    },
    {
      id: "f5",
      icon: gear,
      title: "Cutting-Edge Technology",
      description:
        "We use cutting-edge tech for real-time tracking and efficient logistics."
    },
    {
      id: "f6",
      icon: CustomerSatisfaction,
      title: "Customer Satisfaction",
      description:
        " We're committed to exceeding your transport needs for your satisfaction."
    }
  ];
  return (
    <section className="whyUs">
      <div className="container">
        <h2>Reasons Behind Our Popularity</h2>
        <div className="feature-gird">
          {features.map(feature => {
            return (
              <div className="feature" key={feature.id}>
                <div className="icon">
                  <img src={feature.icon} alt="icon" />
                </div>
                <h3>
                  {feature.title}
                </h3>
                <p>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingWhyUs;
