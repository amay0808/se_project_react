import React, { useState, useEffect } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherapi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import {
  getItems,
  postItem,
  deleteItem,
  handleLogin,
  handleRegister,
} from "../../utils/api";
import "./app.css";
import { getUserDetail } from "../../utils/auth";
// import { handleLogin, handleRegister } from "../../utils/api"; // Add these imports

// const baseUrl = "http://localhost:3001"; // Define the base URL

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // For loading state

  // Function to pass as callback to handleLogin
  const handleLoginCallback = (userData) => {
    handleLogin(
      userData,
      setIsLoggedIn, // Callback to update isLoggedIn state
      setCurrentUser, // Callback to update currentUser state
      setClothingItems // Callback to update clothingItems state
    );
  };
  const handleRegisterCallback = (userData) => {
    handleRegister(
      userData,
      setIsLoggedIn, // Callback to update isLoggedIn state
      setCurrentUser // Callback to update currentUser state
    );
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);
  // Universal handleSubmit function
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCreateModal = () => {
    console.log("handleCreateModal() called in App.js"); // Added log
    setActiveModal("create");
    console.log("Opening create modal");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    console.log("Closing active modal");
  };

  const handleSelectedCard = (card) => {
    console.log("Received card in handleSelectedCard: ", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const currentUserContextValue = {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  useEffect(() => {
    // Attempt to get token from local storage
    const token = localStorage.getItem("jwt");
    console.log("Retrieved token:", token);

    // If token exists, validate it and set user data using the getUserDetail function
    if (token) {
      getUserDetail(token)
        .then((data) => {
          // Check if the data returned is valid (customize this based on your API's response)
          console.log("Token validation data:", data);
          if (data) {
            // You might want to check other conditions, for example, if data.valid exists etc.
            setIsLoggedIn(true);
            setCurrentUser(data);
          } else {
            // If the token is invalid, remove it from local storage
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Failed to validate token:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
        console.log("Current clothing items: ", items);
      })
      .catch((error) =>
        console.error("Error occurred while getting items:", error)
      );
  }, [isLoggedIn]);
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        console.log("Setting temperature to:", temperature); // Debugging log
        setTemp(temperature);
      })
      .catch((error) =>
        console.error("Error occurred while getting forecast weather:", error)
      );
  }, []);

  const onAddItem = (values) => {
    // Use handleSubmit to call this logic
    handleSubmit(() =>
      postItem(values).then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
      })
    );
  };

  const onDeleteItem = (_id) => {
    deleteItem(_id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== _id)
        );
        handleCloseModal();
      })
      .catch((error) =>
        console.error("Error occurred while deleting item:", error)
      );
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <div className="app-container">
          <Header
            onCreateModal={handleCreateModal}
            onSignupClick={() => setActiveModal("signup")}
            onLoginClick={() => setActiveModal("login")}
            location="Merced"
            currentUser={currentUser}
          />
          <Switch>
            <Route path="/profile">
              {console.log("Profile Route Accessed")}
              <Profile
                currentUser={currentUser}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                onAddItem={onAddItem}
                onSignOut={handleSignOut}
              />
            </Route>
            <Route path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                onAddNewItem={onAddItem}
              />
            </Route>
          </Switch>
          <Footer />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLoginCallback} // Pass the callback function
            buttonText={isLoading ? "Logging in..." : "Login"}
          />
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
          <RegisterModal
            onClose={handleCloseModal}
            isOpen={activeModal === "signup"}
            onSignup={handleRegisterCallback} // Pass the callback function
            buttonText={isLoading ? "Registering..." : "Register"}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
