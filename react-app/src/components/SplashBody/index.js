import React from "react";
import "./SplashBody.css";
import img from "../../assets/splash_detail_01.svg";
import peter from "../../assets/peter-banner.png";
import keenly from "../../assets/keenly-banner.png";
import fahd from "../../assets/fahd-banner.png";
import wasiq from "../../assets/wasiq-banner.png";

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting);
        }
      });
    });

    const { current } = domRef;
    observer.observe(current)
    return () => observer.unobserve(current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default function SplashBody() {
  return (
    <>
      <FadeInSection>
        <div className="splash-body-parent">
          <div className="splash-body-container">
            <div className="splash-body-img-container">
              <img src={img} className="body-img"></img>
            </div>
            <div className="splash-body-description">
              <h2>Create an invite-only place where you belong</h2>
              <div className="splash-body-description-text">
                Datcord servers are organized into topic-based channels where
                you can collaborate, share, and just talk about your day without
                clogging up a group chat.
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
      <div className="splash-body-2-parent">
        <FadeInSection>
          <div className="splash-body-2-container">
            <div className="splash-body-2-description">
              <h2 id="meet-devs">Meet The Developers</h2>
            </div>
            <div className="splash-body-2-developers-container">
              <div className="developer-card">
                <div className="developer-card-name">Wasiq Rashid</div>
                <img src={wasiq} className="developer-card-img"></img>
                <div className="developer-card-info">
                  <span>
                    <a href="https://www.linkedin.com/in/wasiq-rashid-3164b2258/">
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a href="https://github.com/FatalBanana1">GitHub</a>
                  </span>
                </div>
              </div>
              <div className="developer-card">
                <div className="developer-card-name">Peter Nguyen</div>
                <img src={peter} className="developer-card-img"></img>
                <div className="developer-card-info">
                  <span>
                    <a href="https://www.linkedin.com/in/nguyenpeterviet/">
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a href="https://github.com/ipetpandas">GitHub</a>
                  </span>
                </div>
              </div>
              <div className="developer-card">
                <div className="developer-card-name">Keenly Chung</div>
                <img src={keenly}></img>
                <div className="developer-card-info">
                  <span>
                    <a href="https://www.linkedin.com/in/keenly-chung-b10485257/">
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a href="https://github.com/keenlyhere">GitHub</a>
                  </span>
                </div>
              </div>
              <div className="developer-card">
                <div className="developer-card-name">Fahd Ahsan</div>
                <img src={fahd}></img>
                <div className="developer-card-info">
                  <span>
                    <a href="https://www.linkedin.com/in/fahdahsan/">
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a href="https://github.com/Dhaaaf">GitHub</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        <div className="splash-body-footer-parent">
          <div className="splash-body-footer-container">
            <div className="splash-body-footer-left">
              <h1>Imagine a place</h1>
            </div>
            <div className="splash-body-footer-techstack">
              <h2>Tech Stack</h2>
              <h3>Languages</h3>
              <li>Python</li>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
              <h3>Backend</h3>
              <li>Flask</li>
              <li>Flask SQL Alchemy</li>
              <li>Flask Alembic</li>
              <h3>Frontend</h3>
              <li>React</li>
              <li>React Router</li>
              <li>Redux</li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
