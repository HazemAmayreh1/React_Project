
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

function App() {
const [userName,setUserName]= useState('Hazem');
const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Root userName={userName} />,
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
        element: <Login/>,
      },
      {
        path: "register",  
        element: <Regsiter/>,
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "products",
        element:
        <ProtectedRouter>
        <Products userName={userName}/>
        </ProtectedRouter>
        
         
        
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
      <RouterProvider router={router} />
      <ToastContainer />
      
     
    </>
  )
}

export default App
