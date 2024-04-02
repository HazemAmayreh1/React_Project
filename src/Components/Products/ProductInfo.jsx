import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../loader/Loader";
import "./ProductInfo.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { UserContext } from "../../../context/User";
import StarRating from "../../../Rating/StarRating";


function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [avgRating, setAvgRating] = useState(null);
  const { userName } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products/${id}`
      );
      if (data.product) {
        setProduct(data.product);
        setAvgRating(data.avgRating);
      } else {
        setError("No product information found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to fetch product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>No product information available.</div>;
  const isDiscounted = product.finalPrice < product.price;
  const addToCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    setLoading(true);

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
      setLoading(false);
    }
  };
 

  const addReview = async (productId) => { 
    const token = localStorage.getItem("userToken");
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/products/${productId}/review`, 
        {
          comment,
          rating
        },
        {
          headers: {
            Authorization: `Tariq__${token}`, 
          },
        }
      );
      console.log(response); 
      toast.success("Review added successfully!", {
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
      setComment(''); 
    } catch (error) {
      toast.error("already review", {
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
      console.error("Review addition error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
 
  return (
    <>
      <div className="infoback">
        <div className="product-container">
          <div className="product-title">
            <h1>{product.name}</h1>
          </div>
          <div className="price">
            {isDiscounted ? (
              <>
                <span className="priceOriginal">{product.price}$</span>
                <span className="priceFinal">{product.finalPrice}$</span>
              </>
            ) : (
              <span className="priceFinal">{product.finalPrice}$</span>
            )}
          </div>

          <div className="main-image">
            {product.mainImage?.secure_url && (
              <img src={product.mainImage.secure_url} alt={product.name} />
            )}
          </div>
          {userName ? (
            <button
              onClick={() => addToCart(product._id)}
              className="btn btn-secondary"
            >
              Add to Cart {loading && <Loader />}
            </button>
          ) : null}
          <p className="product-description">{product.description}</p>

          <div className="sub-images">
            {product.subImages?.map((image, index) => (
              <img
                key={index}
                src={image.secure_url}
                alt={`Product subimage ${index + 1}`}
              />
            ))}
          </div>

          {avgRating && (
            <div className="avgRating">
              <p>Average Rating:</p>
              <StarRating rating={avgRating} />
            </div>
          )}
          <div className="add-review-container">
       <textarea
        className="comment-input"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <StarRating rating={rating} onRating={setRating} />

      <button className="btn-add-review" onClick={() => addReview(product._id)}>
     Add Review
      </button>
    </div>
          <div className="reviews">
            {product.reviews?.map((feedback, index) => (
              <div key={index} className="review">
                <img
                  className="feedback-img"
                  src={feedback.createdBy?.image.secure_url}
                  alt={feedback.createdBy?.userName}
                />
                <p className="feedback-userName">
                  {feedback.createdBy?.userName}
                </p>
                <p className="feedback-comment">{feedback.comment}</p>
                <p className="feedback-rating">
                  <StarRating rating={feedback.rating} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
