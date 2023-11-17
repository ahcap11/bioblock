import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Web3 from "web3";

const Header = () => {
  const [account, setAccount] = useState("");

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (web3.currentProvider.isMetaMask === true) {
      web3.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BioGenos
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/place-order">
                Place order
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-item">
                Add Item
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view-orders">
                View Orders
              </Link>
            </li>
          </ul>
          <button className="btn btn-primary" onClick={connectWalletHandler}>
            {account ? `Connected: ${account}` : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
