import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Find the correct image based on 'day' and 'type'
  const imageSrc = weatherOptions.find((i) => i.day === day && i.type === type);
  const imageSrcUrl = imageSrc?.url || "";

  // Helper function to display the correct temperature unit
  const displayTemperatureUnit = () => {
    if (currentTemperatureUnit === "F") {
      return "F";
    } else if (currentTemperatureUnit === "C") {
      return "C";
    }
    return "";
  };

  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {weatherTemp} {displayTemperatureUnit()}
      </div>
      <img
        src={imageSrcUrl}
        className="weather__image"
        alt="weather condition"
      />
    </section>
  );
};

export default WeatherCard;
