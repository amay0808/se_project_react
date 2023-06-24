import "./ModalWithForm.css";
import closebutton from "../images/close.svg";
const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__close-button">
          <img src={closebutton} alt="close-button" />
        </button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button type="submit"> {buttonText}</button>
      </div>
    </div>
  );
};
export default ModalWithForm;
