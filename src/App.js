import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// using boostrap css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

// admin layout
import AdminLayout from './layouts/AdminLayout';
import DashBoard from './pages/admin/DashBoard';
import User from './pages/admin/user/User';
import CUUser from './pages/admin/user/CUUser';
import Post from './pages/admin/post/Post';
import CUPost from './pages/admin/post/CUPost';
import RevenueStatistic from './pages/admin/statistical/RevenueStatistic';
import ProductStatistic from './pages/admin/statistical/ProductStatistic';
import NotFound from './pages/404';
import ProductList from './pages/admin/product/ProductList';
import AddProduct from './pages/admin/product/AddProduct';
import ProductAttribute from './pages/admin/product/ProductAttribute';
import BillOfSale from './pages/admin/bill/BillOfSale';

// user layout
import GuestLayout from './layouts/GuestLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProductDetail from './pages/guest/ProductDetail';
import Profile from './pages/guest/Profile';
import ProductFavorite from './pages/guest/ProductFavorite';
import UserOrder from './pages/guest/UserOrder';
import SearchProduct from './pages/guest/SearchProduct';
import HomePage from './pages/guest/HomePage';
import ProductDetailList from './pages/guest/ProductDetailList';
import ShoppingCart from './pages/guest/ShoppingCart';
import BillDetail from './pages/admin/bill/BillDetail';
const Home = () => <h3>Home</h3>;

class App extends Component {
  render() {
    let level = undefined;
    if (this.props.auth.authenticated) {
      level = this.props.auth.user.level;
    }

    const redirectToLogin = (props) => {
      return (
        <Redirect to={{
          pathname: "/user/signin",
          // state: { from: history.location }
          state: { from: props.location }
        }} />
      )
    }

    return (
      <Router>
        {/* su dung switch de tim duong dan dau tien match */}
        <Switch>
          {/* route admin */}
          {/* {user && user.level == 2 && routes.admin.map((route) => routeAdmin(route))} */}
          <Route exact path="/admin/dashboard" render={props => level && level === 2 ? (
            <AdminLayout>
              <DashBoard {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/users" render={props => level && level === 2 ? (
            <AdminLayout>
              <User {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/users/new" render={props => level && level === 2 ? (
            <AdminLayout>
              <CUUser {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/posts" render={props => level && level === 2 ? (
            <AdminLayout>
              <Post {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/posts/new" render={props => level && level === 2 ? (
            <AdminLayout>
              <CUPost {...props} newPost={true} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/posts/edit/:id" render={props => level && level === 2 ? (
            <AdminLayout>
              <CUPost {...props} newPost={false} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/products" render={props => level && level === 2 ? (
            <AdminLayout>
              <ProductList {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/product/add" render={props => level && level === 2 ? (
            <AdminLayout>
              <AddProduct {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/product/attributes" render={props => level && level === 2 ? (
            <AdminLayout>
              <ProductAttribute {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/bills" render={props => level && level === 2 ? (
            <AdminLayout>
              <BillOfSale {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/bill/:id/detail" render={props => level && level === 2 ? (
            <AdminLayout>
              <BillDetail {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/statistical/revenue" render={props => level && level === 2 ? (
            <AdminLayout>
              <RevenueStatistic {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />
          <Route exact path="/admin/statistical/product" render={props => level && level === 2 ? (
            <AdminLayout>
              <ProductStatistic {...props} />
            </AdminLayout>
          ) : (
              redirectToLogin(props)
            )} />

          {/* route guest */}
          {/* {routes.guest.map((route) => routeGuest(route))} */}
          <Route exact path="/" render={props => (
            <GuestLayout>
              <HomePage {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/user/signin" render={props => (
            <GuestLayout>
              <SignIn {...props} handleLogIn={this.handleLogIn} />
            </GuestLayout>
          )} />
          <Route exact path="/user/signup" render={props => (
            <GuestLayout>
              <SignUp {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/user/forgotpassword" render={props => (
            <GuestLayout>
              <ForgotPassword {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/user/account" render={props => (
            <GuestLayout>
              <Profile />
            </GuestLayout>
          )} />
          <Route exact path="/user/orders" render={props => (
            <GuestLayout>
              <UserOrder />
            </GuestLayout>
          )} />
          <Route exact path="/user/favorites" render={props => (
            <GuestLayout>
              <ProductFavorite />
            </GuestLayout>
          )} />
          <Route exact path="/user/cart" render={props => (
            <GuestLayout>
              <ShoppingCart />
            </GuestLayout>
          )} />
          <Route exact path="/product/search" render={props => (
            <GuestLayout>
              <SearchProduct {...props} />
            </GuestLayout>
          )} />
          <Route exact path="/product/detail/:id" render={props => (
            <GuestLayout>
              <ProductDetail {...props} />
            </GuestLayout>
          )} />

          <Route exact path="/home/productlist/:product_type_id" render={(props) => (
            <GuestLayout >
              <ProductDetailList {...props} />
            </GuestLayout>
          )} />

          <Route exact component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
