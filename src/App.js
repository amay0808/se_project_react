import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

function App() {
  const weatherTemp = "75°F";
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
      <ModalWithForm title="New Garment">These are children</ModalWithForm>
    </div>
  );
}
export default App;
