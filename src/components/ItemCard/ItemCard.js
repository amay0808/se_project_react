import React from "react";
import "./ItemCard.css";

function ItemCard({ onSelectCard, item }) {
  return (
    <div className="card-container">
      <div className="card">
        <span className="card__text">{item.name}</span>
        <img
          src={item.link}
          className="card__image"
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
    </div>
  );
}

export default ItemCard;
