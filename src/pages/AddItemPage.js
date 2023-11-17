import React from "react";
import AddItemForm from "../components/AddItemForm";
import "../styles/AddItemPage.css";

const AddItemPage = () => {
  return (
    <div className="add-item-page">
      <h1 className="page-title">Add a New Medical Item</h1>
      <AddItemForm />
    </div>
  );
};

export default AddItemPage;
