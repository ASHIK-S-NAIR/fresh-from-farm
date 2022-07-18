import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductComponent from "./ProductComponent";
import {fetchProducts } from "../Redux/actions/productActions";

const ProductListing = () => {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();

  // const fetchProduct = async () => {
  //   try {
  //     const response = await fetch("https://fakestoreapi.com/products", {
  //       method: "GET",
  //     }).then(res => res.json())
  //     console.log("Response", response);

  //     dispatch(setProducts(response))
  //   } catch (error) {
  //     console.log("Err", error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log("Products please",products);
  return (
    <div>
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
