import React from "react";
import "../Profile/clothingsection.css";

function ClothesSection({ clothingItems }) {
  return (
    <div className="card-container">
      <h2>Clothing Items</h2>
      {clothingItems.map((item) => (
        <div key={item.id} className="card">
          <span className="card__text">{item.name}</span>
          <img className="card__image" src={item.imageUrl} alt={item.name} />
        </div>
      ))}
    </div>
  );
}

export default ClothesSection;
