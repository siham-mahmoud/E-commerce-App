import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';

export default function ProductItem({ products, addCart, addWish, isInWishlist }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isWishing, setIsWishing] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addCart(products.id);
    setIsAdding(false);
  };

  const handleAddToWishlist = async () => {
    setIsWishing(true);
    await addWish(products.id);
    setIsWishing(false);
  };

  return (
    <>
      {(isAdding || isWishing) && <SpinnerOverlay />}

      <div className='product hover:rounded-md px-2 py-4'>
        <Link to={`/productDetails/${products.id}/${products.category._id}`}>
          <img src={products.imageCover} alt="" />
          <span className='text-green-500'>{products.category?.name}</span>
          <h2 className="font-bold mb-3">{products.title}</h2>
          <div className='flex justify-between mb-3'>
            <span>{products.price} EGP</span>
            <span><i className='fa-solid fa-star text-yellow-400'></i>{products.ratingsAverage}</span>
          </div>
        </Link>

        <div className='flex justify-center items-center gap-1'>
          <button className='btn rounded-md p-2 w-3/4 text-white mt-4' onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? 'Adding...' : '+ Add'}
          </button>

          <button onClick={handleAddToWishlist}>
            <i className={`fa-solid fa-heart text-3xl ${isInWishlist ? 'text-red-600' : ''}`}></i>
          </button>
        </div>
      </div>
    </>
  );
}
