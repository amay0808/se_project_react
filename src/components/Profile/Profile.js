import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Profile.css";
import AddItemModal from "../AddItemModal/AddItemModal";

function Profile({
  clothingItems,
  onAddItem,
  onSelectCard,
  currentUser,
  onSignOut,
}) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false); // New state for add new item modal

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
