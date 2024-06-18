import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
} from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";
import HomePage from "./pages/homepage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FavoritesPage from "./pages/FavoritesPage";
import MainLayout from "./pages/MainLayout";
import AiWithImage from "./components/AiWIthImage";

const router = createBrowserRouter([
  {
    path: "/",
    element: [<NavBar/>,<HomePage/>]
  },
  {
    path: "/pub/:id",
    element: [<NavBar/>,<DetailPage/>]
  },
  {
    path: "/login",
    element: [<NavBar/>,<LoginPage/>],
    loader: () => {
      if(localStorage.getItem('token')){
        return redirect('/')
      }
      return null
    }
  },
  {
    path: "/register",
    element: [<NavBar/>,<RegisterPage/>]
  },
  {
    element: <MainLayout/>,
    loader: () => {
      if(!localStorage.getItem('token')){
        return redirect('/login')
      }
      return null
    },
    children: [
      {
      path: "/favorites",
      element: <FavoritesPage/>
    },
    {
      path: "/ai",
      element: <AiWithImage/>
    },
  ]
  },
  
]);

const App = () => {
   return <RouterProvider router={router} /> 
}

export default App
