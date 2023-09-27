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
    console.log("Modal is not open");
    return null;
  }

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={() => {
            console.log("Close button clicked");
            onClose();
          }}
          className="modal__close-button"
        ></button>
        <h3 className="modal__title">{title}</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");

            const result = onSubmit(e);
            if (result && typeof result.then === "function") {
              result
                .then(() => {
                  console.log("onSubmit promise resolved");
                })
                .catch((err) => {
                  console.error("Error occurred in onSubmit promise:", err);
                });
            } else {
              console.warn("onSubmit did not return a promise");
            }
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
