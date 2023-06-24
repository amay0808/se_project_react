import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
} from "./Header/utils/weatherapi";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setselectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setselectedCard(card);
  };
  useEffect(() => {
    getForecastWeather().then((data) => {
      console.log(data);
      const temperature = parseWeatherData(data);
      setTemp(temperature);
    });
  }, []);
  console.log(temp);
  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <label>
            name <input type="text" name="name" minLength="1" maxLength="30" />
          </label>
          <label>
            Image <input type="url" name="name" minLength="1" maxLength="30" />
          </label>
          <p>Select the weather type: </p>
          <div>
            <div>
              <input type="radio" id="hot" value="hot" />
              <label>Hot</label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" />
              <label>Warm</label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
