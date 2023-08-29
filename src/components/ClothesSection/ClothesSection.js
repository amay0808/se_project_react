import React, { useContext, useEffect } from "react";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems = [], onCreateModal, onSelectCard }) {
  console.log("=== ClothesSection Component Mounted ==="); // Log when the component is mounted
  console.log("Initial Clothing Items in ClothesSection:", clothingItems); // Log the initial items

  useEffect(() => {
    console.log("Clothing Items updated in ClothesSection:", clothingItems); // Log when items get updated
  }, [clothingItems]);
  const { currentUser } = useContext(CurrentUserContext);

  // Debugging logs
  console.log("Current user:", currentUser);
  console.log("Clothing items:", clothingItems);

  if (!clothingItems || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your Items</h2>
        <button className="clothes__btn" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      <div className="cardCont">
        {clothingItems
          .filter((item) => item.owner._id === currentUser._id)
          .map((item) => (
            <div key={item._id} className="card">
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
