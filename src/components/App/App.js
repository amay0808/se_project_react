import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";
import { getForecastWeather, parseWeatherData } from "../Utils/Weatherapi";

function App() {
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
      <Header onCreateModal={handleCreateModal} location="Merced" />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <fieldset className="input__group">
            <label htmlFor="name" className="input__label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form__input"
              placeholder="Name"
            />
            <label htmlFor="url" className="input__label">
              Image
            </label>
            <input
              id="url"
              type="url"
              className="form__input"
              placeholder="Image URL"
            />
          </fieldset>
          <fieldset className="input__group">
            <span className="input__label">Select the weather type:</span>
            <div className="radio__button">
              <input
                type="radio"
                name="weatherType"
                id="weather-hot"
                className="radio__input"
              />
              <label htmlFor="weather-hot" className="radio__label">
                Hot
              </label>
            </div>
            <div className="radio__button">
              <input
                type="radio"
                name="weatherType"
                id="weather-warm"
                className="radio__input"
              />
              <label htmlFor="weather-warm" className="radio__label">
                Warm
              </label>
            </div>
            <div className="radio__button">
              <input
                type="radio"
                name="weatherType"
                id="weather-cold"
                className="radio__input"
              />
              <label htmlFor="weather-cold" className="radio__label">
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;