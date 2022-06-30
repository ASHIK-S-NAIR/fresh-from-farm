import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { getAllProducts } from "./helper/productDetailHelper";

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
      <div className="wrap hero-wrap">
        <h1>This is hot hero section</h1>
      </div>

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
    </section>
  );
};

export default Shop;
