import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  removeSelectedProduct,
} from "../Redux/actions/productActions";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { id, image, title, price, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(product);

  // const fetchProductDetail = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://fakestoreapi.com/products/${productId}`,
  //       {
  //         method: "GET",
  //       }
  //     ).then((res) => res.json());
  //     console.log("Response", response);

  //     dispatch(selectedProduct(response));
  //   } catch (error) {
  //     console.log("Err", error);
  //   }
  // };
  useEffect(() => {
    if (productId && productId !== "") {
      dispatch(fetchProduct(productId));
    }
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <>
      {product.length === 0 ? (
        <div>...loading</div>
      ) : (
        <div>
          <div className="id">{id}</div>
          <div className="price">{price}</div>
          <div className="description">{description}</div>
          <div className="image">{category}</div>
          <img src={image} alt="" />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
