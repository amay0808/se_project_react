import { getForecastWeather, parseWeatherData } from "../../utils/weatherapi";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Sidebar from "../Sidebar/Sidebar";
import ClothingSection from "../Profile/Profile";
import { getItems, postItem, deleteItem } from "../../utils/api";
import "./app.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setselectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);
  const [CurrentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setselectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (CurrentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    } else if (CurrentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        console.log(data);
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error occurred while getting forecast weather:", error);
      });
  }, []);

  console.log(CurrentTemperatureUnit);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
        console.log(items);
      })
      .catch((error) => {
        console.error("Error occurred while getting items:", error);
      });
  }, []);

  const onAddItem = (values) => {
    postItem(values)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error occurred while adding item:", error);
      });
  };

  const onDeleteItem = (id) => {
    console.log(id);
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error occurred while deleting item:", error);
      });
  };

  return (
    <div className="app-container">
      <CurrentTemperatureUnitContext.Provider
        value={{ CurrentTemperatureUnit, handleToggleSwitchChange }}
      >
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
                user={{ avatar: "../images/avatar.svg", username: "Adrian M" }}
              />
              <div className="clothing-container">
                <ClothingSection
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
