import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { category } from "../../feature/index";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, cart } from "../../feature";
import { clearCart } from "../../createSlice/Cartslice";

function Flownavbar({ profile }) {
  // const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.itemCount);
  const [categories, setCategories] = useState([]); 
  useEffect(() => {
      category.getAllCategories().then((response)=>setCategories(response.data.categories))
  }, [])
  
  const [userData, setUserdata] = useState({
    username: "User",
    email: "user@gmail.com",
    avatar: null,
  });

  //todo add role
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Category",
      active: true,
    },

    {
      name: "Order",
      slug: "/order",
      // active: authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      // active: !authStatus,
    },
    {
      name: "Sign In",
      slug: "/signin",
      // active: !authStatus,
    },
  ];
  return (
    <>
      <Navbar fluid>
        <Navbar.Brand>
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center text-blue-900 whitespace-nowrap text-xl font-semibold dark:text-white">
            E-Bazzar
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-3">
          <button
            type="button"
            onClick={() => navigate("/products/cart")}
            className="relative inline-flex items-center p-3 text-sm font-medium text-center dark:text-white  rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:hover:bg-blue-70 text-slate-900 dark:focus:ring-slate-700 dark:hover:bg-slate-700  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart h-6 w-6"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="sr-only">cart</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {cartItem}
            </div>
          </button>

          <Dropdown
            arrowIcon={false}
            inline
            label={
              userData.avatar ? (
                <Avatar alt="User settings" img={userData.avatar} rounded />
              ) : (
                <Avatar alt="User settings" rounded />
              )
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userData.username}</span>
              <span className="block truncate text-sm font-medium">
                {userData.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Link to={"/address"}>
              {" "}
              <Dropdown.Item>Address</Dropdown.Item>
            </Link>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                authService
                  .logoutUser()
                  .then((response) => {
                    response.success && navigate("/");
                    dispatch(clearCart());
                  })
                  .catch((error) => console.log(error));
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {navItem.map((item) =>
            item.name !== "Category" ? (
              <Navbar.Link
                as={Link}
                key={item.name}
                to={item.slug}
                className="text-lg"
              >
                {item.name}
              </Navbar.Link>
            ) : (
                <Dropdown key={item.name} label={item.name} className="w-44" content="text-lg" inline>
                  {categories.map((category) => (<Link key={category._id} to={`/categories/${category._id}`} >
                    <Dropdown.Item>{category.name}</Dropdown.Item>
                  </Link>))}
       
              
              </Dropdown>
            )
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Flownavbar;
