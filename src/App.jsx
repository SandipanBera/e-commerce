import { default as Headers } from "./components/header/Navbar";
import { default as Footers } from "./components/footer/footer";
import Categorylist from "./components/header/Categorylist";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { cart } from "./feature";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addInCart } from "./createSlice/Cartslice";

function App() { 
  const dispatch = useDispatch()
  // Fetching the cart data when the app loads for the first time.
 useEffect(() => {
   cart.getCart().then(response => {
     if (response) {
       const data = response.data;
       const itemCount = response.data.items.length
       dispatch(addInCart({data,itemCount}))
    }
  }).catch(error=>console.log(error))
 }, [dispatch])
 
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-200 dark:bg-slate-900 w-full ">
        <div className="w-full block">
          <div className="sticky top-0 z-20">
             <Headers  />
            <Categorylist />
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
