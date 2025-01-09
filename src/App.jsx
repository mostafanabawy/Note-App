import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home/Home"
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Layout from "./components/Layout/Layout"
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import UserProvider from "./context/User/User.context"


function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
      children:
        [
          { path: "/", element: <Home /> }
        ]
    },
    {
      path: "/", element: <GuestRoute> <Layout /> </GuestRoute>,
      children:
        [
          { path: "/signup", element: <Signup /> },
          { path: "/login", element: <Login /> }
        ]
    }
  ])
  return <>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
      <Toaster />
  </>
}

export default App
