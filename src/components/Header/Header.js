import React, { useState, useEffect, useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getForecastWeather } from "../../utils/weatherapi";

const Header = ({ onCreateModal, onSignupClick, onLoginClick }) => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const avatar = require("../images/avatar.svg").default;
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const weatherData = await getForecastWeather();
        setLocationName(weatherData.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    })();
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={require("../images/logo.svg").default} alt="logo" />
        </Link>
        <div>{`${currentDate},`}</div>
        <div>
          {locationName ? ` ${locationName}` : "Fetching location..."}
        </div>{" "}
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="text"
              className="add__clothes-button"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link
              to={location.pathname === "/profile" ? "/" : "/profile"}
              className="header__username"
            >
              {currentUser?.name ?? "User"}
            </Link>
            <div>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="profile-avatar"
                />
              ) : (
                <img
                  src={avatar}
                  alt="User avatar"
                  className="profile-avatar"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <button className="auth-button" onClick={onSignupClick}>
              Sign Up
            </button>
            <button className="auth-button" onClick={onLoginClick}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
