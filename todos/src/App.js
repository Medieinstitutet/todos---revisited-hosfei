import logo from './logo.svg';
import Web3 from "web3";
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADRESS } from './config';
import React, { useState, useEffect } from "react";
import TodoList from './components/todolist';


function App() {
  let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");


const [account, setAccount] = useState(null);
const [contract, setContract] = useState(null);
const getAccounts = async () => {
  const accs = await web3.eth.getAccounts();
  setAccount(accs[0]);
};
const getContract = async () => {
  const todoListContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADRESS);
  setContract(todoListContract)
};
useEffect(() => {
  getAccounts();
  getContract();
}, []);

  return (
    <div className="App">
      <p>konto{account}</p>
      <TodoList todoListContract = {contract}
      account = {account}></TodoList>
    </div>
  );
}

export default App;
