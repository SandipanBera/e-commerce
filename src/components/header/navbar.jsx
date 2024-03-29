import React, { useRef } from "react";
import shoppingCart from "/shopping_cart_full.png";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/debounce";
import { setSearchQuery } from "../../createSlice/Searchslice";
import { category } from "../../feature/index";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../feature";
import { clearCart } from "../../createSlice/Cartslice";
import Search from "../Search";
import { logout } from "../../createSlice/Authslice";
import FormModal from "../modal/FormModal";

function Flownavbar() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const cartItem = useSelector((state) => state.cart.itemCount);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  // Debouncing the search query to avoid unnecessary API calls when user is typing fast
  const debounce = useDebounce(search);
  useEffect(() => {
    dispatch(setSearchQuery(debounce));
  }, [debounce, dispatch]);
  const handleChange = () => {
    setSearch(ref.current.value);
  };
  useEffect(() => {
    category
      .getAllCategories()
      .then((response) => setCategories(response.data.categories));
  }, []);
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
      active: auth.status,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !auth.status,
    },
    {
      name: "Sign In",
      slug: "/signin",
      active: !auth.status,
    },
  ];
  return (
    <>
      <Navbar fluid>
        <Navbar.Brand>
          <img
            src={shoppingCart}
            className="mr-3 h-6 sm:h-9"
            alt="E-Bazzar Logo"
          />
          <span className="self-center text-blue-900 whitespace-nowrap text-xl font-semibold dark:text-white">
            E-Bazzar
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-3 items-center">
          <Search ref={ref} handleChange={handleChange} />
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
          <FormModal openModal={openModal} setOpenModal={setOpenModal} />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              auth?.userData?.avatar ? (
                <Avatar
                  alt="User settings"
                  img={auth?.userData?.avatar?.url}
                  rounded
                  className="w-10 h-10"
                />
              ) : (
                <Avatar alt="User settings" rounded />
              )
            }
          >
            {auth?.status ? (
              <Dropdown.Header>
                <span className="block text-sm">{auth.userData.username}</span>
                <span className="block truncate text-sm font-medium">
                  {auth.userData.email}
                </span>
              </Dropdown.Header>
            ) : (
              <Dropdown.Header>
                <span className="block text-sm">username</span>
                <span className="block truncate text-sm font-medium">
                  user@gmail.com
                </span>
              </Dropdown.Header>
            )}

            <Dropdown.Item>dashboard</Dropdown.Item>
            <Link to={"/address"}>
              {" "}
              <Dropdown.Item>Address</Dropdown.Item>
            </Link>
            <Link to={"/user/profile"}>
              {" "}
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            {auth?.status && (
              <Dropdown.Item onClick={() => setOpenModal(true)}>
                Change Password
              </Dropdown.Item>
            )}
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                authService
                  .logoutUser()
                  .then((response) => {
                    if (response.statusCode === 200) {
                      dispatch(clearCart());
                      dispatch(logout());
                      navigate("/");
                    } else {
                      throw "Something went wrong. Please try again.";
                    }
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
          {navItem
            .filter((item) => item.active && item)
            .map((item) =>
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
                <div
                  key={item.name}
                  className="text-lg text-gray-700  md:border-0 md:hover:bg-transparent md:hover:text-cyan-700"
                >
                  {" "}
                  <Dropdown
                    label={item.name}
                    content="text-lg"
                    className="w-44"
                    inline
                  >
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/categories/${category._id}`}
                      >
                        <Dropdown.Item>{category.name}</Dropdown.Item>
                      </Link>
                    ))}
                  </Dropdown>
                </div>
              )
            )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Flownavbar;
