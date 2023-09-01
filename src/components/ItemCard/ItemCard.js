import React, { useState, useEffect } from "react";
import { addCardLike, removeCardLike } from "../../utils/api";
import "./itemCard.css";

function ItemCard({ onSelectCard, item, currentUser }) {
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

  const itemLikeButtonClassName = isLiked
    ? "like-button active"
    : "like-button";

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
