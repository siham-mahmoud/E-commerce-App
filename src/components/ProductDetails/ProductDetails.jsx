import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from "react-helmet";
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import ProductItem from '../ProductItem/ProductItem';
import Slider from "react-slick";
import { cartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let { id, cat } = useParams();
  let [productDetails, setProductDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { addProductToCart, setcartItemsNo, cartItemsNo, lastAddedId, setLastAddedId } = useContext(cartContext);
  let { addProductToWishlist } = useContext(WishlistContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistItems(savedWishlistItems);
    getProductDetails();
    getRelatedProducts();
    
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id ]);

  async function addToCartItem(id) {
    setIsLoading(true);
    try {
      let data = await addProductToCart(id);
      if (lastAddedId !== id) {
        setcartItemsNo(cartItemsNo + 1);
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
    } catch (error) {
      console.error("Failed to add product to cart", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishlistItem(id) {
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
        duration: 2000,
        position: 'top-right',
        style: { background: "#22db14", color: "#fff" },
        icon: <span style={{ color: '#f0f', fontSize: '1.5rem' }}>✔️</span>,
        iconTheme: { primary: '#fff', secondary: '#fff' },
        ariaProps: { role: 'status', 'aria-live': 'polite' },
      });
    }
  }

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(res => {
        setProductDetails(res.data.data);
        if (relatedProducts.length) {
          getFliteredData(relatedProducts);
        }
      })
      .catch(err => {
        console.log(err);
        setProductDetails(null); 
      });
  }
  function getRelatedProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(data => {
        getFliteredData(data.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setRelatedProducts([]); 
        setIsLoading(false);
      });
  }
  function getFliteredData(data) {
    let res = data.filter(ele => ele.category._id === cat && ele.id !== id);
    setRelatedProducts(res);
  }

  return (
    <>
      <Helmet><title>{productDetails?.title}</title></Helmet>
      <div className='relative'>
        {isLoading && <SpinnerOverlay />}

        {productDetails ? (
          <div className='container-max grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-4'>
              <Slider {...{  arrows: false, dots: true, slidesToShow: 1, slidesToScroll: 1, customPaging: () => <button>_</button> }}>
                {productDetails.images.map(src => <img key={src} src={src} alt={productDetails.name} />)}
              </Slider>
            </div>
            <div className='col-span-8'>
              <h2 className='font-medium text-3xl'>{productDetails.title}</h2>
              <p>{productDetails.description}</p>
              <div className='flex justify-between mb-3'>
                <span>{productDetails.price} EGP</span>
                <span><i className='fa-solid fa-star text-yellow-400'></i>{productDetails.ratingsAverage}</span>
              </div>
              <div className='flex justify-between items-center'>
                <button 
                  className='btn-2 rounded-md p-2 mx-auto w-3/4 text-white' 
                  onClick={() => addToCartItem(productDetails.id)}
                >
                  + Add
                </button>
                <button onClick={() => addToWishlistItem(productDetails.id)}>
                  <i className={`fa-solid fa-heart text-3xl ${wishlistItems.includes(productDetails.id) ? 'text-red-600' : ''}`}></i>
                </button>
              </div>
            </div>
          </div>
        ) : <SpinnerOverlay />}
        
        <h2 className='text-3xl text-center font-semibold capitalize'>Related Products</h2>
        <div className='container-max grid grid-cols-6 gap-3'>
          {relatedProducts.map(products => (
            <ProductItem
              key={products.id}
              products={products}
              addCart={addToCartItem}
              addWish={addToWishlistItem}
              isInWishlist={wishlistItems.includes(products.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
