import React, { useEffect, useState } from 'react'
import styles from "./ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    useEffect(()=>{},[])
    let [count,setCount]=useState(0);
      if (localStorage.getItem("token")){
        return children;
      }
      else{
        return <Navigate to={'/login'}/>;
      }
      }
