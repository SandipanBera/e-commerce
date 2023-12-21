import React from "react";
import FlowCarousel from "../components/FlowCarousel";
import ProductCard from "../components/ProductCard";
import { product } from "../feature/index";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const moreProduct = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    product
      .getAllProduct(page)
      .then((response) =>
        setProducts((prev) => [...prev, ...response.data.products])
      )
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <>
      <FlowCarousel />
      <div className="w-full mt-5 px-4">
        <div className="grid grid-cols-1 gap-y-3 xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 sm:gap-3">
          {products &&
            products.map((item) => (
              <ProductCard
                key={item._id}
                slug={item._id}
                image={item.mainImage.url}
                name={item.name}
                price={item.price}
              />
            ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Button size="md" onClick={moreProduct}>
            load more
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
