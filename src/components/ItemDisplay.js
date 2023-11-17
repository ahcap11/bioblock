import React, { useState, useEffect } from "react";
import "../styles/ItemDisplay.css";
import getWeb3, { getItemRegistryInstance } from "../utils/web3";

const ItemDisplay = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const initWeb3AndFetchItems = async () => {
      try {
        const web3Instance = await getWeb3();
        const itemRegistryInstance = await getItemRegistryInstance(
          web3Instance
        );

        const response = await itemRegistryInstance.methods
          .getAllItems()
          .call();

        const [ids, names, quantities, prices] = response;

        const itemsFormatted = ids.map((id, index) => ({
          id: id,
          name: names[index],
          quantity: quantities[index],
          price: web3Instance.utils.fromWei(prices[index], "ether"),
        }));

        setItems(itemsFormatted);
      } catch (error) {
        alert("Failed to load items. Check console for details.");
        console.error(error);
      }
    };

    initWeb3AndFetchItems();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Quantity: {item.quantity}</p>
                <p className="card-text">Price: {item.price} ETH</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;
