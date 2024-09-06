import React, { useEffect, useState } from 'react';
import styles from "./CategoryCard.module.css";
import axios from 'axios';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay'; 
import { Helmet } from 'react-helmet';


export default function CategoryCard() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(res => {
        setCategories(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
               
            </Helmet>
      {isLoading && <SpinnerOverlay />} {/* Show the spinner while loading */}
      
      <div className='container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
        {categories.map(category => (
          <div className='product rounded-md border-2 cursor-pointer' key={category._id}>
            <div>
              <div className="relative pb-[75%] w-full overflow-hidden">
                <img src={category.image} alt={category.name} className="absolute top-0 left-0 w-full h-full object-cover" />
              </div>
              <h2 className='text-green-600 text-3xl font-medium text-center m-4'>{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
