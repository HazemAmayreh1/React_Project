// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css'; // Make sure this path is correct
import Loader from '../../../loader/Loader'; // Make sure this path is correct
import axios from 'axios'; // Ensure axios is installed and imported

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
      setProducts(data.products);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]); // Dependency array includes `id` to refetch if the category ID changes

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

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
                <button className="btn btn-secondary">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
