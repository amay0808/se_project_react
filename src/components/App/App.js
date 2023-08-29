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
import { getItems, postItem, deleteItem } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
    console.log("Opening create modal");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    console.log("Closing active modal");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (token) {
  //     setIsLoggedIn(true);
  //     console.log("User already logged in");
  //   }
  // }, []);
  const handleLogin = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
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
      console.log("Received data:", data);

      if (data.token) {
        console.log("Token exists:", data.token);
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);

        const userDetail = await fetch("http://localhost:3001/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userDetailData = await userDetail.json();
        console.log("User detail:", userDetailData);
        setCurrentUser(userDetailData); // Assuming this contains the details you want
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (token) {
  //     setIsLoggedIn(true); // Set this after validating the token successfully.
  //     fetch("http://localhost:3001/user/me", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data && data.valid) {
  //           // <-- Check if data exists and is valid
  //           setIsLoggedIn(true);
  //           setCurrentUser(data.user);
  //         } else {
  //           localStorage.removeItem("jwt");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Failed to validate token:", error);
  //         localStorage.removeItem("jwt");
  //       });
  //   }
  // }, []);

  const handleRegister = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 409) {
          alert("Username or Email already exists");
        } else {
          throw new Error("Network response was not ok");
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error occurred while creating user:", error);

      throw error;
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (token) {
  //     // API call to validate the token
  //     fetch("http://localhost:3001/user/me", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.valid) {
  //           setIsLoggedIn(true);
  //         } else {
  //           // If the token is invalid, remove it from local storage
  //           localStorage.removeItem("jwt");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Failed to validate token:", error);
  //         localStorage.removeItem("jwt");
  //       });
  //   }
  // }, []);
  useEffect(() => {
    // console.log("Initial currentUser:", currentUser);
    // Attempt to get token from local storage
    const token = localStorage.getItem("jwt");

    // If token exists, validate it and set user data
    if (token) {
      fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to validate token");
          }
          return res.json();
        })
        .then((data) => {
          // Check if the data returned is valid (customize this based on your API's response)
          console.log("Token validation data:", data);
          if (data && data.valid) {
            setIsLoggedIn(true);
            setCurrentUser(data.user);
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
  }, []);
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
    postItem(values)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseModal();
      })
      .catch((error) =>
        console.error("Error occurred while adding item:", error)
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
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <div className="app-container">
          <Header
            onCreateModal={handleCreateModal}
            onSignupClick={() => setActiveModal("signup")}
            onLoginClick={() => setActiveModal("login")}
            location="Merced"
            currentUser={currentUser} // <-- pass currentUser down here
          />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
          </Switch>
          <Footer />
          {/* Render the LoginModal component */}
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={() => setActiveModal("")}
            onLogin={handleLogin}
          />

          {/* AddItemModal and ItemModal */}
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
            onSignup={handleRegister} // <-- Pass handleRegister to SignUpModal
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
