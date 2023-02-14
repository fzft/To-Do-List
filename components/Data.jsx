import React from 'react'
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import {AiFillLock, AiFillUnlock} from "react-icons/ai";

import { TodolistAppContext } from '@/context/TodolistApp';
import Style from '../styles/index.module.css';


export default function Data({allToDoList, allAddress, myList, change}) {
  // const { change } = useContext(TodolistAppContext)
  console.log(allToDoList)
  return (
    <div className={Style.home_create_list}>
      {allToDoList.length === 0 ? <div className={Style.noData}>There is no todo list</div> :
      allToDoList.map((item, index) => {
        return (
          <div key={index + 1} className={Style.home_create_list_app}>
            <div className={Style.lock_list}>
              <AiFillLock className={Style.lock_color}></AiFillLock>
              {item[2]}
            </div>
            {item[3] === false? (<RiCloseFill onClick={(() => change(item[0]))} className={Style.iconClose}></RiCloseFill>): (<p className={Style.down}>Down</p>)}
          </div>
        )
      })}
      </div>
  )
}
