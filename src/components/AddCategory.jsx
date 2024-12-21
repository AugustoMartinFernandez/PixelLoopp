import React, { useState } from "react";

export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length <= 1) return;
    onNewCategory(inputValue.trim());
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmit} className="add-category-form">
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={inputValue}
        onChange={onInputChange}
        className="custom-search"
      />
      <button type="submit" className="custom-button">
        Agregar
      </button>
    </form>
  );
};