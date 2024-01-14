import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Payment() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products/payment/order_summary");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 md:mx-auto flex flex-col items-center gap-y-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          {" "}
          <path
            fill="#c8e6c9"
            d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
          ></path>
          <polyline
            fill="none"
            stroke="#4caf50"
            strokeMiterlimit="10"
            strokeWidth="4"
            points="14,24 21,31 36,16"
          ></polyline>{" "}
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <a
              href=""
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Redirect...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
