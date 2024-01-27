import React from "react";
import FlowCarousel from "../components/FlowCarousel";
import ProductCard from "../components/ProductCard";
import { cart } from "../feature/index";
import { addInCart } from "../createSlice/Cartslice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../createSlice/Apislice";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import LoadingSkeleton from "../components/Loadingskeleton";
function Home() {
  const [page, setPage] = useState(1);
  // const [totalProducts, setTotalProducts] = useState(1);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const query = useSelector((state) => state.search.query);
  const moreProduct = () => {
    setPage(page + 1);
  };
  // useEffect(() => {
  //   if (query) {
  //     setProducts([])
  //     product
  //       .getAllProduct(page, totalProducts)
  //       .then((response) => setProducts(response.data.products))
  //       .catch((error) => console.log(error));
  //   } else {
  //     product
  //       .getAllProduct(page)
  //       .then((response) => {
  //         setProducts((prev) => [...prev, ...response.data.products]);
  //         setTotalProducts(response.data.totalProducts);
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [page, query, totalProducts]);

  const { data: response, isLoading, isSuccess } = useGetAllProductsQuery(page);
  const products = response?.data?.products ?? [];
  useEffect(() => {
    if (auth.Status) {
      cart
        .getCart()
        .then((response) => {
          if (response) {
            const data = response.data;
            const itemCount = response.data.items.length;
            dispatch(addInCart({ data, itemCount }));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch, auth.Status]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <FlowCarousel />
      <div className="w-full mt-5 px-4">
        <div className="grid grid-cols-1 gap-y-3 xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 sm:gap-3">
          {isSuccess &&
            products
              ?.filter((item) => {
                if (item.name.toLowerCase().includes(query.toLowerCase())) {
                  return item;
                } else if (query === null) {
                  return item;
                }
              })
              .map((item) => (
                <ProductCard
                  key={item._id}
                  slug={item._id}
                  image={item.mainImage.url}
                  name={item.name}
                  imageName={item.name}
                  price={item.price}
                />
              ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Button  cb={moreProduct}>
            load more
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
