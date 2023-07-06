import "./itemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  console.log(`itemModal`);

  const handleDelete = () => {
    onDelete(selectedCard);
  };

  return (
    <div className={`modal`}>
      <div className="item__modal-content">
        <button
          className="item__close-button"
          type="button"
          onClick={onClose}
        ></button>

        <img src={selectedCard.link} alt={selectedCard.name} />
        <div>{selectedCard.name}</div>
        <div>Weather type: {selectedCard.weather}</div>
        <button
          className="item__delete-button"
          type="button"
          onClick={handleDelete}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
