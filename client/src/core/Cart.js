import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getUser } from "../user";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const { userId } = useParams();

  const { user, token } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);
      console.log(userDetails.cart);
      setCart(userDetails.cart);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad(userId, token);
  }, []);

  return (
    <section className="cart-section">
      <div className="wrap cart-wrap">
        <div className="cart-header-sec">
          <h1 className="cart-header">My Cart</h1>
        </div>
        <div className="cartDetail-sec">
          <hr />
          {cart &&
            cart.map((cartItem, index) => {
              <p key={index}>{cartItem}</p>;
            })}
        </div>
        <div className="cart-placeOrder-sec"></div>
      </div>
    </section>
  );
};

export default Cart;
