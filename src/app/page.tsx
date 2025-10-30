import React, { use } from "react";
import "./styles.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavBar, { NavBarSignout } from "@/components/navbar/nav-bar";
import { TypewriterEffectDemo } from "@/components/anmetedUI/type-eriter-effect";
import { NavbarDemo } from "@/components/navbar/landing-nav-acer";
import { FeaturesSectionDemo1 } from "@/components/landing-page/feature-sec-demo-1";
import Content from "@/components/landing-page/content";
// import { useRouter } from "next/navigation";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <NavBarSignout />
      {/* <NavbarDemo/> */}
      {/* <NavbarDemo/> */}
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "darken",
        }}
      >
        <Content/>
        
      </div>

      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <h3>24/7 Blood Supply</h3>
              <p>
                Round-the-clock availability of all blood types for emergency
                and routine medical needs
              </p>
            </div>
            <div className="feature-card">
              <h3>Safe & Tested</h3>
              <p>
                All donated blood undergoes rigorous testing to ensure safety
                and quality standards
              </p>
            </div>
            <div className="feature-card">
              <h3>Easy Donation</h3>
              <p>
                Quick and comfortable donation process with experienced medical
                professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Lives Saved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Donors Registered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Safety Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="donation-info">
        <div className="container">
          <h2>Who Can Donate?</h2>
          <div className="eligibility-grid">
            <div className="eligibility-item">
              <h4>Age</h4>
              <p>18-65 years old</p>
            </div>
            <div className="eligibility-item">
              <h4>Weight</h4>
              <p>Minimum 50 kg</p>
            </div>
            <div className="eligibility-item">
              <h4>Health</h4>
              <p>Good general health</p>
            </div>
            <div className="eligibility-item">
              <h4>Frequency</h4>
              <p>Every 3 months</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <TypewriterEffectDemo/>
      </section>
      <section>
        {/* <FeaturesSectionDemo1/> */}
      </section>
    </div>
  );
};

export default page;
