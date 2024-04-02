import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userProfile.css'
import Loader from '../../../loader/Loader';
import OrderInfo from '../Cart/OrderInfo';
import { NavLink, useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const UserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/user/profile`, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        setUserData(response.data); 
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false); 
      }
    };
    UserData(); 
  }, []);

  if (isLoading) return <Loader/>;

  return (
    <div className="hero">
    <div className="user-profile">
    <h1 className='userprofile-title'>My Profile</h1>
    <img src={userData.user.image.secure_url} alt={`${userData.user.userName}'s profile`} className="user-image" />
    <h1 className="user-name">{userData.user.userName}</h1>
    <p className="user-email">{userData.user.email}</p>
    <NavLink to={`/myorder`}>        
  <button className="btn bt-light">GO TO ORDER</button>   
        </NavLink>   
  </div>
  </div>
  
  );
}

export default UserProfile;
