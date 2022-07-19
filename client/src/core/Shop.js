import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { getAllProducts } from "./helper/productDetailHelper";
import CartIcon from "../icons/Shopping/Cart.svg";
import DeliveryBoy from "../images/deliverboy-green.png";
import DeliveryIcon from "../icons/Shopping/Delivery.svg";
import ArrowIcon from "../icons/Shopping/Arrow.svg";
import Loading from "./Loading";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searhCategory, setSearchCategory] = useState("all");
  const [searchSort, setSearchSort] = useState("default");
  const [searchView, setSearchView] = useState("short");

  const loadAllProducts = async () => {
    try {
      const data = await getAllProducts("all");
      return setIsLoading(false), setProducts(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
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
                Make healthy life <br /> with{" "}
                <span>
                  fresh{" "}
                  <svg
                    width="128"
                    height="20"
                    viewBox="0 0 128 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.79323 18.2793C57.9285 3.68963 97.7746 -6.22468 126.423 11.2769"
                      stroke="white"
                      strokeWidth="3"
                    />
                  </svg>
                </span>{" "}
                grocery
              </h1>
              <h3 className="hero-subheader">
                Get the best quality and most delicious grocery food <br /> in
                the world, you can get them all use our website.
              </h3>
              <div className="hero-search-sec">
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Search a product"
                />
                <button className="hero-search-btn">Shop now</button>
              </div>
              <p className="hero-signin-p">
                Not yet Member ?{" "}
                <Link to="/signup">
                  <span>Sign Up</span>
                </Link>{" "}
                Now
              </p>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-sec">
              <img src={DeliveryBoy} alt="" className="hero-img" />
              <div className="hero-img-bg">
                <div className="hero-img-bg-delivery-icon-sec">
                  <img
                    src={DeliveryIcon}
                    alt=""
                    className="hero-img-bg-delivery-icon"
                  />
                </div>
                <div className="hero-img-bg-arrow-icon-sec">
                  {/* <img
                    src={ArrowIcon}
                    alt=""
                    className="hero-img-bg-arrow-icon"
                  /> */}

                  <svg
                    className="hero-img-bg-arrow-icon"
                    viewBox="0 0 104 85"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_di_1320_133)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M59.9359 6.2043C57.9101 6.16572 56.2366 7.77668 56.198 9.80247C56.1594 11.8283 57.7704 13.5018 59.7962 13.5404L66.9183 13.676L53.1006 27.4792L46.4624 20.5832C45.7809 19.8752 44.8438 19.4702 43.8612 19.459C42.8786 19.4478 41.9326 19.8312 41.2351 20.5234L25.4618 36.1768C24.0237 37.604 24.0148 39.9269 25.442 41.3651C26.8693 42.8032 29.1921 42.8121 30.6303 41.3848L43.7596 28.3554L50.4063 35.2602C51.0893 35.9697 52.0288 36.3748 53.0135 36.3845C53.9982 36.3941 54.9455 36.0074 55.6422 35.3115L71.9767 18.9942L71.8483 25.7352C71.8097 27.761 73.4207 29.4345 75.4465 29.4731C77.4723 29.5117 79.1458 27.9007 79.1844 25.8749L79.482 10.2459C79.5206 8.2201 77.9096 6.54659 75.8838 6.50801L59.9359 6.2043Z"
                        fill="url(#paint0_linear_1320_133)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_di_1320_133"
                        x="0.539429"
                        y="-6.63198"
                        width="102.781"
                        height="91.2556"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="18.3366" />
                        <feGaussianBlur stdDeviation="11.9188" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.679167 0 0 0 0 0.104705 0 0 0 0 0.104705 0 0 0 0.37 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1320_133"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1320_133"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="-18.3366" />
                        <feGaussianBlur stdDeviation="6.4178" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect2_innerShadow_1320_133"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_1320_133"
                        x1="52.2808"
                        y1="6.05851"
                        x2="51.5792"
                        y2="42.8983"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EE7878" />
                        <stop offset="1" stopColor="#C6512C" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-sec">
        <div className="wrap shop-wrap">
          <div className="search-filter-sec">
            <div className="search-filter-category-sec">
              <select name="" id="" className="search-filter-category">
                <option value="" className="search-filter-category-item">
                  Fruits
                </option>
                <option value="" className="search-filter-category-item">
                  Vegetables
                </option>
                <option value="" className="search-filter-category-item">
                  Poultry
                </option>
              </select>
            </div>
            <div className="search-filter-sort-sec">
              <select name="" id="" className="search-filter-sort">
                <option value="" className="search-filter-sort-item">
                  Sort by default
                </option>
                <option value="" className="search-filter-sort-item">
                  Name: A -Z
                </option>
                <option value="" className="search-filter-sort-item">
                  Name: Z -A
                </option>
                <option value="" className="search-filter-sort-item">
                  Price: low - high
                </option>
                <option value="" className="search-filter-sort-item">
                  Price: high to low
                </option>
              </select>
            </div>
          </div>
          <div className="products-search-sec">
            <div className="search-input-sec">
              <input type="text" className="search-input" />
              <img src="" alt="" className="search-icon" />
              <div className="search-view-sec">
                <div className="search-view-short"></div>
                <div className="search-view-long"></div>
              </div>
            </div>
            <div className="products-sec">
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
                            {product.pCategory === "vegetable"
                              ? "Veg"
                              : "Fruit"}
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
        </div>
      </div>
    </section>
  );
};

export default Shop;
