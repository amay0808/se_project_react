import React from "react";
import "./itemCard.css";

function ItemCard({ onSelectCard, item }) {
  console.log("Rendering ItemCard with item:", item);
  return (
    <div className="card-container">
      <div className="card">
        <span className="card__text">{item.name}</span>
        <img
          src={item.imageUrl || item.link}
          className="card__image"
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
    </div>
  );
}

export default ItemCard;
