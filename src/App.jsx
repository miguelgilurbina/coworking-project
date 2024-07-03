import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/Context';
import { FavoriteProvider } from './Components/Context/FavoriteContext';
import { BookingProvider } from './Components/Context/BookingContext';
import { routes } from './Components/utils/routes';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Detail from './Pages/Detail';
import Login from './Pages/Login';
import Register from './Pages/Register';
import TableEditRooms from './Pages/TableEditRooms';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import Footer from './Components/footer';
import EditProducts from './Components/EditProducts';
import CharacteristicForm from './Components/CharacteristicForm';
import ProductForm from './Components/ProductForm';
import UsersList from './Components/UsersList';
import CategoryForm from './Components/CategoryForm';
import CategoryList from './Components/CategoryList';
import FavoriteList from './Components/FavoriteList';
import ProductList from './Components/ProductList';
import PrivateRoute from './Components/utils/PrivateRoute';
import Booking from './Components/Booking';
import BookingForm from './Components/BookingForm';

function App() {
  return (
    <>
      <AuthProvider>
        <FavoriteProvider>
          <BookingProvider>
            <div className="d-flex">
              <Header />
              <div className="background-image"></div>
              <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.admin} element={<PrivateRoute element={Admin} isAdminRoute />} />
                <Route path={routes.detail} element={<Detail />} />
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.register} element={<Register />} />
                <Route path={routes.editRoom} element={<EditProducts />} />
                <Route path={routes.characteristicForm} element={<CharacteristicForm />} />
                <Route path={routes.productForm} element={<ProductForm />} />
                <Route path={routes.usersList} element={<PrivateRoute element={UsersList} />} />
                <Route path={routes.profile} element={<PrivateRoute element={Profile} />} />
                <Route path={routes.addCategory} element={<PrivateRoute element={CategoryForm} />} />
                <Route path={routes.categoryList} element={<PrivateRoute element={CategoryList} />} />
                <Route path={routes.favoriteList} element={<PrivateRoute element={FavoriteList} />} />
                <Route path={routes.productList} element={<PrivateRoute element={ProductList} />} />
                <Route path={routes.booking} element={<PrivateRoute element={Booking} />} />
                <Route path={routes.bookingForm} element={<PrivateRoute element={BookingForm} />} />
                <Route path="*" element={<Navigate to={routes.home} />} />
              </Routes>
            </div>
            <Footer />
          </BookingProvider>
        </FavoriteProvider>
      </AuthProvider>
    </>
  );
}

export default App;