import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext.js";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const navBarStyle = { backgroundColor: '#f8ad9d' };
  const linkStyle = { color: "white" };

  const loggedInNav = () => {
    return (
      <nav className="navbar navbar-expand navbar-light" style={navBarStyle}>
        <div className="container d-flex flex-column align-items-center">
        <div className="mx-auto navbar-brand">
            <Link to="/" style={{ ...linkStyle, textDecoration: "none" }}>
              HappyHour Interior Design Map
              </Link>
          </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/spaces">
                Spaces
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/users/${currentUser.username}`}>
                View Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/users/${currentUser.username}/edit`}>
                Edit Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/users/${currentUser.username}/spaces`}>
                {currentUser.username}'s Liked & Visited Spaces
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={logout}>
                Log out {currentUser.username}
              </NavLink>
            </li>
            {currentUser.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/locations">
                Spaces by Location
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                Spaces by Category
              </NavLink>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    );
  };

  const anonNav = () => {
    return (
      <nav className="navbar navbar-expand navbar-light" style={navBarStyle}>
        <div className="container d-flex flex-column align-items-center">
        <div className="mx-auto navbar-brand">
            <Link to="/"style={{ ...linkStyle, textDecoration: "none" }}>
              HappyHour Interior Design Map
              </Link>
          </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    );
  };

  return <div className="Nav-Bar">{currentUser ? loggedInNav() : anonNav()}</div>;
};

export default NavBar;




