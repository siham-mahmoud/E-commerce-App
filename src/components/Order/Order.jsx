import React, { useContext, useEffect, useState } from 'react'
import styles from "./Order.module.css"
import { cartContext } from '../../context/CartContext';
import { userTokenContext } from '../../context/UserTokenContext';

import { Accordion } from "flowbite-react";
import CartItem from '../CartItem/CartItem';
import { Helmet } from 'react-helmet';







export default function Order({}) {
  let {userId}=useContext(userTokenContext)
  let{getOrders}=useContext(cartContext)
  let[orders,setOrders]=useState([])
    useEffect(()=>{

      if (userId)getAllOrders()
    },[userId])
    let [count,setCount]=useState(0);



     async function getAllOrders(){
      let res= await getOrders(userId)
      console.log(res,"data");
      setOrders(res)
      

    }
  return (
    <>

<Helmet>
                <meta charSet="utf-8" />
                <title>All orders</title>
               
            </Helmet>
   <div className='w-4/5 mx-auto'>
      <Accordion>
      {orders.map(order=>
      <Accordion.Panel  key={order.id}>
        <Accordion.Title className={order.isPaid ? "bg-green-200 ":"bg-red-200"}>{order.paymentMethodType}  Paid:  {order.isPaid.toString("")}</Accordion.Title>
        <Accordion.Content>
        <table className="w-full text-sm  text-gray-500 dark:text-gray-400 bg-slate-50">
        
        <tbody className=''>
       
            {order?.cartItems?.map(ele=>
               <CartItem ele={ele} key={ele._id} showAction={false} />
        )}
            
          
        </tbody>
        </table>
        </Accordion.Content>
      </Accordion.Panel>)}
    
 
    </Accordion>
    </div>

    
    
    
    
    
    </>
  )
}
