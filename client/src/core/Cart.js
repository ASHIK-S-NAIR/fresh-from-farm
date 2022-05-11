import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getUser } from "../user";

const Cart = () => {
  const [cart, setCart] = useState([]);
  // var cart = [];

  const { userId } = useParams();

  const { user, token } = isAuthenticated();

  const preLoad = async (userId, token) => {
    try {
      const userDetails = await getUser(userId, token);
      console.log(userDetails);
      // setCart(oldCart => [...oldCart, userDetails.cart])
      return setCart(userDetails.cart);
      // cart= userDetails.cart;
      // const {cart} = userDetails;
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
          <h1 className="cart-header">My Cart </h1>
        </div>
        <div className="cartDetail-sec">
          <hr />
          {cart && (cart.map((cartItem, index) => {
            return(
              <div className="cartDetail-item" key={index} > 
                <img src="" alt="" className="cartDetail-item-img" />
                <div className="cartDetail-item-info">
                  <h2 className="cartDetail-item-productName">{cartItem.pName}</h2>
                  <h2 className="cartDetail-item-productName"></h2>
                </div>
              </div>
            )
          }))}

         
        </div>
        <div className="cart-placeOrder-sec"></div>
      </div>
    </section>
  );
};

export default Cart;
 