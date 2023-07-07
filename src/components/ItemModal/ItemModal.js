import "./itemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  console.log(`itemModal`);
  const handleDelete = () => {
    console.log(selectedCard);
    onDelete(selectedCard.id);
  };

  return (
    <div className={`modal`}>
      <div className="item__modal-content">
        <button
          className="item__close-button"
          type="button"
          onClick={onClose}
        ></button>

        <img
          src={selectedCard.imageUrl || selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="item">{selectedCard.name}</div>
        <div className="weather__type-text">
          Weather type: {selectedCard.weather}
        </div>
        <button
          className="item__delete-button"
          type="button"
          onClick={handleDelete} // Call handleDelete here
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
