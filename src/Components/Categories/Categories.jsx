import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css';
import { Navigation, Pagination } from 'swiper/modules';

function Categories() {
  const [categories, setCategories] = useState([]);
  const getCategories = async ()=>{
    const {data}=await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10`);
   setCategories(data.categories);
  }
  useEffect(()=>{
    getCategories();
  } , [] )

  return (
    <>

    <Swiper
        autoHeight={true}
        spaceBetween={20}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
         {categories.map( categorie=>
         <SwiperSlide key={categorie._id}>
        <div className='showCategorie' >
          <img src={categorie.image.secure_url}/>
        </div>
        </SwiperSlide>
       
      )}
        
     
      </Swiper>


    
    </>
  )
}

export default Categories
