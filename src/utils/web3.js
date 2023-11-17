import Web3 from "web3";
import ItemRegistryContract from "../contracts/ItemRegistry.json";
import OrderProcessorContract from "../contracts/OrderProcessor.json";
import PaymentHandlerContract from "../contracts/PaymentHandler.json";

const getWeb3 = () => {
  if (typeof window.ethereum !== "undefined") {
    // Use MetaMask provider
    return new Web3(window.ethereum);
  } else {
    // Fallback to a local node if MetaMask is not available
    return new Web3("http://localhost:8545");
  }
};

export const getItemRegistryInstance = async (web3) => {
  return new web3.eth.Contract(
    ItemRegistryContract.abi,
    "0xD8B4c8DE85A7459cC6343cAb5E168D85B53D6Ac2"
  );
};

export const getOrderProcessorInstance = async (web3) => {
  return new web3.eth.Contract(
    OrderProcessorContract.abi,
    "0x25E188e283F8bfDfF07f2bb05217f29F47A80ae5"
  );
};

export const getPaymentHandlerInstance = async (web3) => {
  return new web3.eth.Contract(
    PaymentHandlerContract.abi,
    "0x24c073d8C360f68Bc601a1a202B606D42F548617"
  );
};

export default getWeb3;
