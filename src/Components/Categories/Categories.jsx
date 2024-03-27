import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';

// Only import Swiper CSS once
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css'; // Ensure this path matches your CSS file for swiper

function Categories() {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?page=1&limit=9`);
      setCategories(data.categories);
    };
    getCategories();
  }, []);

  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
       
        spaceBetween={5}
        pagination={{ type: 'fraction' }}
        navigation={true}
        virtual
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category._id} virtualIndex={index}>
            <div className='showCategorie'>
              <img src={category.image.secure_url} alt={category.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </>
  );
}

export default Categories;
