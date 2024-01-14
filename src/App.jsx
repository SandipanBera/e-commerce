import { default as Headers } from "./components/header/Navbar";
import { default as Footers } from "./components/footer/footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { cart, address, authService } from "./feature";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addInCart } from "./createSlice/Cartslice";
import { setAddresses } from "./createSlice/Addressslice";
import { login } from "./createSlice/Authslice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Fetching the cart data when the app loads for the first time.
  useEffect(() => {
    if (auth.status) {
      cart
        .getCart()
        .then((response) => {
          if (response) {
            const data = response.data;
            const itemCount = response.data.items.length;
            dispatch(addInCart({ data, itemCount }));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, auth.status]);
  // Fetching the address data when the app loads for the first time.
  useEffect(() => {
    if (auth.status) {
      address
        .getAddress()
        .then((response) => {
          if (response) {
            const data = response.data;
            dispatch(setAddresses(data));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, auth.status]);
  useEffect(() => {
    authService
      .currentUser()
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(login(response.data));
        } else {
          throw "Something went wrong. Please try again.";
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-200 dark:bg-slate-900 w-full ">
        <div className="w-full block min-h-screen ">
          <div className="sticky top-0 z-20">
            <Headers />
          </div>
          <main>
            <Outlet />
          </main>
          <Footers />
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
