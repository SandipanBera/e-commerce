import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import Home from "./page/Home.jsx";
import Category from "./page/Category.jsx";
import Product from "./page/Product.jsx";
import Checkout from "./page/Checkout.jsx";
import Cart from "./page/Cart.jsx";
import Payment from "./page/Payment.jsx";
import Editaddress from "./page/address/Editaddress.jsx";
import Createaddress from "./page/address/Createaddress.jsx";
import Address from "./page/address/Address.jsx";
import OrderSummary from "./page/OrderSummary.jsx";
import SignUp from "./page/SignUp.jsx";
import SignIn from "./page/SignIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element:<SignUp />
      },
      {
        path: "/signin",
        element:<SignIn />

      },
      {
        path: "/address",
        element:<Address />

      },
      {
        path: "address/create",
        element: <Createaddress />,
      },
      {
        path: "address/edit/:slug",
        element: <Editaddress />,
      },
      {
        path: "categories/:slug",
        element: <Category />,
      },
      {
        path: "products/:slug",
        element: <Product />,
      },
      {
        path: "products/cart",
        element: <Cart />,
      },
      {
        path: "products/checkout",
        element: <Checkout />,
      },
      {
        path: "products/payment",
        element: <Payment />,
      },
      {
        path: "products/payment/order_summary",
        element:<OrderSummary />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
