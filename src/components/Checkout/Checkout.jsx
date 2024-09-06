import React, { useContext, useEffect, useState } from 'react';
import styles from "./Checkout.module.css";
import { useFormik } from 'formik';
import { cartContext } from '../../context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Checkout() {
  useEffect(() => {}, []);
  let {cartId}=useParams(); 
  let {cashOnDelivery}=useContext(cartContext)
  let[isOnline,setIsOnline]=useState(false)
let navigate=useNavigate()

  async function pay() {

    console.log(myForm.values)

    let url= `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
    if(isOnline){
       url =`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
    }
     let res=  await cashOnDelivery( url,myForm.values)
     if(res.status=="success"){

      if(isOnline){
        window.location.href= res.session.url
      }
    else{
       navigate("/allorders")
    }
     
      

     }
     else{
      console.log("",res );
      
     }
     
  }

  const myForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
 
    onSubmit: pay
  });

  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
               
            </Helmet>
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium"></span>
      </div>
      <form className="max-w-sm mx-auto" onSubmit={myForm.handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="details">Your details</label>
          <input
            type="text"
            id="details"
            name="details"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.details}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your details"
          />
        </div>
        {myForm.errors.details && myForm.touched.details ? (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myForm.errors.details}</span>
          </div>
        ) : null}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">Your phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.phone}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        {myForm.errors.phone && myForm.touched.phone ? (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myForm.errors.phone}</span>
          </div>
        ) : null}
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
          <input
            type="text"
            id="city"
            name="city"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.city}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your city"
          />
        </div>
       <div className='mb-3'> <input type="checkbox" id='forOnline' onChange={()=>setIsOnline(!isOnline)} />
       <label htmlFor="">Pay online</label></div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isOnline? 'Pay Online':'Cash On Delivery'}
        </button>
      </form>
    </>
  );
}
