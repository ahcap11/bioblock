import React from "react";
import OrderList from "../components/OrderList";
import "../styles/ViewOrdersPage.css";

const ViewOrdersPage = () => {
  return (
    <div>
      <h1>View Orders</h1>
      <OrderList />
    </div>
  );
};

export default ViewOrdersPage;
