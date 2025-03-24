import React, { useState } from "react";
import CarList from "./components/CarList";
import cars from "./data/cars.json";
import "./styles/App.css";
import { Car } from "./types/Car";
import AddCarForm from "./components/CarForm";

const App: React.FC = () => {
  const [carsList, setCarsList] = useState<Car[]>(cars);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const handleAddCar = (newCar: Car) => {
    setCarsList((prevCars) => [...prevCars, newCar]);
    setIsModalOpen(false); // Cierra el modal después de agregar el carro
  };

  return (
    <div className="app">
      <div className="title">
        <h1>Alura Cars - TS</h1>
        <button className="add-car-button" onClick={() => setIsModalOpen(true)}>
          Add Car
        </button>
      </div>
      <CarList cars={carsList} />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <AddCarForm onAddCar={handleAddCar} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;