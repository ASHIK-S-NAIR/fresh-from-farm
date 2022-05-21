import React, { useState, useEffect } from "react";
import { API } from "../backend";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  getAllCategoryProducts,
} from "./helper/productDetailHelper";
import { isAuthenticated } from "../auth/index";
import { addToUserCart, getUser, updateUser } from "../user";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("1");

  const { user, token } = isAuthenticated();

  const { productId } = useParams();

  const navigate = useNavigate();

  const loadProduct = async (productId) => {
    try {
      const productData = await getProduct(productId);
      const productsData = await getAllCategoryProducts(productId);

      return setProduct(productData), setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      var data = await addToUserCart(user._id, token, { productId, quantity });
      if (data.error) {
        console.log(data.error)
      } else {
        navigate(`/cart/${user._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct(productId);
  }, [productId]);
  return (
    <section className="productDetail productDetail-section">
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
            <input
              type="text"
              className="productDetail-quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            <p className="productDetail-quantity-p">Kg</p>
          </div>
          <button
            className="productDetail-btn"
            onClick={() => handleAddToCart(product._id, quantity)}
          >
            Add to Cart
          </button>
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
