import React, { useState, useEffect } from "react";
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
import { getForecastWeather, parseWeatherData } from "../../utils/weatherapi";

import {
  getItems,
  postItem,
  deleteItem,
  handleLogin,
  handleRegister,
} from "../../utils/api";
import "./app.css";
import { getUserDetail } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0); // Uncomment temp state
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoginCallback = (userData) => {
    handleLogin(userData, setIsLoggedIn, setCurrentUser, setClothingItems);
  };

  const handleRegisterCallback = (userData) => {
    handleRegister(userData, setIsLoggedIn, setCurrentUser);
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

  const handleSubmit = (request) => {
    setIsLoading(true);

    // Ensure that 'request' is a function and it returns a promise
    if (typeof request === "function") {
      request()
        .then(handleCloseModal)
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => setIsLoading(false));
    } else {
      // Handle the case where 'request' is not a function returning a promise
      console.error("Invalid request function");
      setIsLoading(false);
    }
  };
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
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
    const token = localStorage.getItem("jwt");

    if (token) {
      getUserDetail(token)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setCurrentUser(data);
          } else {
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
      })
      .catch((error) =>
        console.error("Error occurred while getting items:", error)
      );
  }, [isLoggedIn]);

  useEffect(() => {
    getForecastWeather() // Fetch weather data
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature); // Set the temperature in Fahrenheit
      })
      .catch((error) =>
        console.error("Error occurred while getting forecast weather:", error)
      );
  }, []);

  const onAddItem = (values) => {
    handleSubmit(() =>
      postItem(values).then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
      })
    );
  };

  const [locationName, setLocationName] = useState(""); // Define locationName state

  useEffect(() => {
    (async () => {
      try {
        const weatherData = await getForecastWeather();
        setLocationName(weatherData.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    })();
  }, []);

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
            location={locationName} // Pass locationName here
          />
          <Switch>
            <Route path="/profile">
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
            onLogin={handleLoginCallback}
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
            onSignup={handleRegisterCallback}
            buttonText={isLoading ? "Registering..." : "Register"}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
