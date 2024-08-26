import './App.css'
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
import Addblog from './pages/Addblog';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import EditCat from './pages/EditCat';

function App() {
  return <Router>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/reset-password' element={<Resetpassword/>} />
      <Route path='/forgot-password' element={<Forgotpassword/>} />
      <Route path='/admin' element={<MainLayout/>} >
        <Route index element={<Dashboard/>} />
        <Route path='orders' element={<Orders/>} />
        <Route path='customers' element={<Customers/>} />
        <Route path='list-category' element={<Categorylist/>} />
        <Route path='category' element={<Addcat/>} />
        <Route path='list-brand' element={<Brandlist/>} />
        <Route path='brand' element={<Addbrand/>} />
        <Route path='product-list' element={<Productlist/>} />
        <Route path='product' element={<Addproduct/>} />
        <Route path='editCat/:categoryID' element={<EditCat />} />
      </Route>
    </Routes>
  </Router>
}

export default App;
