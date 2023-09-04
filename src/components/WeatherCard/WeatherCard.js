import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Match the correct image based on 'day' and 'type'
  const imageSrc = weatherOptions.find((i) => i.day === day && i.type === type);
  console.log("Day: ", day);
  console.log("Type: ", type);
  console.log("Matched image source object: ", imageSrc);

  const imageSrcUrl = imageSrc?.url || "";
  console.log("Image source URL: ", imageSrcUrl);

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
      {imageSrcUrl && (
        <img
          src={imageSrcUrl}
          className="weather__image"
          alt="weather condition"
        />
      )}
    </section>
  );
};

export default WeatherCard;
