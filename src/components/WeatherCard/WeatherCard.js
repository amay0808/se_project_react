import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const imageSrc = weatherOptions.find((i) => i.day === day && i.type === type);
  const imageSrcUrl = imageSrc?.url || "";

  const displayTemperatureUnit = () => {
    if (CurrentTemperatureUnit === "F") {
      return "F";
    } else if (CurrentTemperatureUnit === "C") {
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
