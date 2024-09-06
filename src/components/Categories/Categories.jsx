import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 6,
    customPaging: (i) => <button className="dot">_</button>, 
    appendDots: (dots) => (
      <div>
        <ul className="slick-dots custom-dots">{dots.slice(0, 2)}</ul> 
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container  my-10">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover md:w-64 md:h-64 sm:w-48 sm:h-48"
            />
            <h2 className="text-center text-lg font-medium md:text-xl sm:text-md mt-2">
              {category.name}
            </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
