import { defaultClothingItems } from "../Header/utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp }) {
  return (
    <main className="main">
      <WeatherCard day={false} type="night" weatherTemp={weatherTemp} />
      Today is {weatherTemp}F / You may want to wear:
      <section className="card_section" id="card-section">
        <div className="card_items">
          {defaultClothingItems.map((item) => (
            <ItemCard item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
