import logo from "./logo.svg";
import "./App.css";
import ItemModal from "./ItemModal/ItemModal";
import Header from "./Header/Header";
import WeatherCard from "./WeatherCard/WeatherCard";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={false} type="night" />
        <section id="card-section"> card section</section>
      </main>
    </div>
  );
}

export default App;
