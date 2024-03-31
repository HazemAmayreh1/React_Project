
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css'; 
import Loader from '../../../loader/Loader'; 
import axios from 'axios'; 
import { UserContext } from '../../../context/User';
import { Bounce, toast } from 'react-toastify';

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {userName} = useContext(UserContext);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
      if (data.products && data.products.length > 0) {
        setProducts(data.products); 
      } else {
        setError('No products found in this category. Please try a different category.');
      }
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]); 

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    try {
      await axios.post(`${import.meta.env.VITE_API}/cart`, { productId }, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      toast.success('Product successfully added to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Product already exists in cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      } else {
        toast.error('Failed to add product to cart. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    }
  };
  return (
    <div className='hero'>
      <div className="category-products">
        <div className="products-container">
          {products.map(product => (
            <div className="card" key={product._id}>
              <img src={product.mainImage.secure_url} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className='priceTitle'>{product.price}$</p>
              </div>
              {userName ? (
                  <button onClick={() => addToCart(product._id)} className="btn btn-secondary">
                    ADD TO CART
                  </button>
                ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
