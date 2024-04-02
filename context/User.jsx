import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
 export const UserContext = createContext();
 
 const UserContextProvider=({children})=>{
    const [userToken,setUserToken]= useState(localStorage.getItem('userToken'));
    const [userName,setUserName]= useState(null);
    const [userImage, setUserImage] = useState(null);

    const getUserData= ()=>{
        if(userToken!=null){
            const decoded = jwtDecode(userToken);
            setUserName(decoded.userName);
            setUserImage(decoded.userImage);
        }
    };
    useEffect( ()=>{
        getUserData();
    },[userToken]);
    return  <UserContext.Provider value={{setUserToken,userName,setUserName,userToken, userImage}} >
        {children}
    </UserContext.Provider>
 };

 export default UserContextProvider;