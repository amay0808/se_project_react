import { useContext, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./main.css";
import { CurrentTemperatureUnitContext } from "../Contexts/CurrentTemperatureUnitContexts";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[CurrentTemperatureUnit] || 999;
  const weatherType = useMemo(() => {
    if (CurrentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else if (CurrentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  }, [CurrentTemperatureUnit, temp]);
  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLocaleLowerCase() === weatherType;
  });
  console.log(filteredCards);
  return (
    <main className="main">
      <WeatherCard day={false} type="night" weatherTemp={temp} />
      <section className="card_section" id="card-section">
        Today is {temp} {CurrentTemperatureUnit} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item, index) => (
            <ItemCard
              key={item.id || index}
              item={item}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
