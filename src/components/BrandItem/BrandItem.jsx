import React from 'react';
import styles from "./BrandItem.module.css";

export default function BrandItem({ brand, onClick }) {
  return (
    <div className='product  rounded-md px-2 py-4 border-2 cursor-pointer' onClick={onClick}>
      <img src={brand?.image} alt={brand?.name} />
      <p className='m-4 text-center'>{brand?.name}</p>
    </div>
  );
}
