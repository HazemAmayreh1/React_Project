// Import necessary libraries
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css'; 
import Loader from '../../../loader/Loader';

function CategoryProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
            console.log(data);
            setProducts(data.products);
        } catch (error) {
            setError('Failed to fetch products. Please try again later.');
        } finally {
            setLoading(false);
            
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <Loader/>;
    if (error) return <div>{error}</div>;

    return (
        <div className='hero'>
        <div className="category-products">
            <div className="products-container">
                {products.map(product => (
                    <div className="card" key={product._id}>
                        <img src={product.mainImage.secure_url} alt={product.name} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <h1>Price:{product.price}$</h1>
                            <a href="#" className="btn btn-secondary">ADD TO CART</a>
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default CategoryProducts;
