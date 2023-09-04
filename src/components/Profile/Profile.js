import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddItemModal from "../AddItemModal/AddItemModal";

function Profile({
  clothingItems,
  onAddItem,
  onSelectCard,
  currentUser,
  onSignOut,
}) {
  // Debug log
  console.log("=== Profile Component Mounted ===");
  console.log("Initial clothingItems in Profile:", clothingItems);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false); // New state for add new item modal

  // Debug log to capture updates
  useState(() => {
    console.log("clothingItems updated in Profile:", clothingItems);
  }, [clothingItems]);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const openAddNewItemModal = () => {
    setIsAddNewItemModalOpen(true); // New function to open the modal
  };

  const closeAddNewItemModal = () => {
    setIsAddNewItemModalOpen(false); // New function to close the modal
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
      />
      <AddItemModal
        isOpen={isAddNewItemModalOpen}
        handleCloseModal={closeAddNewItemModal}
        onAddItem={onAddItem}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onAddNewItem={openAddNewItemModal}
        onSelectCard={onSelectCard}
      />
    </div>
  );
}

export default Profile;
