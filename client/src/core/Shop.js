import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { getAllProducts } from "./helper/productDetailHelper";
import CartIcon from "../icons/Shopping/Cart.svg";
import DeliveryBoy from "../images/deliverboy-green.png"
import DeliveryIcon from "../icons/Shopping/Delivery.svg";
import ArrowIcon from "../icons/Shopping/Arrow.svg";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const loadAllProducts = async () => {
    try {
      const data = await getAllProducts("all");
      return setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <section className="shop-section">
      <div className="hero-sec">
        <div className="wrap hero-wrap">
          <div className="hero-left">
            <div className="hero-left-sec">
              <div className="hero-title-sec">
                <img src={CartIcon} alt="" className="hero-title-img" />
                <h4 className="hero-title">Grocery delivey Services</h4>
              </div>
              <h1 className="hero-header">
                Make healthy life <br /> with <span>fresh</span> grocery
              </h1>
              <h3 className="hero-subheader">
                Get the best quality and most delicious grocery food <br /> in the
                world, you can get them all use our website.
              </h3>
              <div className="hero-search-sec">
                <input type="text" className="hero-search-input" placeholder="Search a product" />
                <button className="hero-search-btn">Shop now</button>
              </div>
              <p className="hero-signin-p">
                Not yet Member ? <span>Sign Up</span> Now
              </p>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-sec">
              <img src={DeliveryBoy} alt="" className="hero-img" />
              <div className="hero-img-bg">
                <div className="hero-img-bg-delivery-icon-sec">
                  <img src={DeliveryIcon} alt="" className="hero-img-bg-delivery-icon" />
                </div>
                <div className="hero-img-bg-arrow-icon-sec">
                  <img src={ArrowIcon} alt="" className="hero-img-bg-arrow-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products-sec">
        <div className="wrap products-wrap">
          {products &&
            products.map((product, index) => {
              return (
                <Link to={`/product/${product._id}`} key={index}>
                  <div className="product-sec">
                    {product.pStock === 0 && (
                      <div className="outOfStock">
                        <div className="outOfStock-div">
                          <p className="outOfStock-p">Out Of Stock</p>
                        </div>
                      </div>
                    )}
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
                    {product && (
                      <img
                        className="adminDashPanel-product-img"
                        src={`${API}/product/photo/${product.pImg.key}`}
                        alt=""
                        loading="lazy"
                      />
                    )}

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
      </div>
    </section>
  );
};

export default Shop;
