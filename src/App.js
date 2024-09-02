import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import EditCat from './pages/EditCat';
import SignUp from './pages/SignUp';
import Roles from './pages/Roles';
import EditProduct from './pages/EditProduct'; 
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<Resetpassword />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='customers' element={<Customers />} />
          <Route path='list-category' element={<Categorylist />} />
          <Route path='category' element={<Addcat />} />
          <Route path='list-brand' element={<Brandlist />} />
          <Route path='brand' element={<Addbrand />} />
          <Route path='product-list' element={<Productlist />} />
          <Route path='product' element={<Addproduct />} />
          <Route path='editCat/:categoryID' element={<EditCat />} />
          <Route path='roles' element={<Roles />} /> 
          <Route path='edit-product/:id' element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
