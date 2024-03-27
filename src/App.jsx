
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
        path:'/categories/:id',
        element:<CategoryProducts/>
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
