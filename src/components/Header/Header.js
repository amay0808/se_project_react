import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onCreateModal, onSignupClick, onLoginClick, location }) => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
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
            <button onClick={onSignupClick}>Sign Up</button>
            <button onClick={onLoginClick}>Login</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
