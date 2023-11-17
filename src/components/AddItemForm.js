import React, { useState, useEffect } from "react";
import "../styles/AddItemPage.css";
import getWeb3, { getItemRegistryInstance } from "../utils/web3";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [web3, setWeb3] = useState(null);
  const [itemRegistry, setItemRegistry] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const itemRegistryInstance = await getItemRegistryInstance(
          web3Instance
        );
        setItemRegistry(itemRegistryInstance);
      } catch (error) {
        alert(
          "Failed to load web3, accounts, or contract. Check console for details."
        );
        console.error(error);
      }
    };
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    await itemRegistry.methods
      .addItem(name, quantity, price)
      .send({ from: account });
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <label htmlFor="item-name" className="form-label">
        Item Name
      </label>
      <input
        id="item-name"
        className="form-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />

      <label htmlFor="quantity" className="form-label">
        Quantity
      </label>
      <input
        id="quantity"
        className="form-input"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />

      <label htmlFor="price" className="form-label">
        Price
      </label>
      <input
        id="price"
        className="form-input"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />

      <button type="submit" className="form-button">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
