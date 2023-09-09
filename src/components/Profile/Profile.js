import React, { useState, useEffect } from "react"; // added useEffect for debug log
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({
  clothingItems,
  onSelectCard,
  currentUser,
  onSignOut,
  handleSubmit,
  onOpenAddItemModal, // Add this line
}) {
  console.log("=== Profile Component Mounted ===");
  console.log("Initial clothingItems in Profile:", clothingItems);

  useEffect(() => {
    console.log("clothingItems updated in Profile:", clothingItems);
  }, [clothingItems]);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="profile-container">
      <SideBar
        user={currentUser}
        openEditProfileModal={openEditProfileModal}
        onSignOut={onSignOut}
      />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={closeEditProfileModal}
        handleSubmit={handleSubmit}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        currentUser={currentUser}
        onOpenAddItemModal={onOpenAddItemModal} // Add this line
      />
    </div>
  );
}

export default Profile;
