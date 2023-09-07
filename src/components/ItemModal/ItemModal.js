import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./itemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const { currentUser } = useContext(CurrentUserContext);

  console.log(
    "Current User ID:",
    currentUser ? currentUser.id : "No current user"
  );
  console.log(
    "Selected Card Owner ID:",
    selectedCard && selectedCard.owner ? selectedCard.owner.id : "No card owner"
  );

  // Check if currentUser, selectedCard, and selectedCard.owner are defined before comparing IDs
  const isOwn =
    currentUser &&
    selectedCard &&
    selectedCard.owner &&
    currentUser.id === selectedCard.owner.id;

  console.log("Is owner:", isOwn); // Debugging line

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  const handleDelete = () => {
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
          className="modal-image"
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
