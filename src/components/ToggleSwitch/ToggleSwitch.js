import React, { useContext } from "react";
import "../ToggleSwitch/toggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { CurrentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={`switch__slider ${
          CurrentTemperatureUnit === "F"
            ? "switch__slider-F"
            : "switch__slider-C"
        }`}
      ></span>
      <p
        className={`switch__temp-F ${
          CurrentTemperatureUnit === "F" ? "switch__active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          CurrentTemperatureUnit === "C" ? "switch__active" : ""
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
