import axios from "axios";
import {createContext, useState } from "react";




 export let WishlistContext =createContext();

   export default function WishlistContextProvider({children}){
    
   const headers = {
    token:window.localStorage.getItem("token")

   }

   async function addProductToWishlist(productId){
    console.log(productId);
     return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        {productId},{
            headers
    }).then(res=>res

     
        
    ).catch(err=>err
    )
}
async function getUserWishlist(){

     return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
      {
          headers
    }).then(res=>res.data).catch(err=>err.response.data)
}
async function removeItem(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers}).then(res=>res.data).catch(err=>err.response.data)
  }
    let[wishlistItems, setWishlistItems]=useState([])
  
      return <WishlistContext.Provider value={{ wishlistItems, setWishlistItems,addProductToWishlist,getUserWishlist,removeItem}}> 
      {children} 
    </WishlistContext.Provider>;
  }