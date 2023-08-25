import React, { useState, useEffect } from "react";
import { addCardLike, removeCardLike } from "../../utils/api";
import "./itemCard.css";

function ItemCard({ onSelectCard, item, currentUser }) {
  const initialIsLiked =
    item && item.likes && currentUser
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  const [isLiked, setIsLiked] = useState(initialIsLiked); // Declare useState at the top-level, unconditionally

  useEffect(() => {
    if (item && item.likes && currentUser) {
      setIsLiked(item.likes.some((id) => id === currentUser._id));
    } else {
      setIsLiked(false);
    }
  }, [item, item?.likes, currentUser?._id, currentUser]); // Add item to dependency list

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

  const itemLikeButtonClassName = isLiked
    ? "like-button active"
    : "like-button";
  console.log("Current User:", currentUser);
  return (
    <div className="card-container">
      <div className="card">
        <span className="card__text">{item.name}</span>
        {currentUser && (
          <button className={itemLikeButtonClassName} onClick={handleLikeClick}>
            {isLiked ? "Disliked" : "Like"}
          </button>
        )}
        <img
          src={item.imageUrl || item.link}
          className="card__image"
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
    </div>
  );
}

export default ItemCard;
