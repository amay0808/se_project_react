import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, location }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={require("../images/logo.svg").default} alt="logo" />
          </Link>
        </div>
        <div>{currentDate}</div>
        <div>{location}</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            type="text"
            className="add__clothes-button"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <Link to="/profile">Adrian</Link>
        <div>
          <img src={require("../images/avatar.svg").default} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
