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
    console.log("Loading state active"); // Log when in loading state
    return <div>Loading...</div>;
  }
  return (
    <div className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your Items</h2>
        <button
          className="clothes__btn"
          onClick={() => {
            console.log("Add New button clicked in ClothesSection"); // Updated log when the add button is clicked
            onCreateModal();
          }}
        >
          + Add New
        </button>
      </div>
      <div className="cardCont">
        {clothingItems
          .filter((item) => {
            console.log(`Checking owner ID for item: `, item); // Log item being filtered
            return item.owner._id === currentUser._id;
          })
          .map((item, index) => {
            console.log(`Rendering item ${index} in ClothesSection: `, item); // Updated log for each item being rendered
            return (
              <div key={item._id} className="card">
                <span className="card__text">{item.name}</span>
                <img
                  className="card__image"
                  src={item.imageUrl}
                  alt={item.name}
                  onClick={() => {
                    console.log(`Item clicked in ClothesSection: `, item); // Updated log for the clicked item
                    onSelectCard(item);
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ClothesSection;
