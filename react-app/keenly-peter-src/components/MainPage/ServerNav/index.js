import "./ServerNav.css";
import avatar from "../../../assets/datcord_logo_svg.svg";
import { Route, Switch } from "react-router-dom";
import MainContent from "../MainContent";
import { useEffect } from "react";
export default function ServerNav() {
  return (
    <div className="ServerNav-container">
      <div className="ServerNav-profile">
        <img src={avatar} className="ServerNav-icon" alt="server-icon" />
      </div>
      <div className="ServerNav-divider"></div>
      {/* // can probably map all the servers icon_url */}
      <div className="ServerNav-icons">
        <img src={avatar} className="ServerNav-icon" alt="server-icon" />
      </div>
      <div className="ServerNav-divider"></div>
      <div className="ServerNav-icons">
        <i className="fa-solid fa-plus"></i>
      </div>
    </div>
  );
}
