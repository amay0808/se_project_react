import "./Header.css";

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
          <img src={require("../images/logo.svg").default} alt="logo" />
        </div>
        <div>{currentDate}</div>
        <div>{location}</div>
      </div>
      <div className="header__avatar-logo">
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
          <img src={require("../images/avatar.svg").default} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
