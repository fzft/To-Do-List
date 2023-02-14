import React, { useContext, useEffect, useState } from 'react';
import {MdVerified} from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";
import Image from 'next/image';

import { TodolistAppContext } from '@/context/TodolistApp';
import Style from '../styles/index.module.css';
import Loading from "../loading.gif";
import Data from '@/components/Data';

const Home = () => {
  const [message, setMessage] = useState("");
  const {CheckIfWalletConnected, connectWallet, toDoList,getAllToDoList, change,
    currentAccount, error, allToDoList, myList, allAddress
  } = useContext(TodolistAppContext)
  useEffect(()=>{
    CheckIfWalletConnected();
    getAllToDoList();
  }, [])
  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Loading} alt="logo" width={50} height={50} />
        <div className={Style.connect}>
          {!currentAccount? <button onClick={connectWallet}>Connect Wallet</button> :
           <button>{currentAccount.slice(0, 20)}</button>}
        </div>
      </div>
      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h2>ToDo History List</h2>
          <div>
            {myList.map((item, index) => {
              return (
                <div key={index} className={Style.home_completed_list}>
                  <MdVerified className={Style.iconColor}></MdVerified>
                  <p>{item.slice(0,30)}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create ToDo List</h2>
            <div className={Style.home_create_input}>
              <input type="text" placeholder="Enter your todo list" onChange={(e) => setMessage(e.target.value)}/>
              {currentAccount? <RiSendPlaneFill className={Style.iconBlack}  onClick={() => toDoList(message)}></RiSendPlaneFill> :
              <RiSendPlaneFill className={Style.iconBlack} onClick={()=> connectWallet()} ></RiSendPlaneFill>}
          </div>
          <Data allToDoList={allToDoList} allAddress={allAddress} myList={myList} change={change}/>
        </div>
      </div>
      </div>
    </div>)
}

export default Home;
