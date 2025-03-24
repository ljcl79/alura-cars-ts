import React, { useState } from "react";
import { Car } from "../types/Car";

interface AddCarFormProps {
    onAddCar: (newCar: Car) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onAddCar }) => {
    const [formData, setFormData] = useState<Partial<Car>>({
        brand: "",
        model: "",
        year: undefined,
        isElectric: false,
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Verifica si el elemento es un checkbox
        const isCheckbox = type === "checkbox";
        setFormData((prev) => ({
            ...prev,
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.brand && formData.model && formData.year && formData.image) {
            onAddCar({
                id: Math.random().toString(36).substr(2, 9), // Genera un ID único
                brand: formData.brand,
                model: formData.model,
                year: Number(formData.year),
                isElectric: formData.isElectric || false,
                image: formData.image,
            } as Car);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregando carros</h2>
            <input
                type="text"
                name="brand"
                placeholder="Marca"
                value={formData.brand || ""}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="model"
                placeholder="Modelo"
                value={formData.model || ""}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="year"
                placeholder="Año"
                value={formData.year || ""}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                placeholder="Foto"
                value={formData.image || ""}
                onChange={handleChange}
                required
            />
            <label>
                <input
                    type="checkbox"
                    name="isElectric"
                    checked={formData.isElectric || false}
                    onChange={handleChange}
                />
                Eléctrico
            </label>
            <button type="submit">Nuevo Carro</button>
        </form>
    );
};

export default AddCarForm;