import React, { useEffect, useState } from "react";
import Container from "../../container/container";
import { IoWarningOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { address, toastify } from "../../feature";
import Input from "../../components/Input";
import { useParams } from "react-router-dom";
import { updateAddress } from "../../createSlice/Addressslice";
function Editaddress() {
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "Select your state",
      pincode: "",
    },
  });
  useEffect(() => {
    if (slug) {
      (async () => {
        const response = await address.getAddressById(slug);
        reset({
          addressLine1: response?.data?.addressLine1 || "",
          addressLine2: response?.data?.addressLine2 || "",
          city: response?.data?.city || "",
          state: response?.data?.state || "Select your state",
          pincode: response?.data?.pincode || "",
        });
      })();
    }
  }, [slug, reset]);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    address
      .updateAddress(slug, data)
      .then((response) => dispatch(updateAddress({data:response.data,id:slug})))
      .catch((error) => console.log(error));
    toastify.success("Address updated successfully")

  };
  const options = [
    "Select your state",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    " Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    " Madhya Pradesh",
    " Maharashtra",
    "Manipur",
    " Meghalaya",
    " Mizoram",
    " Nagaland",
    " Odisha",
    " Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    " Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <Container>
      <section>
        <div className="flex items-center justify-center  px-4 py-10  sm:px-6 sm:py-16 lg:px-8  ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <Input
                    label="Address"
                    type="text"
                    placeholder="Address"
                    {...register("addressLine1", { required: true })}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      This field is required
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label="Landmark"
                    type="text"
                    placeholder="Landmark"
                    {...register("addressLine2", { required: true })}
                  />
                  {errors.addressLine2 && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      This field is required
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label="City"
                    type="text"
                    placeholder="City"
                    {...register("city", { required: true })}
                  />
                  {errors.city && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      This field is required
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label="Pincode"
                    type="text"
                    placeholder="Pincode"
                    {...register("pincode", { required: true })}
                  />
                  {errors.pincode && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      This field is required
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="text-base font-medium text-gray-900"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <select
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      id="state"
                      {...register("state", { required: true })}
                    >
                      {options &&
                        options.map((option) => (
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
                        <IoWarningOutline />
                        This field is required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Update Address{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Editaddress;
