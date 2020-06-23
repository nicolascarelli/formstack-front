import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles.css";

const NavBar = ({ user }) => {
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <Link className="navbar-brand" to="/">
        My Vinyls
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/vinyls">
              Vinyls
            </NavLink>
          </React.Fragment>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
