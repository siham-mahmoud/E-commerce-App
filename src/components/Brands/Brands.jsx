import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrandItem from './../BrandItem/BrandItem';
import BrandModal from '../BrandModal/BrandModal';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import { Helmet } from 'react-helmet';


export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false); 

  useEffect(() => {
    getBrands();
  }, []);

  function getBrands() {
    axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(res => {
        setBrands(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  const handleBrandClick = (brand) => {
    setIsModalLoading(true); 
    setSelectedBrand(brand);
    setModalVisible(true);
    setTimeout(() => {
      setIsModalLoading(false);
    }, 500); 
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBrand(null);
  };

  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
               
            </Helmet>
      {isLoading && <SpinnerOverlay />}
      <h1 className='brands text-center font-medium m-4'>All Brands</h1>
      <div className='container-max grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
        {brands.length > 0 ? (
          brands.map(brand => (
            <BrandItem key={brand.id} brand={brand} onClick={() => handleBrandClick(brand)} />
          ))
        ) : (
          <SpinnerOverlay />
        )}
      </div>

      {/* Brand Modal */}
      <BrandModal
        isVisible={isModalVisible}
        onClose={closeModal}
        brandData={selectedBrand}
        isLoading={isModalLoading} 
      />
    </>
  );
}
