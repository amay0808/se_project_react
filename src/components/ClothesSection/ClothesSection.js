import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onOpenAddItemModal, onSelectCard }) {
  const location = useLocation();

  // Debug logs
  console.log("=== ClothesSection Component Mounted ===");
  console.log("Initial Clothing Items in ClothesSection:", clothingItems);

  useEffect(() => {
    console.log("Clothing Items updated in ClothesSection:", clothingItems);
  }, [clothingItems]);

  const { currentUser } = useContext(CurrentUserContext);

  console.log("Current user:", currentUser);
  console.log("Clothing items:", clothingItems);

  if (!clothingItems || !currentUser) {
    return <div></div>;
  }

  return (
    <div className="clothes">
      <div className="clothes__header">
        {location.pathname === "/profile" && (
          <>
            <h2 className="clothes__title">Your Items</h2>
            <button
              className="clothes__btn"
              onClick={onOpenAddItemModal} // Change this line
            >
              + Add New
            </button>
          </>
        )}
      </div>
      <div className="cardCont">
        {clothingItems
          .filter((item) => item?.owner === currentUser?._id)
          .map((item, index) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
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
