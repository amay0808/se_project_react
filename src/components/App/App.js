import React, { useState, useEffect } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherapi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Sidebar from "../SideBar/SideBar";
import { getItems, postItem, deleteItem } from "../../utils/api";
import "./app.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal"; // import RegisterModal if not imported
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  // State Hooks
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function Declarations
  const handleCreateModal = () => setActiveModal("create");
  const handleCloseModal = () => setActiveModal("");
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Mock function for user registration
  const handleRegister = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // TODO: Perform login here with the registered data
      handleCloseModal(); // Close the modal after successful registration
      return data;
    } catch (error) {
      console.error("Error occurred while creating user:", error);
      throw error;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      // API call to validate the token
      fetch("http://localhost:3001/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            // Assuming the API returns { valid: true } if the token is valid
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error("Failed to validate token:", error);
          localStorage.removeItem("jwt"); // Removing invalid token
        });
    }
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((error) =>
        console.error("Error occurred while getting forecast weather:", error)
      );
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) =>
        console.error("Error occurred while getting items:", error)
      );
  }, []);

  const onAddItem = (values) => {
    postItem(values)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseModal();
      })
      .catch((error) =>
        console.error("Error occurred while adding item:", error)
      );
  };

  const onDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        handleCloseModal();
      })
      .catch((error) =>
        console.error("Error occurred while deleting item:", error)
      );
  };
  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      {/* CurrentUserContext.Provider added here */}
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <div className="app-container">
          <Header onCreateModal={handleCreateModal} location="Merced" />
          <Switch>{/* ... (existing Routes and JSX content) */}</Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDelete={onDeleteItem}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
