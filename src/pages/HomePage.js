import React from "react";
import ItemDisplay from "../components/ItemDisplay";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="home-title">Welcome to Biogenos</h1>
      <ItemDisplay />
    </div>
  );
};

export default HomePage;
