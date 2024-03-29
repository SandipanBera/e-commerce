import React, { useState, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import options from "../option/option";
import { useDispatch, useSelector } from "react-redux";
import {  Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  cart,
  coupon,
  toastify,
  profile,
  address,
  order,
} from "../feature/index";
import { addInCart, removeCart } from "../createSlice/Cartslice";
import { IoWarningOutline } from "react-icons/io5";
import { addShipingAddress } from "../createSlice/Shiping_address_slice";
export function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [addressesId, setAddressesId] = useState(null);
  const cartData = useSelector((state) => state.cart.data);
  const auth = useSelector((state) => state.auth);
const navigate=useNavigate()
  const [couponCode, setCouponCode] = useState(
    cartData?.coupon?.couponCode || ""
  );
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (auth.status) {
      profile
        .getProfile()
        .then((response) => {
          reset({
            name:
              response?.data?.firstName + " " + response?.data?.lastName || "",
            mobile: response?.data?.phoneNumber || "",
          });
        })
        .catch((error) => console.log(error));
    }
  }, [auth.status, reset]);
  useEffect(() => {
    if (auth.status) {
      address
        .getAddress()
        .then((response) => {
          setAddresses([...response.data.addresses]);
          setAddressesId(response?.data?.addresses[0]?._id);
          reset({
            addressLine1: response?.data?.addresses[0]?.addressLine1 || "",
            addressLine2: response?.data?.addresses[0]?.addressLine2 || "",
            city: response?.data?.addresses[0]?.city || "",
            state: response?.data?.addresses[0]?.state || "",
            pincode: response?.data?.addresses[0]?.pincode || "",
          });
        })
        .catch((error) => console.log(error));
    }
  }, [auth.status, reset]);
  const handleChange = (e) => {
    setAddressesId(addresses[e.target.value]?._id);
    reset({
      addressLine1: addresses[e.target.value]?.addressLine1 || "",
      addressLine2: addresses[e.target.value]?.addressLine2 || "",
      city: addresses[e.target.value]?.city || "",
      state: addresses[e.target.value]?.state || "",
      pincode: addresses[e.target.value]?.pincode || "",
    });
  };

  const onSubmit = (data,e) => {
    dispatch(addShipingAddress(data));
    order
      .placeOrder(addressesId)
      .then((response) => {
        console.log(response)
        const options = {
          "key": "rzp_test_657ZishMCl6LQp", // Enter the Key ID generated from the Dashboard
          "amount": response.data.ammount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Acme Corp",
          "description": "Test Transaction",
          "image": "http://localhost:5173/shopping_cart_full.png",
          "order_id": response.data.id,
          "handler": function (response){
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
            navigate("/products/payment/order_summary")
          },
          "prefill": {
              "name": "sandipan bera",
              "email": "gaurav.kumar@example.com",
              "contact": "8116744279"
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
        rzp1.open();
        e.preventDefault();
      })
      .catch((error) => console.log(error));
  };
  return (
    cartData && (
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden  rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="px-5 py-6 text-gray-900 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div>
                          <h3
                            id="contact-info-heading"
                            className="text-lg font-semibold text-gray-900"
                          >
                            Contact information
                          </h3>

                          <div className="mt-4 w-full flex flex-col gap-y-4">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              Full Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your name"
                              id="name"
                              {...register("name", {
                                required: "  This field is required",
                              })}
                            />

                            {errors.name && (
                              <p className="text-red-600 mt-2 inline-flex items-center">
                                <IoWarningOutline />
                                This field is required
                              </p>
                            )}
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="mobile"
                            >
                              Mobile
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="91XXXXXX45"
                              id="mobile"
                              {...register("mobile", {
                                required: "  This field is required",
                              })}
                            />
                            {errors.mobile && (
                              <p className="text-red-600 mt-2 inline-flex items-center">
                                <IoWarningOutline />
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>

                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Shipping address
                          </h3>
                          <select
                            id="state"
                            className="flex h-10 mt-3 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={handleChange}
                          >
                            {addresses?.map((address, index) => (
                              <option
                                className="w-full"
                                key={address._id}
                                value={index}
                              >
                                {`address ${index + 1}`}
                              </option>
                            ))}
                          </select>

                          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...register("addressLine1", {
                                    required: "  This field is required",
                                  })}
                                />
                                {errors.addressLine1 && (
                                  <p className="text-red-600 mt-2 inline-flex items-center">
                                    <IoWarningOutline />
                                    This field is required
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="landmark"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Landmark
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="landmark"
                                  name="landmark"
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...register("addressLine2", {
                                    required: "  This field is required",
                                  })}
                                />
                                {errors.addressLine2 && (
                                  <p className="text-red-600 mt-2 inline-flex items-center">
                                    <IoWarningOutline />
                                    This field is required
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...register("city", {
                                    required: "  This field is required",
                                  })}
                                />
                                {errors.city && (
                                  <p className="text-red-600 mt-2 inline-flex items-center">
                                    <IoWarningOutline />
                                    This field is required
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State / Province
                              </label>
                              <div className="mt-1">
                                <select
                                  id="state"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...register("state", {
                                    required: "*required",
                                  })}
                                >
                                  {options?.map((option) => (
                                    <option
                                      className="w-full"
                                      key={option}
                                      value={option}
                                    >
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                {errors.state && (
                                  <p className="text-red-600 mt-2 inline-flex items-center">
                                    {errors.state.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Postal code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="postal-code"
                                  name="postal-code"
                                  autoComplete="postal-code"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...register("pincode", {
                                    required: "  This field is required",
                                  })}
                                />
                                {errors.pincode && (
                                  <p className="text-red-600 mt-2 inline-flex items-center">
                                    <IoWarningOutline />
                                    This field is required
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Billing information
                          </h3>

                          <div className="mt-6 flex items-center">
                            <input
                              id="same-as-shipping"
                              name="same-as-shipping"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <div className="ml-2">
                              <label
                                htmlFor="same-as-shipping"
                                className="text-sm font-medium text-gray-900"
                              >
                                Same as shipping information
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                          <button
                            type="submit"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            Make payment
                          </button>
                        </div>
                      </div>
                    </form>
          
                  </div>
                </div>
              </div>
            </div>
            {/* Product List */}
            <div className="bg-gray-100 px-5 py-6 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {cartData.items.map((item) => (
                    <li
                      key={item.product._id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-cover"
                            src={item.product.mainImage.url}
                            alt={item.product.name}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <Link to={`/products/${item.product._id}`}>
                              <p className="text-sm font-bold">
                                {item.product.name}
                              </p>
                            </Link>
                          </div>
                          <p className="mt-4 text-xs font-medium ">
                            x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">
                          &#8377;{item.product.price}
                        </p>
                        <button
                          type="button"
                          className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          <span className="sr-only">Remove</span>
                          <TfiClose
                            className="h-5 w-5"
                            onClick={() => {
                              cart
                                .removeProduct(item.product._id)
                                .then((response) => response.data)
                                .then((data) => dispatch(addInCart({ data })))
                                .catch((error) => console.log(error));
                              let id = item.product._id;
                              let price = item.product.price;
                              dispatch(removeCart({ id, price }));
                              couponCode &&
                                coupon
                                  .applyCoupon(couponCode)
                                  .then((response) =>
                                    setMessage(response.message)
                                  )
                                  .catch((error) => console.log(error));
                              toastify.remove("Item has been removed");
                            }}
                          />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <form action="#" className="mt-6">
                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                  <div className="flex-grow">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                    <button
                      type="button"
                      disabled={couponCode === ""}
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-10"
                      onClick={() =>
                        coupon.applyCoupon(couponCode).then((response) => {
                          if (response.statusCode === 200) {
                            const data = response.data;
                            dispatch(addInCart({ data }));
                            setMessage(response.message);
                          } else {
                            setMessage(response.message);
                          }
                        })
                      }
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
                {message && (
                  <div className="mt-2 text-green-500">{message}</div>
                )}
              </form>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between text-gray-600">
                  <p className="text-sm font-medium">Sub total</p>
                  <div className="text-sm font-medium">
                    &#8377;{cartData.cartTotal}
                  </div>
                </li>
                <li className="flex items-center justify-between text-gray-900">
                  <p className="text-sm font-medium ">Total</p>
                  <div className="text-sm font-bold ">
                    &#8377;{cartData.discountedTotal}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Checkout;
