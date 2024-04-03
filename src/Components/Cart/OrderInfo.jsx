import React, { useEffect, useState } from "react";
import axios from "axios";
import './OrderInfo.css'
import Loader from "../../../loader/Loader";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink} from "react-router-dom";

function OrderInfo() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    setLoader(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(data);
      setOrders(data.orders);
    } catch (error) {
      toast.error(`Failed to fetch order data: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <Loader />;
  }
  const cancelFromOrder = async (orderid) => {
    setLoader(true);
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API}/order/cancel/${orderid}`, 
        {
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      toast.success("order Canceled successfully", {
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
      getAllOrder ();
    } catch (error) {
      toast.error("Error Cancel Order", {
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
    } finally {
      setLoader(false);
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case 'cancelled':
        return { color: 'red' };
      case 'pending':
        return { color: 'blue' } ;
      default:
        return { color: 'green' };
    }
  };
  

  return (
    <div className="order-list">
      <div className="order-header">
        <h1 className="header-order-title">MY ORDERS</h1>
      </div>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-status">
           Order Status: <strong style={getStatusStyle(order.status)}>{order.status}</strong>
           {order.status === 'pending' && <strong> - Wait to accept</strong>}
          </div>

          <div className="order-info">
            <p>Request Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Phone: {order.phoneNumber}</p>
            <p>Address: {order.address}</p>
          </div>
          {
      order.status == 'pending' && (
        <button
        className="Cancel-button"
       onClick={() => cancelFromOrder(order._id)}
        >
        Cancel
        </button>
  )
}


          <div className="order-summary">
            <h3>Product</h3>
            {order.products.map((product) => (
              <div key={product._id} className="order-item">
                <div className="product-info">
                  <img
                    src={product.productId.mainImage.secure_url}
                    alt={product.productId.name}
                    className="product-image"
                  />
                  <span className="product-name">{product.productId.name}</span>
                </div>
                <span className="product-quantity">
                  Quantity: {product.quantity}
                </span>
                <span className="product-unit-price">
                  Unit Price: ${product.unitPrice.toFixed(2)}
                </span>
                <span className="product-final-price">
                  Final Price: ${product.finalPrice.toFixed(2)}
                </span>
                
              </div>
            ))}
        
          
            <div className="order-total">
              <span>
                Total Items:{" "}
                {order.products.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </span>
              {
      order.status !== 'cancelled' &&(
           <span className="total-final-price">
                Total Price: ${order.finalPrice.toFixed(2)}
              </span> 
               
  )
}
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderInfo;
