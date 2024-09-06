import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { cartContext } from '../../context/CartContext';
import SpinnerOverlay from './../SpinnerOverlay/SpinnerOverlay';
import { useNavigate } from 'react-router-dom';
import CartItem from './../CartItem/CartItem';
import { Helmet } from 'react-helmet';


export default function Cart() {

  let {lastAddedId, setLastAddedId, cartItemsNo,setcartItemsNo,getCart,removeProduct,updateProductCount,clearCart,setCartId,cartId }=useContext(cartContext)
  let [cartInfo,setCartInfo]=useState([])
  let [isLoading,setIsLoading]=useState(true);
  let navigate=useNavigate()
 
    useEffect(()=>{
      getCartInfo()
    },[getCartInfo])
    let [count,setCount]=useState(0);
    async function getCartInfo(){
       let res= await getCart();

       setcartItemsNo(res.numOfCartItems)
      
       setCartId(res.data._id)
       setCartInfo(res)
       setIsLoading(false);
    }
   
    async function removeItem(id){
        setIsLoading(true);
        let res= await removeProduct(id);
        console.log("remove",res);
        setCartInfo(res);
        setcartItemsNo(res.numOfCartItems)

        setIsLoading(false);
     }
     async function updateCount(id,count){
      if (count==0) return
        let res= await updateProductCount(id,count);
  
        setCartInfo(res);
        setIsLoading(false);
     }
     async function ClearCartData(){
      setIsLoading(true);
        let res= await clearCart();
     
        console.log("clear",res);
        if(res.message=="success"){
          setcartItemsNo(0)
          setLastAddedId(null)
          setIsLoading(false);
        }
      
         setCartInfo(res);

        
     }
     function goToCheckout(){
      navigate(`/checkout/${cartId}`)
     }
 
     const handleCheckout = () => {
         setIsLoading(true);
         // Your checkout logic here
         goToCheckout().finally(() => setIsLoading(false)); // Reset loading state after action completes
     };
 
     const handleClearCart = () => {
         setIsLoading(true);
         // Your clear cart logic here
         ClearCartData().finally(() => setIsLoading(false)); // Reset loading state after action completes
     };
  
     return (
        
       <> 
          <Helmet>
                <meta charSet="utf-8" />
                <title>cart</title>
               
            </Helmet>
        <div className="container-max py-5 my-5 p-10 overflow-x-auto shadow-md sm:rounded-lg bg-slate-50 relative">
       {isLoading && <SpinnerOverlay />}
       <div className='flex justify-between mb-4'>
           <h1 className='my-6 text-3xl font-medium capitalize'>Cart Shop</h1>
           <button onClick={handleCheckout} className='bg-blue-600 rounded-lg py-2 px-4 m-5 w-50 text-xl text-white'>
               Check Out
           </button>
       </div>
       <div>
           <div className='flex justify-between items-center mb-5'>
               <h5 className='text-xl font-medium'>Total Price: <span className='green-color'>{cartInfo?.data?.totalCartPrice}</span></h5>
               <h5 className='text-xl font-medium'>Total Number of Items: <span className='green-color'>{cartInfo?.numOfCartItems}</span></h5>
           </div>
           <table className=" md:w-full  text-sm text-gray-500 dark:text-gray-400 bg-slate-50">
               <tbody>
                   {cartInfo?.data?.products.filter(ele => ele.count !== 0).map(ele =>
                       <CartItem
                           ele={ele}
                           key={ele._id}
                           updateCount={updateCount}
                           isLoading={isLoading}  // Pass down loading state
                           removeItem={removeItem}
                       />
                   )}
               </tbody>
           </table>
           <div className='flex justify-center'>
               <button onClick={handleClearCart} className='bg-transparent border m-3 green-border capitalize w-50 py-2 px-4 rounded-lg text-xl hover:bg-zinc-200'>
                   Clear Your Cart
               </button>
           </div>
       </div>
   </div></>
     );
 }