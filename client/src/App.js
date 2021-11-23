import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Headers from "./components/nav/Header";
import CompleteRegister from "./pages/auth/RegisterComplete";
import History from "./pages/user/History";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";

import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import Category from "./pages/admin/Category/Category";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import SubCategory from "./pages/admin/SubCategory/SubCategory";
import ProductCreate from "./pages/admin/Product/ProductCreate";
import GetEditProducts from "./pages/admin/Product/GetEditProducts";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./functions/auth";
import ProductUpdate from "./pages/admin/Product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategoryHome from "./pages/subcat/SubCatHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCoupon";
import Payment from "./pages/Payment";
import PaymentStatus from "./pages/PaymentStatus";
import AllOrders from "./pages/admin/orders/AllOrders";
import Phone from "./components/nav/phone";
import Footer from "./pages/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        //sending token to get user
        currentUser(idTokenResult.token)
          .then((res) =>
            //dispatch data
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            })
          )
          .catch((error) => {
            console.log(error);
          });
      }
    });
    return () => unsubscribe();
  });
  return (
    <>
      <Headers />

      <SideDrawer />
      <ToastContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/register/completeregister"
          component={CompleteRegister}
        />

        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subCat/:slug" component={SubCategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/passwordUpdate" component={Password} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/Payment" component={Payment} />
        <UserRoute exact path="/status/:orderId" component={PaymentStatus} />
        <UserRoute exact path="/user/orderhistory" component={History} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={Category} />
        <AdminRoute exact path="/admin/subcategory" component={SubCategory} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute
          exact
          path="/admin/getproducts"
          component={GetEditProducts}
        />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <AdminRoute exact path="/admin/orders" component={AllOrders} />
      </Switch>
      <Footer />
      <Phone />
    </>
  );
};

export default App;
