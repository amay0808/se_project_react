import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const [weatherType, setWeatherType] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeatherType(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submit:", { name, imageUrl: link, weather: weatherType }); // Log the submitted form data
    onAddItem({ name, imageUrl: link, weather: weatherType });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="input__group">
        <label htmlFor="name" className="input__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form__input"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="url" className="input__label">
          Image
        </label>
        <input
          id="url"
          type="url"
          className="form__input"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </fieldset>
      <fieldset className="input__group">
        <span className="input__label">Select the weather type:</span>
        <div className="radio__button">
          <input
            type="radio"
            name="weatherType"
            id="weather-hot"
            value="hot"
            className="radio__input"
            onChange={handleWeatherChange}
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
            value="warm"
            className="radio__input"
            onChange={handleWeatherChange}
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
            value="cold"
            className="radio__input"
            onChange={handleWeatherChange}
          />
          <label htmlFor="weather-cold" className="radio__label">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
