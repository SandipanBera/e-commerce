import React from "react";
import { useState } from "react";
import { LuTrash2, LuArrowLeft } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { cart, toastify } from "../feature/index";
import { useNavigate, Link } from "react-router-dom";
import { addInCart, clearCart, removeCart } from "../createSlice/Cartslice";
import Modals from "../components/modal/Modals";
function Cart() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const discountPercentage = 0.1;
  const [cartItems, setCartItems] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [itemEdit, setitemEdit] = useState({
    id: "",
    status: false,
  });
  const handleClick = (id) => {
    setitemEdit({ id: id, status: true });
  };
  const handleClearCart = () => {
    cart
      .clearCart()
      .then((response) => {
        if (response.success) {
          dispatch(clearCart());
          setOpenModal(false);
        }
      })
      .catch((error) => console.log(error));
  };
  return data && data.items.length > 0 ? (
    <div className="mx-auto max-w-full px-2 lg:px-0 bg-white shadow-lg ">
      <Modals
        openModal={openModal}
        setOpenModal={setOpenModal}
        cb={handleClearCart}
        bodyText={`Are you sure want to clear your cart?`}
        btn1={`Yes, I'm sure`}
        btn2={` No, cancel`}
      />
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="cart-heading"
            className="rounded-lg bg-white lg:col-span-8"
          >
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {data.items.map((item) => (
                <div key={item.product._id} className="">
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.mainImage.url}
                        alt={item.product.name}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center aspect-[4/3]"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 top-3">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={`/products/${item.product._id}`}
                                className="font-semibold text-black"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-xs font-medium text-gray-500 line-through">
                              &#8377;
                              {(
                                item.product.price /
                                (1 - discountPercentage)
                              ).toFixed(0)}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;
                              {item.product.price
                                .toLocaleString("en-GB", {
                                  style: "currency",
                                  currency: "INR",
                                })
                                .slice(0, -3)}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-green-500">
                              10%
                            </p>
                            {/* //todo discount should be dynamic check later */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      {item.quantity <= 1 ? (
                        <button
                          type="button"
                          className="h-7 w-7 opacity-50"
                          disabled
                        >
                          -
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() => {
                            cart
                              .addProduct(item.product._id, item.quantity - 1)
                              .then((response) => response.data)
                              .then((data) => dispatch(addInCart({ data })))
                              .catch((error) => console.log(error));
                          }}
                        >
                          -
                        </button>
                      )}
                      <input
                        type="text"
                        value={
                          itemEdit.status && itemEdit.id === item.product._id
                            ? cartItems
                            : item.quantity
                        }
                        onChange={(e) => {
                          setCartItems(e.target.value);
                          cart
                            .addProduct(item.product._id, e.target.value)
                            .then((response) => response.data)
                            .then((data) => dispatch(addInCart({ data })))
                            .catch((error) => console.log(error));
                        }}
                        onClick={() => {
                          handleClick(item.product._id);
                          setCartItems("");
                        }}
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                      />
                      {item.quantity >= item.product.stock ? (
                        <button
                          type="button"
                          className="h-7 w-7 opacity-50"
                          disabled
                        >
                          +
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() => {
                            cart
                              .addProduct(item.product._id, item.quantity + 1)
                              .then((response) => response.data)
                              .then((data) => dispatch(addInCart({ data })))
                              .catch((error) => console.log(error));
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button
                        type="button"
                        className="flex items-center space-x-1 px-2 py-1 pl-0"
                        onClick={() => {
                          cart
                            .removeProduct(item.product._id)
                            .then((response) => response.data)
                            .then((data) => dispatch(addInCart({ data })))
                            .catch((error) => console.log(error));
                          let id = item.product._id;
                          let price = item.product.price;
                          dispatch(removeCart({ id, price }));
                          toastify.remove("Item has been removed");
                        }}
                      >
                        <LuTrash2 size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
            <div className="flex mt-8 pl-3">
              {" "}
              <button
                type="button"
                className="rounded-md  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Clear cart
              </button>
            </div>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">{`Price (${data.items.length.toString()}item)`}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{data.cartTotal}{" "}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">
                    ₹{Math.floor(data.cartTotal * discountPercentage)}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ₹{data.cartTotal}{" "}
                  </dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                {`You will save ₹ ${Math.floor(
                  data.cartTotal * discountPercentage
                )} on this order`}
              </div>
              <div className="flex justify-between mt-7">
                {" "}
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => navigate("/products/checkout")}
                >
                  Checkout
                </button>
                {/* /products/checkout */}
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  ) : (
    <div className="py-12 h-96">
      <div className="text-center">
        <p className="text-2xl font-bold sm:text-5xl text-black">Oops!</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Your cart is empty
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Continue shopping to add product
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <LuArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
