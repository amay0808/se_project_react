// App.js
import { getForecastWeather, parseWeatherData } from "../../utils/weatherapi";
import { useState, useEffect } from "react";
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

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <div className="app-container">
        <Header onCreateModal={handleCreateModal} location="Merced" />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <div>
              <Sidebar
                user={{ username: "Adrian M", avatar: "../images/avatar.svg" }}
              />
              <div className="clothing-container">
                <Profile
                  user={{
                    username: "Adrian M",
                    avatar: "../images/avatar.svg",
                  }}
                  clothingItems={clothingItems}
                  onCreateModal={handleCreateModal}
                  onSelectCard={handleSelectedCard}
                />
                <ClothesSection
                  clothingItems={clothingItems}
                  onCreateModal={handleCreateModal}
                  onSelectCard={handleSelectedCard}
                />
              </div>
            </div>
          </Route>
        </Switch>
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
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
