import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // ✅ only here
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // ✅ also in error
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products?.map((singleproduct) => (
            <ProductCard
              renderAdd={true}
              product={singleproduct}
              key={singleproduct.id}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
