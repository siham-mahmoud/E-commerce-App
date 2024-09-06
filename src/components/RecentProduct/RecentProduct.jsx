import React, { useContext, useEffect, useState } from 'react';
import styles from "./RecentProduct.module.css";
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import { WishlistContext } from '../../context/WishlistContext';

export default function RecentProduct() {
  let { addProductToWishlist } = useContext(WishlistContext);
  let { addProductToCart, cartItemsNo, setcartItemsNo, lastAddedId, setLastAddedId } = useContext(cartContext);
  let [products, setProducts] = useState([]);
  let [wishlistItems, setWishlistItems] = useState([]);
  let [isLoading, setIsLoading] = useState(true);  // Loading state
  let [searchQuery, setSearchQuery] = useState('');  // Search query state



  useEffect(() => {
    const savedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
   if (savedWishlistItems){
    setWishlistItems(savedWishlistItems);}
    getProducts();
  }, []);
  

  async function addToWishItem(id) {
    const res = await addProductToWishlist(id);
    if (res.data.status === "success") {
      setWishlistItems((prevItems) => {
        if (!prevItems.includes(id)) {
          const updatedWishlist = [...prevItems, id];
          localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
          return updatedWishlist;
        }
        return prevItems;
      });
      toast(`${res.data.message} ❤️`, {
        duration: 4000,
        position: 'top-right',
        style: { background: "#22db14", color: "#fff" },
        icon: <span style={{ color: '#f0f', fontSize: '1.5rem' }}>✔️</span>,
        iconTheme: { primary: '#fff', secondary: '#fff' },
        ariaProps: { role: 'status', 'aria-live': 'polite' },
      });
    }
  }

  const removeFromWishItem = (id) => {
    setWishlistItems((prevItems) => {
      const updatedWishlist = prevItems.filter(item => item !== id);
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  async function addToCartItem(id) {
    let data = await addProductToCart(id);
    if (lastAddedId !== id) {
      let newCartItemsNo = cartItemsNo + 1;
      setcartItemsNo(newCartItemsNo);
      console.log("hii")
    }
    if (data.status === "success") {
      console.log(data)
      setLastAddedId(id);
      toast(`${data.message} 🛺`, {
        duration: 4000,
        position: 'top-right',
        style: { background: "#22db14", color: "#fff" },
        icon: <span style={{ color: '#f0f', fontSize: '1.5rem' }}>✔️</span>,
        iconTheme: { primary: '#fff', secondary: '#fff' },
        ariaProps: { role: 'status', 'aria-live': 'polite' },
      });
    }
  }

  function getProducts() {
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then(res => {
        setProducts(res.data.data);
        setIsLoading(false);  // Stop loading once data is fetched
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);  // Stop loading on error
      });
  }

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isLoading && <SpinnerOverlay />} 
      
      {/* Search Bar */}
      <div className="  mt-9 mb-4 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className=" w-4/5 md:w-3/4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"

        />
      </div>

      <div className='container-max grid md:grid-cols-2 lg:grid-cols-4  gap-6'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductItem
              key={product.id}
              addCart={addToCartItem}
              addWish={addToWishItem}
              products={product}
              isInWishlist={wishlistItems.includes(product.id)}
              removeWish={removeFromWishItem}
            />
          ))
        ) : (
          !isLoading && <p className='  text-3xl font-medium nav-icon'>No products found</p>
        )}
      </div>
    </>
  );
}