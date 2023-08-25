import React, { useContext } from "react";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Replace with the actual path to your context

function ClothesSection({ clothingItems, onCreateModal, onSelectCard }) {
  // Get the current user from your context
  const { currentUser } = useContext(CurrentUserContext);

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
          .filter((item) => item.owner._id === currentUser._id) // Show only items owned by current user
          .map((item) => (
            <div key={item._id} className="card">
              {" "}
              {/* Make sure to use _id as key if that's what your item objects use */}
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
