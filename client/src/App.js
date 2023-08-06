import Navbar from './components/navabr/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import axios from 'axios';
import Allproducts from './pages/Products/Allproducts';
import CartPage from './pages/Products/CartPage';
import Details from './pages/Details';
import ConfirmOrder from './pages/ConfirmOrder';
import About from './pages/Products/About';
import Login from './pages/Login';
import CreateProduct from './pages/admin/CreateProduct';
import AdminHome from './pages/admin/AdminHome';
import UpdateProduct from './pages/admin/UpdateProduct';
import ViewOrders from './pages/admin/ViewOrders';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import ProtectedUserRoute from './ProtectedUserRoute';
import ViewUsers from './pages/admin/ViewUsers';
import IndUserOrder from './pages/admin/IndUserOrder';
import Myorder from './pages/MyOrders';
function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact="true"></Route>
          <Route path="/about" element={<About />} exact="true"></Route>
          <Route
            path="/single/:id"
            element={<SingleProduct />}
            exact="true"
          ></Route>
          <Route
            path="/products"
            element={<Allproducts />}
            exact="true"
          ></Route>
          <Route path="/cart" element={<CartPage />} exact="true"></Route>
          <Route path="/myorders" element={<Myorder />} exact="true"></Route>
          <Route path="/login" element={<Login />} exact="true"></Route>
          <Route path="/register" element={<Register />} exact="true"></Route>

          <Route
            path="/details"
            element={
              <ProtectedUserRoute>
                <Details />
              </ProtectedUserRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/confirmOrder"
            element={
              <ProtectedUserRoute>
                <ConfirmOrder />
              </ProtectedUserRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/adminpanel"
            element={
              <ProtectedAdminRoute>
                <AdminHome />
              </ProtectedAdminRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/createprod"
            element={
              <ProtectedAdminRoute>
                <CreateProduct />
              </ProtectedAdminRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/update/:id"
            element={
              <ProtectedAdminRoute>
                <UpdateProduct />
              </ProtectedAdminRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/allorders"
            element={
              <ProtectedAdminRoute>
                <ViewOrders />
              </ProtectedAdminRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/allusers"
            element={
              <ProtectedAdminRoute>
                <ViewUsers />
              </ProtectedAdminRoute>
            }
            exact="true"
          ></Route>
          <Route
            path="/induserorder/:id"
            element={
              <ProtectedAdminRoute>
                <IndUserOrder />
              </ProtectedAdminRoute>
            }
            exact="true"
          ></Route>
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
