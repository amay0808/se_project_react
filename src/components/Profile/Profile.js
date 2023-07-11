//Profile.js
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ user, clothingItems, onCreateModal, onSelectCard }) {
  return (
    <div className="profile-container">
      <ClothesSection
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
      />
    </div>
  );
}

export default Profile;
