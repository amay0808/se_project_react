import React, { useState } from "react";

// RegisterModal.js
const RegisterModal = ({ handleCloseModal, isOpen, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    isOpen && (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Avatar URL"
            name="avatar"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <button type="button" onClick={handleCloseModal}>
            Cancel
          </button>
        </form>
      </div>
    )
  );
};
export default RegisterModal;
