import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { product } from "../feature/index";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import Container from "../container/container";
function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  if (slug) {
    if (!(id === slug)) {
      setId(slug);
      setProducts([]);
    }
  } else {
    navigate("/");
  }

  const moreProduct = () => {
    setPage((prev) => prev + 1);

  };
  useEffect(() => {
    product
      .getProductByCategoryId(slug, page)
      .then((response) => {
        setProducts( [...products, ...response.data.products]);
        setHasNextPage(response.data.hasNextPage)
        console.log(response.data.hasNextPage);
      })
      .catch((error) => console.log(error));
  }, [page, slug]);

  return (
    products && (
      <div className="w-full mt-5 px-4">
        <Container>
          <div className="grid grid-cols-1 gap-y-3 xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 sm:gap-3 ">
            {products.length > 0 ? (
              products.map((item) => (
                <ProductCard
                  key={item._id}
                  slug={item._id}
                  image={item.mainImage.url}
                  name={item.name}
                  price={item.price}
                />
              ))
            ) : (
              <p className="text-2xl font-bold text-black dark:text-white text-center w-full h-80">
                No product available
              </p>
            )}
          </div>
        </Container>
        <div className="mt-5 flex justify-center">
        { hasNextPage? <Button   cb={moreProduct}>
            load more
          </Button>:<Button className="disabled:bg-slate-500" disabled cb={moreProduct}>
            load more
          </Button>}
        </div>
      </div>
    )
  );
}

export default Category;
