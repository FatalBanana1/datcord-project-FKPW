import { useState } from "react";
import "./Splash.css";
import background from "../../assets/splash_background.svg";
import backgroundLeft from "../../assets/splash_left.svg";
import backgroundRight from "../../assets/splash_right.svg";

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

export default function Splash() {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div className="splash-container-top">
        <div className="splash-top-details-container">
          <div className="splash-top-details-text">
            <h1 className="splash-header">Imagine a place...</h1>
            <div className="splash-top-details-subtext">
              <span>
                ...where you can belong to a school club, a gaming group, or a
                worldwide art community. Where just you and a handful of friends
                can spend time together. A place that makes it easy to talk
                every day and hang out more often.
              </span>
            </div>
          </div>
          <div className="splash-top-details-buttons">
            {!hidden && (
              <button
                onClick={() => {
                  setHidden(true);
                  openForm();
                }}
                className="open-discord-button"
              >
                Open Datcord in your browser
              </button>
            )}
            <div className="form-popup" id="myForm">
              <form action="/" className="form-container">
                <div className="form-input">
                  <input
                    type="text"
                    placeholder="Enter a username"
                    name="username"
                    required
                  ></input>
                </div>
                <div className="form-button">
                  <button type="submit" className="btn">
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="background-image-container-parent">
          <img src={background} className="bg-image" />
        </div>
        <div className="background-image-container">
          <img src={backgroundLeft} className="bg-image-left"></img>
          <img src={backgroundRight} className="bg-image-right"></img>
        </div>
      </div>
    </>
  );
}
