import "./itemModal.css";
const ItemModal = ({ selectedCard, onClose }) => {
  console.log(`itemModal`);
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
      </div>
    </div>
  );
};
export default ItemModal;
