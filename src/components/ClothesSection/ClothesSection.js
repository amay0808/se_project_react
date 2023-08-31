import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems = [], onAddNewItem, onSelectCard }) {
  // Renamed onCreateModal to onAddNewItem
  console.log("=== ClothesSection Component Mounted ===");
  console.log("Initial Clothing Items in ClothesSection:", clothingItems);

  useEffect(() => {
    console.log("Clothing Items updated in ClothesSection:", clothingItems);
  }, [clothingItems]);

  const { currentUser } = useContext(CurrentUserContext);

  console.log("Current user:", currentUser);
  console.log("Clothing items:", clothingItems);

  if (!clothingItems || !currentUser) {
    console.log("Loading state active");
    return <div>Loading...</div>;
  }

  return (
    <div className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your Items</h2>
        <button
          className="clothes__btn"
          onClick={() => {
            console.log("Add New button clicked in ClothesSection");
            if (typeof onAddNewItem === "function") {
              // Check if onAddNewItem is a function
              onAddNewItem(); // Invoke it
            }
          }}
        >
          + Add New
        </button>
      </div>
      <div className="cardCont">
        {clothingItems
          .filter((item) => {
            console.log("Item:", item, "Item Owner:", item?.owner); // Debugging line
            return item?.owner?._id === currentUser?._id;
          })
          .map((item, index) => (
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

// Add PropTypes
ClothesSection.propTypes = {
  clothingItems: PropTypes.array,
  onAddNewItem: PropTypes.func, // Renamed onCreateModal to onAddNewItem
  onSelectCard: PropTypes.func,
};

// Add Default Props
ClothesSection.defaultProps = {
  onAddNewItem: () => console.log("No onAddNewItem function provided"), // Renamed onCreateModal to onAddNewItem
};

export default ClothesSection;
