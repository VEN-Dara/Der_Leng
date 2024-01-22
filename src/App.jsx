
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import Login_Page from './views/Login_Page'
import Singin_Page from './views/Singin_Page'
import HomePage from './views/HomePage';
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Login_Page/>,
  },
  {
    path: "/signin",
    element: <Singin_Page/>,
  },
  {
    path: "/home",
    element: <HomePage/>
  },
  

]);

function App () {
   return <RouterProvider router={router}/>
}
  


export default App

