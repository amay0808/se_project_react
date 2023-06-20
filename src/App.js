import logo from "./logo.svg";
import "./App.css";
import ItemModal from "./ItemModal/ItemModal";
import Header from "./Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main>
        <section className="weather" id="weather">
          <div className="weather_info">75F</div>

          <img src="/images/day/sunny.svg" className="weather__image" />
        </section>
        <section id="card-section"> card section</section>
      </main>
    </div>
  );
}

export default App;
