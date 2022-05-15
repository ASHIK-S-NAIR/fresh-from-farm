import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Trash from "../icons/Trash.svg";
import { getProduct } from "./helper/productDetailHelper";

const CartItem = ({ cartItem, updateQuantity, deleteProduct }) => {
  // console.log("cartitem",cartItem)
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(async () => {
    alert("Off to shore")
    try {
      const data = await getProduct(cartItem.product);
      if (data.error) {
        console.log(data.error);
      } else {
        return setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    //   console.log("Hello kuttukare")
    updateQuantity(product._id, quantity);
  }, [quantity]);

  const clickbait = () => {
    console.log("he clicked me");
  };

  return (
    <div className="cartItem-item">
      <div className="cartItem-item-left">
        <div className="cartItem-item-img-sec">
          <img
            src={`${API}/product/photo/${product._id}`}
            alt=""
            className="cartItem-item-img"
          />
        </div>
        <div className="cartItem-item-info">
          <h2 className="cartItem-item-productName">{product.pName}</h2>
          <div
            className={`cartItem-item-category-sec ${
              product.pCategory === "vegetable" ? "color-green" : "color-orange"
            }`}
          >
            <p className="cartItem-item-category">
              {product.pCategory === "vegetable" ? "Veg" : "Fruit"}
            </p>
          </div>
        </div>
        <div className="cartItem-item-action">
          <div className="cartItem-item-quantity-sec">
            <h4 className="cartItem-item-quantity-h3">QTY:</h4>
            <input
              type="text"
              className="cartItem-item-quantity-input"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            <h4 className="cartItem-item-quantity-h3">Kg</h4>
          </div>
          <img
            src={Trash}
            alt=""
            className="cartItem-item-delete-icon"
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </div>
      <div className="cartItem-item-right">
        <h2 className="cartItem-item-price">{`${product.pPrice}/Kg`}</h2>
      </div>
    </div>
  );
};

export default CartItem;
