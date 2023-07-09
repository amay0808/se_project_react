import React from "react";
import "../Profile/ClothingSection.css";

function ClothesSection({ clothingItems }) {
  return (
    <div>
      <h2>Clothing Items</h2>
      {clothingItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <img src={item.imageUrl} alt={item.name} />
        </div>
      ))}
    </div>
  );
}

export default ClothesSection;
