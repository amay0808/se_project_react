import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, onAddNewItem, onSelectCard }) {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your Items</h2>
        <button
          className="clothes__btn"
          onClick={() => {
            if (typeof onAddNewItem === "function") {
              onAddNewItem();
            }
          }}
        >
          + Add New
        </button>
      </div>
      <div className="cardCont">
        {clothingItems
          .filter((item) => item?.owner === currentUser?._id)
          .map((item, index) => (
            <div key={item._id} className="card">
              <span className="card__text">{item.name}</span>
              <img
                className="card__image"
                src={item.imageUrl}
                alt={item.name}
                onClick={() => {
                  if (typeof onSelectCard === "function") {
                    onSelectCard(item);
                  }
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      imageUrl: PropTypes.string,
      owner: PropTypes.string,
    })
  ),
  onAddNewItem: PropTypes.func,
  onSelectCard: PropTypes.func,
};

ClothesSection.defaultProps = {
  onAddNewItem: () => console.warn("No onAddNewItem function provided"),
};

export default ClothesSection;
