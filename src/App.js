import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import MakePaymentPage from "./pages/MakePaymentPage";
import ViewOrdersPage from "./pages/ViewOrderPage";
import loadWeb3 from "./utils/web3";

const App = () => {
  // Load web3 instance when the component mounts
  React.useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {" "}
          {/* <-- Updated from Switch to Routes */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="/add-item" element={<AddItemPage />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />
          <Route path="/make-payment" element={<MakePaymentPage />} />
          <Route path="/view-orders" element={<ViewOrdersPage />} />
          {/* If you have a 404 page or other routes, they would go here */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
