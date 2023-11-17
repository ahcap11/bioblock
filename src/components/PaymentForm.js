import React, { useState, useEffect } from "react";
import getWeb3 from "../utils/web3";
import PaymentHandlerContract from "../contracts/PaymentHandler.json";

const PaymentForm = () => {
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [paymentHandler, setPaymentHandler] = useState(null);

  const initWeb3 = async () => {
    try {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = PaymentHandlerContract.networks[networkId];
      const instance = new web3Instance.eth.Contract(
        PaymentHandlerContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      setPaymentHandler(instance);
    } catch (error) {
      alert(
        "Failed to load web3, accounts, or contract. Check console for details."
      );
      console.error(error);
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!web3 || !paymentHandler) {
      return;
    }

    const accounts = await web3.eth.getAccounts();

    const amountInWei = web3.utils.toWei(amount, "ether");

    try {
      await paymentHandler.methods.receivePayment(orderId).send({
        from: accounts[0],
        value: amountInWei,
      });

      console.log(
        `Payment of ${amount} for order ID ${orderId} has been processed.`
      );
      setOrderId("");
      setAmount("");
    } catch (error) {
      alert("Payment failed. Check console for details.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Order ID"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Payment Amount"
        required
      />
      <button type="submit">Make Payment</button>
    </form>
  );
};

export default PaymentForm;
