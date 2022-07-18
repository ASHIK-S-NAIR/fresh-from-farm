import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product, index) => {
    const { id, title, image, price, category } = product;
    return (
      <div className="wrap" key={index} >
        <Link to={`/myproduct/${id}`}>
          <div>
            <div className="image">
              <img src={image} alt={title} />
            </div>
            <div className="content">
              <div className="header">{title}</div>
              <div className="price">{price}dollar</div>
              <div className="category">{category}dollar</div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default ProductComponent;
