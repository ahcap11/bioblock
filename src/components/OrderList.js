import React, { useState, useEffect } from "react";
import getWeb3, { getOrderProcessorInstance } from "../utils/web3";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [web3, setWeb3] = useState(null);

  const OrderStatus = {
    0: "Pending",
    1: "Shipped",
    2: "Delivered",
    3: "Canceled",
  };

  useEffect(() => {
    const initWeb3AndFetchOrders = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        const orderProcessor = await getOrderProcessorInstance(web3Instance);
        const orderCount = await orderProcessor.methods.orderCount().call();

        const ordersData = [];
        for (let i = 1; i <= orderCount; i++) {
          const order = await orderProcessor.methods.orders(i).call();
          ordersData.push({
            id: i,
            ...order,
          });
        }

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    initWeb3AndFetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      {orders.map((order) => (
        <div key={order.orderId}>
          <h3>Order ID: {order.orderId}</h3>
          <p>Item ID: {order.itemId}</p>
          <p>Quantity: {order.quantity}</p>
          <p>
            Total Amount:{" "}
            {web3
              ? web3.utils.fromWei(order.totalAmount, "ether")
              : order.totalAmount}{" "}
            ETH
          </p>
          <p>Status: {OrderStatus[order.status]}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
