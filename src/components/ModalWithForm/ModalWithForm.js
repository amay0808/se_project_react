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
  console.log("ModalWithForm onClose type:", typeof onClose);

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
            e.preventDefault(); // Prevent the default form submission
            console.log("Form submitted"); // Log form submission

            // Execute the onSubmit function passed as a prop, which should return a Promise
            onSubmit(e)
              .then(() => {
                onClose(); // Close the modal only if the submission was successful
              })
              .catch((error) => {
                console.error("Error in form submission:", error);
                // Keep the modal open and display an error message
              });
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
