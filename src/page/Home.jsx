import React from "react";
import FlowCarousel from "../components/FlowCarousel";
import ProductCard from "../components/ProductCard";
import { product, cart } from "../feature/index";
import { addInCart } from "../createSlice/Cartslice";
import { useDispatch,useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts,setTotalProducts] = useState(1)
  const dispatch = useDispatch();
  const query = useSelector(state => state.search.query)
  console.log(query);

  const moreProduct = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    if (query) {
      product.getAllProduct(page,totalProducts).then(response=>setProducts(response.data.products)).catch(error=>console.log(error))
    } else {
      product
      .getAllProduct(page)
      .then((response) =>
      {
        setProducts((prev) => [...prev, ...response.data.products])
        setTotalProducts(response.data.totalProducts)
      }
      )
      .catch((error) => console.log(error));
    }
    
  }, [page,query,totalProducts]);
  useEffect(() => {
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
  }, [dispatch]);

  return (
    <>
      <FlowCarousel />
      <div className="w-full mt-5 px-4">
        <div className="grid grid-cols-1 gap-y-3 xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 sm:gap-3">
          {query? products?.filter(item=>item.name.toLowerCase().includes(query.toLowerCase()) && item).map((item) => (
              <ProductCard
                key={item._id}
                slug={item._id}
                image={item.mainImage.url}
                name={item.name}
                price={item.price}
              />
            )): products.map((item) => (
              <ProductCard
                key={item._id}
                slug={item._id}
                image={item.mainImage.url}
                name={item.name}
                price={item.price}
              />
            ))
           }
           
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
