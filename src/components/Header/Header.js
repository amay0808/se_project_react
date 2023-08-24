import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import the context

const Header = ({ onCreateModal, location }) => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext); // Get the current user and login status
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const avatarPlaceholder =
    currentUser && currentUser.username
      ? currentUser.username[0].toUpperCase()
      : "";

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={require("../images/logo.svg").default} alt="logo" />
        </Link>
        <div>{currentDate}</div>
        <div>{location}</div>
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
            <Link to="/profile">{currentUser.username || "User"}</Link>
            <div>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="avatar" />
              ) : (
                <div className="avatar-placeholder">{avatarPlaceholder}</div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
