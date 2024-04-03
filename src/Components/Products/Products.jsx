import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Loader from "../../../loader/Loader";
import axios from "axios";
import "./Products.css";
import { UserContext } from "../../../context/User";
import { Bounce, toast } from "react-toastify";
import StarRating from "../../../Rating/StarRating";

function Products() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [limit, setLimit] = useState(4); 
  const [inputPage, setInputPage] = useState('');
  const { userName } = useContext(UserContext);

  const fetchProducts = async () => {
    setLoader(true);
    try {
      let endpoint = `${import.meta.env.VITE_API}/products?page=${currentPage}&limit=${limit}`;
      if (searchTerm) {
        endpoint += `&search=${encodeURIComponent(searchTerm)}`;
      }
      if (sortOrder) {
        endpoint += `&sort=${encodeURIComponent(sortOrder)}`;
      }
      const { data } = await axios.get(endpoint);
      
      if (data && data.products) {
        setProducts(data.products);
      } else {
        setError("No products found.");
      }
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
      handlePageChange(inputPage);
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sortOrder, currentPage, limit,inputPage]); 

  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue === '' || (Number(newValue) >=1 && Number(newValue) <= totalPages+2)) {
      setInputPage(newValue);
    }
    
  };
  const totalPages = Math.ceil(totalProducts / limit);
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages+2) {
      setCurrentPage(page);
    } else {
      console.error('Page number is out of range.');
    }
  }
  
 


  if (loader) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    setLoader(true);
    
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/cart`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("Product successfully added to cart", {
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
        toast.error("Product already exists in cart", {
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
        toast.error("Failed to add product to cart. Please try again.", {
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
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="hero">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          className="search-input"
          onChange={handleSearchChange}
        />
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="">Default Sort</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
          <option value="-name">Name: Z to A</option>
        </select>
      </div>
      <div className="category-products">
        <div className="products-container">
          {products.map((product) => (
            <div className="card" key={product._id}>
              <NavLink to={`/ProductInfo/${product._id}`}>
                <img
                  src={product.mainImage.secure_url}
                  alt={product.name}
                  className="card-img-top"
                />
              </NavLink>
              <div className="card-body">
                <p className="card-title">{product.name}</p>
                <p className="priceTitle">{product.price}$</p>
                <p className="feedback-rating">
                  <StarRating rating={product.avgRating} />
                </p>
              </div>
              {userName ? (
                  <button
                    onClick={() => addToCart(product._id)}
                    className="Cancel-button"
                  >
                    Add to Cart {loader && <Loader />} 
                  </button>
                ) : null}
            </div>
          ))}
      <div className="pagination-controls">
       
        
        <input
         type="number"
         value={inputPage}
         onChange={handleInputChange}
         placeholder="Go to page"
         className="search-page-number"
         
        />
               
      </div>
       

        </div>
       
      </div>
    </div>
  );
}

export default Products;
