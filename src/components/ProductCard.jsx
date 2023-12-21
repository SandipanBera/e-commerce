import React from "react";
import { Card, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "../createSlice/Cartslice";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastify } from "../feature/index";
import { cart } from "../feature/index";
import "react-toastify/dist/ReactToastify.css";
function ProductCard({
  name,
  image = "https://m.media-amazon.com/images/I/71dKjvLPkAL._AC_UF350,350_QL80_.jpg",
  price,
  slug,
  className = "",
}) {
  const min = 2;
  const max = 5;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const arr = [];
  for (let i = 1; i <= randomNumber; i++) {
    arr.push(i);
  }
  const [present, setPresent] = useState(false);
  useEffect(() => {
    cart
      .getCart()
      .then((response) => response.data.items)
      .then((items) => {
        items.map((item) => {
          if (item.product._id === slug) {
            setPresent(true);
          }
        });
      })
      .catch((error) => console.log(error));
  }, [slug]);

  const discountPercentage = 10;
  // Calculate the actual price
  const actualPrice = price / (1 - discountPercentage / 100);
  let _id = slug;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCart = () => {
    cart
      .addProduct(_id)
      .then((response) => {
        if (response.data) {
          const data = response.data;
          const itemCount = response.data.items.length;
          dispatch(addInCart({ data, itemCount }));
          return data.items
        }
      }).then((items) => {
        items.map((item) => {
          if (item.product._id === slug) {
            setPresent(true);
          }
        });
      })
      .catch((error) => console.log(error));

    toastify.success("Item added in the cart");
  };

  return (
    <Card
      className={`  gap-3  ${className}`}
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc={image}
    >
      <Link to={`/products/${slug}`}>
        {" "}
        <h1 className="md:text-base font-semibold tracking-tight text-gray-900 hover:text-blue-600 dark:text-white text-base">
          {name}
        </h1>
      </Link>

      <div className="mb-2 mt-2 flex items-center">
        <svg
          className="h-4 w-4 text-yellow-300"
          fill={arr[0] ? "currentColor" : ""}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-300"
          fill={arr[1] ? "currentColor" : ""}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-300"
          fill={arr[2] ? "currentColor" : ""}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-300"
          fill={arr[3] ? "currentColor" : ""}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-4 w-4 text-yellow-300"
          fill={arr[4] ? "currentColor" : ""}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 ">
          {`${randomNumber}.0`}
        </span>
      </div>
      <div className="flex  items-center justify-between gap-x-2">
        <div className="flex items-center ">
          <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-2xl lg:pr-2  2xl:pr-0 ">
            &#8377;{price}
          </div>
          <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base ">
            &#8377;{Math.floor(actualPrice)}
          </span>
        </div>
      </div>
      {!present ? (
        <Button onClick={addCart} className="mt-3 w-full rounded-sm">
          Add to Cart
        </Button>
      ) : (
        <Button
          onClick={() => navigate("/products/cart")}
          className="mt-3 w-full rounded-sm"
        >
          Go to Cart
        </Button>
      )}
    </Card>
  );
}

export default ProductCard;
