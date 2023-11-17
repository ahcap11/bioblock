import React, { useState, useEffect } from "react";
import getWeb3, { getOrderProcessorInstance } from "../utils/web3";
import ErrorPage from "./Error";

const OrderForm = () => {
  const [web3, setWeb3] = useState(null);
  const [orderProcessor, setOrderProcessor] = useState(null);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const orderProcessorInstance = await getOrderProcessorInstance(
          web3Instance
        );
        setOrderProcessor(orderProcessorInstance);
      } catch (error) {
        console.error("Error placing order:", error);
        setError("There was an error placing the order.");
      }
    };
    init();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const tx = await orderProcessor.methods
        .placeOrder(itemName, quantity)
        .send({ from: account });

      if (tx.status) {
        alert("Order placed successfully!");
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);

      if (error instanceof Error && error.message === "Transaction failed") {
        alert("There was an error placing the order. Transaction failed.");
      } else {
        alert("There was an error placing the order.");
      }
    }
  };

  return (
    <div>
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <form className="place-order-form" onSubmit={handleSubmit}>
          <label htmlFor="item-name">Item Name</label>
          <input
            id="item-name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            required
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
          />
          <button type="submit">Place Order</button>
        </form>
      )}
    </div>
  );
};

export default OrderForm;
