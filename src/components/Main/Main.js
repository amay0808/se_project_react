import { useContext, useMemo } from "react";
import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./main.css";
import { CurrentTemperatureUnitContext } from "../Contexts/CurrentTemperatureUnitContexts";

function Main({ weatherTemp, onSelectCard }) {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(CurrentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[CurrentTemperatureUnit] || 999;
  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [temp]);
  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLocaleLowerCase() === weatherType;
  });
  console.log(filteredCards);
  return (
    <main className="main">
      <WeatherCard day={false} type="night" weatherTemp={temp} />
      <section className="card_section" id="card-section">
        Today is {temp} F / You may want to wear:
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
