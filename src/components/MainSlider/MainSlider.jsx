import React, { useEffect, useState } from 'react'
import styles from "./MainSlider.module.css"
import Slider from 'react-slick';
import pic1 from '../../assets/images/pic1.jpg'
import pic2 from '../../assets/images/pic2.jpg'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
export default function MainSlider() {
    useEffect(()=>{},[])
    let [count,setCount]=useState(0);
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
 
    };
  return (
    <div className='md:flex md:justify-center md:items-center space-x-1 mx-auto p-5 m-4'>
    <div className='mb-14 w-80'>
      <Slider {...settings}>
        <img src={img2} alt="" />
        <img src={img1} alt="" />
        <img src={img3} alt="" />
      </Slider>
    </div>
    <div className=' w-80  flex flex-col justify-center'>
      <img src={pic1} alt="" />
      <img src={pic2} alt="" />
    </div>
  </div>
  )  
}
