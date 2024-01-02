import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { product } from "../feature/index";
import { Button } from "flowbite-react";
import ProductCard from "../components/ProductCard";

function CataegoryProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const moreProduct = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    if (id) {
      product
        .getAllProduct(page)
        .then((response) => {
          setProducts((prev) => [...prev, ...response.data.products]);
          setHasNextPage(response.data.hasNextPage);
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, [id, navigate, page]);

  return (
    <div className="w-full mt-5 px-4">
      <div className="grid grid-cols-1 gap-y-3 xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 sm:gap-3 ">
        {products &&
          products.map((item) => (
            <Link key={item._id} to={`/products/${item._id}`} className="">
              <ProductCard
                image={item.mainImage.url}
                name={item.name}
                price={item.price}
              />{" "}
            </Link>
          ))}
      </div>

      <div className="mt-5 flex justify-center">
        <Button size="lg" disabled={hasNextPage} onClick={moreProduct}>
          load more
        </Button>
      </div>
    </div>
  );
}

export default CataegoryProduct;
