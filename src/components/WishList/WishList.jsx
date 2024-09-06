import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import WishItem from './../WishItem/WishItem';
import SpinnerOverlay from './../SpinnerOverlay/SpinnerOverlay';
import { cartContext } from '../../context/CartContext';
import { Helmet } from 'react-helmet';

export default function WishList() {
    const { getUserWishlist, removeItem } = useContext(WishlistContext);
    const [wishInfo, setWishInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    let { addProductToCart, cartItemsNo, setcartItemsNo, lastAddedId, setLastAddedId } = useContext(cartContext);

    useEffect(() => {
      
        getWishInfo();

    }, [  ]);

    async function getWishInfo() {
        setLoading(true);
        try {
            let res = await getUserWishlist();
            console.log("wish", res);
            setWishInfo(res);
            
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        } finally {
            setLoading(false);
        }
    }

    async function removeProduct(id) {
        setLoading(true);
        try {
            await removeItem(id);
            await getWishInfo(); 
        } catch (error) {
            console.error("Failed to remove item", error);
        } finally {
            setLoading(false);
        }
    }

    return (
    
<>
<Helmet>
      <meta charSet="utf-8" />
      <title>Wish List</title>
     
  </Helmet>
<div className="relative">
  <div className="container-max py-5 my-5 p-10 overflow-x-auto shadow-md sm:rounded-lg bg-slate-50 relative">
    <div className='flex justify-between mb-4'>
      <h1 className='my-6 text-3xl font-medium capitalize'>my  wish list</h1>
    </div>
    
    <div>
    
      
      <table className="w-full text-sm text-gray-500 dark:text-gray-400 bg-slate-50">
        <tbody>
          {loading && <SpinnerOverlay />}
          {wishInfo?.data
            ?.filter(ele => ele.count !== 0)
            .map(ele => (
              <WishItem ele={ele} key={ele._id} removeItem={removeProduct} addToCart={addProductToCart} cartItemsNo={setcartItemsNo}/>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
</div>
</>


    );
}
