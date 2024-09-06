import React, { useEffect, useState } from 'react'
import styles from "./ProtectedUserRoutes.module.css"


import { Navigate } from 'react-router-dom';

export default function ProtectedUserRoutes({children}) {


      useEffect(()=>{},[])
      let [count,setCount]=useState(0);
        if (localStorage.getItem("token")){
          return <Navigate to={'/home'}/>;
        }
        else{
          return children;
        }
        }
  