import React, { useState, useEffect } from "react";
import { API } from "../backend";
import { Link, useParams } from "react-router-dom";
import {
  getProduct,
  getAllCategoryProducts,
} from "./helper/productDetailHelper";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const { productId } = useParams();

  const loadProduct = async (productId) => {
    try {
      const productData = await getProduct(productId);
      const productsData = await getAllCategoryProducts(productId);

      return setProduct(productData), setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct(productId);
  }, []);
  return (
    <section className="productDetail">
      <div className="wrap productDetail-wrap">
        <div className="productDetail-img-sec">
          <div className="productDetail-img-container">
            <div
              className={`productDetail-category-sec ${
                product.pCategory === "vegetable"
                  ? "color-green"
                  : "color-orange"
              }`}
            >
              <p className="productDetail-category">
                {product.pCategory === "vegetable" ? "Veg" : "Fruit"}
              </p>
            </div>
            <img
              src={`${API}/product/photo/${productId}`}
              alt=""
              className="productDetail-img"
            />
          </div>
        </div>
        <div className="productDetail-info">
          <h1 className="productDetail-name">{product.pName}</h1>
          <h2 className="productDetail-price">
            ₹<span>{product.pPrice + "/Kg"}</span>
          </h2>
          <p className="productDetail-description">{product.pDescription}</p>
          <h3 className="productDetail-stock">{product.pStock}kg in stock</h3>
          <div className="productDetail-quantity-sec">
            <p className="productDetail-quantity-p">QTY:</p>{" "}
            <input type="text" className="productDetail-quantity" />
            <p className="productDetail-quantity-p">Kg</p>
          </div>
          <button className="productDetail-btn">Add to Cart</button>
        </div>
      </div>

      <div className="wrap products-wrap">
        {products.map((product, index) => {
          return (
            <Link to={`/product/${product._id}`} key={index}>
              <div className="product-sec">
                <div
                  className={`product-category-sec ${
                    product.pCategory === "vegetable"
                      ? "color-green"
                      : "color-orange"
                  }`}
                >
                  <p className="product-category">
                    {product.pCategory === "vegetable" ? "Veg" : "Fruit"}
                  </p>
                </div>
                <img
                  src={`${API}/product/photo/${product._id}`}
                  className="product-img"
                />
                <div className="product-info">
                  <h2 className="product-name">{product.pName}</h2>
                  <h3 className="product-stock">
                    {product.pStock} Kg in stock
                  </h3>
                  <h1 className="product-price">{product.pPrice}/Kg</h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductDetail;
