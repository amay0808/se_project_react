import React, { useContext, useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./header.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatar from "../images/avatar.svg";
import logo from "../images/logo.svg";
import { getForecastWeather } from "../../utils/weatherapi"; // Remove parseWeatherData import

const Header = ({ onCreateModal, onSignupClick, onLoginClick, location }) => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [locationName, setLocationName] = useState(""); // Define locationName state

  useEffect(() => {
    (async () => {
      try {
        const weatherData = await getForecastWeather();
        setLocationName(weatherData.name); // Set locationName
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    })();
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div>{`${currentDate},`}</div>
        <div>{locationName}</div>
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
