import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef,useMemo } from "react";
import { Button } from "flowbite-react";
import { useDispatch,useSelector } from "react-redux";
import {cart} from "../feature/index";
import { addInCart } from "../createSlice/Cartslice";
import { HiShoppingCart } from "react-icons/hi";
import { product } from "../feature/index";
import { category } from "../feature/index";
import { toastify } from "../feature/index";

function Product() {
  const { slug } = useParams();

  const ref = useRef(null);
  const [products, setProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addCart = () => {
    cart.addProduct(slug, quantity).then(response => response.data).then(data => {
      const itemCount=data.items.length
      dispatch(addInCart({ data,itemCount }))
    }).catch(error => console.log(error))
    toastify.success("Item added in the cart");
  };
  const imageChangeIn = (e) => {
    let image = e.target.src
    if (image) {
      ref.current.src=image
    }
  }
  const imageChangeOut = () => {
    ref.current.src=products.mainImage.url
  }
  const discountedPrice = products.price;
  const discountPercentage = 10;
  // Calculate the actual price
  const actualPrice = useMemo(() => discountedPrice / (1 - discountPercentage / 100), [discountedPrice]);
  const quantityUp = () => {
    setQuantity((prev) => {
    return prev<products.stock?prev+1:prev
  });
  }
  const quantityDown = () => { 
    setQuantity(prev => {
      return prev > 1 ? prev - 1 : 1
    })
  }
  useEffect(() => {
    product
      .getProductById(slug)
      .then((response) =>
        setProducts((prev) => ({ ...prev, ...response.data }))
      )
      .catch((error) => console.log(error));
    
  }, [slug]);
 
useEffect(() => {
  if (products.category) {
    category
      .getCategory(products.category)
      .then((response) => setCategories(response.data.name))
      .catch((error) => console.log(error));
  }
}, [products.category])

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a>Home</a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize">products</a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="  px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <span className="capitalize">{products.name}</span>
            </li>
          </ol>
        </div>
      </div>
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid ">
          <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
            {products.mainImage && (
              <img
                src={products.mainImage.url}
                alt="Nike Air Max 95 By You--0"
                className="w-full object-cover"
                ref={ref}
              />
            )}
          </div>
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {products.name}
            </h2>

            <div className="mt-5 flex items-center ">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                &#8377;{products.price}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                &#8377;{actualPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-3  ">
            <div className="mb-4 ">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                types
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {products.subImages &&
                  products.subImages.map((image) => (
                    <li
                      key={image._id}
                      className="text-heading mb-2 mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:h-16 md:w-16 md:text-sm"
                    >
                      <img
                        className={`block h-full w-full rounded `}
                        src={image.url}
                        onMouseEnter={imageChangeIn}
                        onMouseLeave={imageChangeOut}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="space-s-4 3xl:pr-48 flex flex-col items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12 mb-3">
             {quantity>=products.stock ? <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                disabled
              >
                +
              </button>:<button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  onClick={quantityUp}
              >
                +
              </button>}
              <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                {quantity}
              </span>
            { quantity<=1? <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12 opacity-50 text-lg" disabled>
                -
              </button> : <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
              onClick={quantityDown}>
                -
              </button>}
            </div>
            <div className="flex w-full gap-2">
              <Button className=" h-11 w-full " onClick={addCart}>
                Add to cart
              </Button>
              <Button
                className=" h-11 w-full"
                onClick={() => navigate("/products/checkout")}
              >
                {/* `/categories/${products.category}` */}
                {/* '/products/checkout' */}
                <HiShoppingCart className=" h-7 w-7" />
              </Button>
            </div>
          </div>
          <div className="py-6 ">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  SKU:
                </span>
                N/A
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Category:
                </span>
                <Link to={`/categories/${products.category}`}>
                  {" "}
                  <span className="hover:text-heading transition hover:underline">
                    {categories}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="shadow-sm ">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Product Details
              </h2>
              <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                <div className="bg-heading h-0.5 w-full rounded-sm" />
                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
              </div>
            </header>
            <div>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
               {products.description}
              </div>
            </div>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Additional Information
              </h2>
            </header>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Customer Reviews
              </h2>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
