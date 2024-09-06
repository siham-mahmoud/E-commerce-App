import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import { useContext } from 'react';
import { counterContext } from '../../context/CounterContext';
import axios from 'axios';
import RecentProduct from '../RecentProduct/RecentProduct';
import Catogories from '../Categories/Categories';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
  
   
  return (
  <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
               
            </Helmet>
<MainSlider/>
<Catogories/>
<div className='relative' >
 
<RecentProduct/>

  </div>
  </>
  )
}
