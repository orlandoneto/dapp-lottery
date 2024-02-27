import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x29F6281a1eFeb52979e4D8f55F646c949c7D574C";

export async function doLogin() {
  if (!window.ethereum) throw new Error("No Metamask found.");

  const web = new Web3(window.ethereum);
  try {
    const accounts = await web.eth.requestAccounts();
    if (!accounts || !accounts.length)
      throw new Error("Wallet no accounts found.");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
  } catch (error) {
    throw new Error("Failed to login: " + error.message);
  }
}

export async function getContract() {
  const wallet = localStorage.getItem("wallet");
  if (!wallet) throw new Error("Unauthorized.");

  const web = new Web3(window.ethereum);
  try {
    return new web.eth.Contract(ABI, CONTRACT_ADDRESS, {
      from: wallet,
      gasLimit: 500000,
    });
  } catch (error) {
    throw new Error("Failed to get contract: " + error.message);
  }
}

export async function getCurrentVoting() {
  try {
    const contract = await getContract();
    return contract.methods.getCurrentVoting().call();
  } catch (error) {
    throw new Error("Failed to get current voting: " + error.message);
  }
}

export async function addVote(choice) {
  try {
    const contract = await getContract();
    debugger;
    return contract.methods.addVote(choice).send();
  } catch (error) {
    throw new Error("Failed to add vote: " + error.message);
  }
}
