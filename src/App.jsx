
import { createBrowserRouter,  RouterProvider} from "react-router-dom";
import Home from './Components/Home/Home';
import Root from './Root';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Regsiter from './Components/Regsiter/Regsiter';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
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
        element: <Products/>,
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
     
    </>
  )
}

export default App
