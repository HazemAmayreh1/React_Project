import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CategoryProducts() {
    const {id}=useParams('id');
    const [product,setProduct]=useState([]);
    const getProduct = async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
        setProduct(data.products);
            
    };
    useEffect( ()=>{
        getProduct();
    },[]);
    
  return (
    <>
      <h2>CategoryProducts</h2>
      {product.map(pro => (
          <div className='showCatogryProduct' key={pro._id}>
            <div className='showProduct'>
                <h1>{pro.name}</h1>
              <img src={pro.mainImage.secure_url} alt={pro.name} />
            </div>
          </div>
        ))}
    </>
  )
}

export default CategoryProducts
