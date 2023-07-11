// Main.js
import { useContext, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  console.log("Temperature:", temp);
  console.log("currenttemperatureunit:", currentTemperatureUnit);

  const weatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
    return null;
  }, [currentTemperatureUnit, temp]);

  console.log("Weather type:", weatherType);
  console.log("Clothing items:", clothingItems); // Log the clothing items received as props

  const filteredCards = clothingItems.filter((item) => {
    return (
      item.weather &&
      weatherType &&
      item.weather.toLowerCase() === weatherType.toLowerCase()
    );
  });

  console.log("Filtered clothing items:", filteredCards);

  return (
    <main className="main">
      <WeatherCard day={false} type="night" weatherTemp={temp} />
      <section className="card_section" id="card-section">
        Today is {temp} {currentTemperatureUnit} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item, index) => (
            <ItemCard key={index} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
