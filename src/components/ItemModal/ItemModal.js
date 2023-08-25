import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Adjust the import path according to your project structure
import "./itemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn =
    selectedCard.owner && selectedCard.owner._id === currentUser._id;

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  const handleDelete = () => {
    console.log("Selected card details: ", selectedCard);
    onDelete(selectedCard._id);
  };

  return (
    <div className={`modal`}>
      <div className="item__modal-content">
        <button
          className="item__close-button"
          type="button"
          onClick={onClose}
        ></button>

        <img
          src={selectedCard.imageUrl || selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="item">{selectedCard.name}</div>
        <div className="weather__type-text">
          Weather type: {selectedCard.weather}
        </div>
        <button
          className={itemDeleteButtonClassName}
          type="button"
          onClick={handleDelete}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
