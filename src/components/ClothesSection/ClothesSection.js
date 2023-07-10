import React from "react";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCreateModal, onSelectCard }) {
  return (
    <div className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your Items</h2>
        <button className="clothes__btn" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      <div className="cardCont">
        {clothingItems.map((item) => (
          <div key={item.id} className="card">
            <span className="card__text">{item.name}</span>
            <img
              className="card__image"
              src={item.imageUrl}
              alt={item.name}
              onClick={() => onSelectCard(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
