import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./header.css";

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
          <img src="../images/logo.svg" alt="logo" />
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
        <div className="profile__name">Adrian Mayfield </div>
        <div>
          <img src="../images/avatar.svg" alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
