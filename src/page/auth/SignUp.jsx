import React from "react";
import Container from "../../container/container";
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../feature";
import { login } from "../../createSlice/Authslice";
function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const currPassword = watch("password", "");
  const onSubmit = (data) => {
    setError("");
    authService
      .userReg(data)
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(login(response.data));
          navigate("/");
        } else {
          throw "User with email or username already exists";
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };
  return (
    <Container className="flex justify-center">
      <section className="rounded-md shadow-lg w-full mx-3 lg:w-1/3 mt-3">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2">
              <svg
                width="50"
                height="56"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                  fill="black"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                className="font-medium text-black transition-all duration-200 hover:underline"
                to={"/signin"}
              >
                Sign In
              </Link>
              {error && (
                <span className="text-lg font-semibold text-red-600 text-center block mt-4">
                  {error}
                </span>
              )}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <Input
                    label="Username"
                    {...register("username", {
                      required: "   This field is required",
                    })}
                  />
                  {errors.username && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      {errors}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label="Email address"
                    {...register("email", {
                      required: "  This field is required",
                      pattern: {
                        // Regex to validate email
                        matchPattern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label="Password"
                    type={isPasswordVisible ? "text" : "password"}
                    {...register("password", {
                      required: "  This field is required",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                      pattern: {
                        // Regex to validate password
                        matchPattern: (value) =>
                          /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/.test(
                            value
                          ) ||
                          "The password must be at least 8 characters long, contain at least one digit or special character, and contain at least one uppercase and lowercase letter.",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      {errors.password?.message}
                    </p>
                  )}
                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={isPasswordVisible}
                      onChange={togglePasswordVisibility}
                    />
                    <span className="text-sm text-gray-600">Show password</span>
                  </label>
                </div>
                <div>
                  <Input
                    label="Confirm password"
                    type="password"
                    {...register("confpassword", {
                      validate: (value) =>
                        value === currPassword || "The passwords do not match",
                    })}
                  />
                  {errors.confpassword && (
                    <p className="text-red-600 mt-2 inline-flex items-center">
                      <IoWarningOutline />
                      {errors.confpassword?.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account{" "}
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
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
      </section>{" "}
    </Container>
  );
}

export default SignUp;
