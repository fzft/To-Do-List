
import {ethers } from 'ethers'
import {createContext, useEffect, useState} from 'react'
import { toDoListABI, toDoListAddress } from './constants'
import Web3Modal from 'web3modal'
 
const fetchContract = (signerOrProvider) => new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const TodolistAppContext = createContext()

export const TodoListProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [error, setError] = useState("");
    const [allToDoList, setAllToDoList] = useState([]);
    const [myList, setMyList] = useState([]);
    const [allAddress, setAllAddress] = useState([]);

    // connecting metamask
    const CheckIfWalletConnected = async () => {
        if (!window.ethereum) {
            setError("Please install metamask")
            return
        }
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log(accounts)
        if (accounts.length) {
            const account = accounts[0];
            setCurrentAccount(account)
        } else {
            setError("Please Install metamask & connect to the ropsten network")
        }
    }

    // connect wallet
    const connectWallet = async () => {
        if (!window.ethereum) {
            setError("Please install metamask")
            return
        }
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(account[0]);
    }

    const toDoList = async (message) => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const createList = await contract.createList(message);
            createList.wait().then((result) => {
                console.log(result)
            })

        } catch (error) {
            setError("something wrong fetch contract")
        }
    }

    const getAllToDoList = async () => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const allAddress = await contract.getAddress();
            setAllAddress(allAddress);

            setAllToDoList([])
            allAddress.map(async (address) => {
                const singleData = await contract.getCreatorData(address);
                setAllToDoList((prev) => [...prev, singleData]);
            })

            const allMessages = await contract.getMessage();
            setMyList(allMessages);

        } catch (error) {
            console.log(error);
            setError("something wrong fetch contract")
        }
    }

    const change = async (address) => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const state = await contract.toggle(address);
            state.wait().then((result) => console.log(result));

        } catch (error) {
            
        }
    }

    return (
        <TodolistAppContext.Provider value={{CheckIfWalletConnected, connectWallet, toDoList, getAllToDoList,change,
         currentAccount, error, allToDoList, myList, allAddress}}>
            {children}
        </TodolistAppContext.Provider>
    )
}

export default function TodolistApp() {
  return (
    <div>TodolistApp</div>
  )
}
