import "./modalWithForm.css";
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
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form>{children}</form>
        <button className="add__garment-button" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ModalWithForm;
