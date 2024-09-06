import React, { useEffect, useState } from 'react'
import styles from "./LayOut.module.css"
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Register from '../Register/Register';

export default function LayOut() {
    useEffect(()=>{},[])
    let [count,setCount]=useState(0);
  return (
      <>
         <Navbar/>
         <div className='container py-14 my-5'>
         <Outlet/>
         </div>
      </>
    
  )
}
