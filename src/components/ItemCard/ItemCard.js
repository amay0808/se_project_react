import React, { useState, useEffect, useContext } from "react";
import { addCardLike, removeCardLike } from "../../utils/api";
import "./itemCard.css";
import LikeButtonIcon from "../images/Like-button.svg";
import LikedButtonIcon from "../images/Liked.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ onSelectCard, item }) {
  const { currentUser } = useContext(CurrentUserContext);

  const initialIsLiked =
    item && item.likes && currentUser
      ? item.likes.some((_id) => _id === currentUser._id)
      : false;

  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    setIsLiked(
      item && item.likes && currentUser
        ? item.likes.some((_id) => _id === currentUser._id)
        : false
    );
  }, [item, currentUser]);

  const handleLikeClick = async () => {
    if (!currentUser || !item || !item._id) return;

    try {
      if (isLiked) {
        await removeCardLike(item._id);
      } else {
        await addCardLike(item._id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  if (!item || !item.likes) {
    return <div>Error: Item is not properly defined.</div>;
  }

  const currentLikeIcon = isLiked ? LikedButtonIcon : LikeButtonIcon;

  return (
    <div className="card-container">
      <div className="card">
        <div className="card__top-section">
          <span className="card__text-background">{item.name}</span>
          {currentUser && (
            <button
              className={isLiked ? "like-button active" : "like-button"}
              onClick={handleLikeClick}
            >
              <img
                src={currentLikeIcon}
                alt="like-button"
                className="like-icon"
              />
            </button>
          )}
        </div>

        <img
          src={item.imageUrl}
          className="card__image"
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
    </div>
  );
}

export default ItemCard;
