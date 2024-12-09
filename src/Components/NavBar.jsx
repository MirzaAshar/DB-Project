import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import { getUserById } from "../Services/Services";

const NavBar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      getUserById(localStorage.getItem("userId")).then((user) => {
        setUsername(user.name);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("category");
    localStorage.removeItem("categoryId");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">FAST Alumni Network</Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname.includes("/blogs/page") ? "active" : ""}>
          <Link to="/blogs/page/1">Blogs</Link>
        </li>
        <li className={location.pathname === "/jobs" ? "active" : ""}>
          <Link to="/jobs">Jobs</Link>
        </li>
        {/* <li className={location.pathname === "/news" ? "active" : ""}>
          <Link to="/news">News</Link>
        </li>
        <li className={location.pathname === "/events" ? "active" : ""}>
          <Link to="/events">Events</Link>
        </li> */}
        <li className={location.pathname === "/alumni-directory" ? "active" : ""}>
          <Link to="/alumni-directory">Alumni Directory</Link>
        </li>
        {isLoggedIn ? (
          <li className="navbar-username">
            <span className="user-login-name">{username}</span>
            <div className="dropdown-content">
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </li>
        ) : (
          <>
            <li className={location.pathname === "/signin" ? "active" : ""}>
              <Link to="/signin" className="navbar-button">Sign In</Link>
            </li>
            <li className={location.pathname === "/signup" ? "active" : ""}>
              <Link to="/signup" className="navbar-button navbar-button-primary">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
