import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css'; 
import { Link } from 'react-router-dom';

function Categories() {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  const [categories, setCategories] = useState([]);
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
        {categories.map((category) => (
          <SwiperSlide key={category._id} >
            <Link to={`/categories/${category.id}`}>
            <div className='showCategorie'>
              <img src={category.image.secure_url} alt={category.name} />
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </>
  );
}

export default Categories;
