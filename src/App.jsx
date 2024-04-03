
import { createBrowserRouter,  RouterProvider} from "react-router-dom";
import Home from './Components/Home/Home';
import Root from './Root';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Regsiter from './Components/Regsiter/Regsiter';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import { ToastContainer } from "react-toastify";
import ProtectedRouter from "./ProtectedRouter/ProtectedRouter";
import { useState } from "react";
import UserContextProvider from "../context/User";
import CategoryProducts from "./Components/Categories/CategoryProducts";
import ProductInfo from "./Components/Products/ProductInfo";
import Order from "./Components/Cart/Order";
import OrderInfo from "./Components/Cart/OrderInfo";
import UserProfile from "./Components/Profile/UserProfile";
import ForgetPass from "./Components/Login/SendCode";
import SendCode from "./Components/Login/SendCode";
import ForgetPassword from "./Components/Login/ForgetPassword";

function App() {

const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "categories",
        element: <Categories/>,
       
      },
      {
        path: "login",
        element:
         <Login/>
         
         ,
      },
      {
        path: "register",  
        element: <Regsiter/>,
      },
      {
        path: "cart",
        element:
        <UserContextProvider>
         <Cart/>
         </UserContextProvider>
         ,
      },
      {
        path: "products",
        element:
       
        <Products />   
      },
      {
        path: "Order",
        element:
       
        <Order/>
        
      },
      {
        path:'/categories/:id',
        element:<CategoryProducts/>
      },
      
      {
        path:'/ProductInfo/:id',
        element:<ProductInfo/>
      },
      {
        path:'/myorder',
        element:<OrderInfo/>
      },
      {
        path:'/userprofile',
        element:<UserProfile/>
      },
      {
        path:'/sendcode',
        element:<SendCode/>
      },
      {
        path:'/forgetpassword',
        element:<ForgetPassword/>
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  },
]);

  return (
    <>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
    <ToastContainer />
      
     
    </>
  )
}

export default App
