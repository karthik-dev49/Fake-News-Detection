import React from "react";
// import PropTypes from 'prop-types'

import "./Nav.css";
// import { Link } from "react-router-dom";

const Nav = ({ onTabChange, activeTab }) => {
  return (
    <div className="nav-bar">
      <div
        className={`home-containerTab ${activeTab ? "active-tab" : ""}`}
        onClick={() => onTabChange(true)}
      >
        Home
      </div>
      <div
        className={`home-modelTab ${!activeTab ? "active-tab" : ""}`}
        onClick={() => onTabChange(false)}
      >
        Models
      </div>
    </div>
  );
};

// Nav.propTypes = {};

export default Nav;
