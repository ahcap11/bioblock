import React from "react";
import OrderForm from "../components/OrderForm";
import "../styles/PlaceOrderPage.css";

const PlaceOrderPage = () => {
  return (
    <section className="place-order-page">
      <h1 className="page-title">Place an Order</h1>
      <OrderForm />
    </section>
  );
};

export default PlaceOrderPage;
