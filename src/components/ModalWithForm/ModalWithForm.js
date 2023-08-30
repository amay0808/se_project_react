import "./modalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
}) => {
  // console.log("ModalWithForm"); // Debugging log
  // console.log("ModalWithForm isOpen:", isOpen); // Debugging log

  if (!isOpen) {
    console.log("Modal is not open"); // Log if modal is not open
    return null;
  }

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={() => {
            console.log("Close button clicked"); // Log close button clicked
            onClose();
          }}
          className="modal__close-button"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form
          onSubmit={(e) => {
            console.log("Form submitted"); // Log form submission
            onSubmit(e);
          }}
        >
          {children}
          <button className="add__garment-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
