
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import Login_Page from './views/Login_Page'
import Singin_Page from './views/Singin_Page'
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Login_Page/>,
  },
  {
    path: "/signin",
    element: <Singin_Page/>,
  },
]);

function App () {
   return <RouterProvider router={router}/>
}
  
// const App = () => {
//   return (
//     <div>
//        <Login_Page/>
//     </div>
//   )
// }

export default App

