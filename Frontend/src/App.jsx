import React from 'react'
import Home from './home/Home';
import {Navigate, Route, Routes} from "react-router-dom";
import Courses from './courses/Courses';
import Signup from './components/Signup';
import Contact from "./components/Contact";
import About from "./components/About";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthProvider";
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart.jsx';
import AdminRoute from "./froutes/fAdminRoute";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminBooks from "./pages/adminpages/AdminBooks";
import Admin from "./pages/Admin";
import MyOrders from './pages/MyOrders.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  const [authUser, setAuthUser] = useAuth(); // get authUser and setAuthUser from context
  console.log(authUser);
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>

      <Route path="/" element={<Home />}/>
      <Route path="/courses" element={authUser?<Courses />:<Navigate to="/signup"/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/admin"
        element={
          authUser?.role === "admin"
            ? <Admin />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <AdminRoute>
            <AdminBooks />
          </AdminRoute>
        }
      />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App;
