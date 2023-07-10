import React from "react";
import "../Profile/clothingsection.css";

function ClothesSection({ clothingItems, onCreateModal, onSelectCard }) {
  // Add onSelectCard prop
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your Items</h2>
        <button className="clothes-section__button" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      {clothingItems.map((item) => (
        <div key={item.id} className="card">
          <span className="card__text">{item.name}</span>
          <img
            className="card__image"
            src={item.imageUrl}
            alt={item.name}
            onClick={() => onSelectCard(item)} // Add this line
          />
        </div>
      ))}
    </div>
  );
}

export default ClothesSection;
