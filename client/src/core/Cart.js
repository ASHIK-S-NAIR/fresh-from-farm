import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { CartContext } from "../context/Context";
import {
  deleteFromCart,
  getUser,
  getUserCart,
  // getUserCart,
  updateFromUserCart,
} from "../user";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, setCart} = useContext(CartContext);
  // const [cart, setCart] = useState([]);
  const [subTotal_items, setSubTotal_items] = useState(0);
  const [subTotal_value, setSubTotal_value] = useState(0);
  const [shippingAddress_state, setShippingAddress_state] = useState("default");
  const [shippingAddress, setShippingAddress] = useState({
    shippingAddress_houseName: " ",
    shippingAddress_streetName: " ",
  });
  const [productDetails, setProductDetails] = useState();

  const { userId } = useParams();

  const { user, token } = isAuthenticated();

  const { shippingAddress_houseName, shippingAddress_streetName } =
    shippingAddress;

  const preLoadShippingAddress = async (userId, token) => {
    try {
      const data = await getUser(userId, token);
      if (data.error) {
        console.log(data.error);
      } else {
        return setShippingAddress({
          ...shippingAddress,
          shippingAddress_houseName: data.address.houseName,
          shippingAddress_streetName: data.address.streetName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoadShippingAddress(userId, token);
  }, []);

  const loadSubTotal_value = async () => {
    var total = 0;
    cart.map((cartItem) => {
      return (total = total + cartItem.product.pPrice * cartItem.quantity);
    });

    return setSubTotal_value(total);
  };

  useEffect(() => {
    loadSubTotal_value();
  }, [cart]);

  useEffect(() => {
    setSubTotal_items(cart.length);
  }, [cart]);

  const preLoadCart = async (userId, token) => {
    try {
      const data = await getUserCart(userId, token);
      return setCart(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("reaching here awsome vini")
    preLoadCart(userId, token);
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const data = await updateFromUserCart(userId, token, {
        productId,
        quantity,
      });
      if (data.error) {
        console.log(data.error);
      } else {
        return preLoadCart(userId, token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const data = await deleteFromCart(userId, token, productId);
      if (data.error) {
        return console.log(data.error);
      } else {
        return preLoadCart(userId, token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name) => (e) => {
    setShippingAddress({ ...shippingAddress, [name]: e.target.value });
  };

  return (
    <section className="cart-section">
      <div className="wrap cart-wrap">
        <div className="cart-header-sec">
          <h1 className="cart-header">My Cart </h1>
        </div>
        <div className="cart-subsection">
          <div className="cartDetail-sec">
            <div className="cartDetail-sec-hr"></div>
            {cart &&
              cart.map((cartItem, index) => {
                return (
                  <CartItem
                    cartItemProductId={cartItem.product._id}
                    cartItemQuantity={cartItem.quantity}
                    key={index}
                    updateQuantity={updateQuantity}
                    deleteProduct={deleteProduct}
                  />
                );
              })}
            <div className="cart-subTotal-sec">
              <h2 className="cart-subTotal-h2">
                {`Subtotal (${subTotal_items} items)`} :{" "}
                <span className="cart-subTotal-price">{`${subTotal_value}`}</span>
              </h2>
            </div>
          </div>
          <div className="cart-placeOrder-sec">
            <div className="cart-subTotal-sec cart-placeOrder-subTotal-sec">
              <h2 className="cart-subTotal-h2">
                {`Subtotal (${subTotal_items} items)`} :{" "}
                <span className="cart-subTotal-price">{`${subTotal_value}`}</span>
              </h2>
            </div>
            <div className="cart-shippingAddress-sec">
              <h3 className="cart-shippingAddress-header">Shipping Address</h3>
              {shippingAddress_state === "default" && (
                <div className="cart-shippingAddress-default-sec">
                  <div className="cart-shippingAddress-default-address-sec">
                    <p className="cart-shippingAddress-default-address cart-shippingAddress-default-HouseName">
                      {shippingAddress_houseName}
                    </p>
                    <p className="cart-shippingAddress-default-address cart-shippingAddress-default-StreetName">
                      {shippingAddress_streetName}
                    </p>
                  </div>
                  <button
                    className="cart-shippingAddress-edit-btn"
                    onClick={() => setShippingAddress_state("edit")}
                  >
                    Edit
                  </button>
                  <Link to={`/cart/payment/${userId}`} state={shippingAddress}>
                    <button className="cart-shippingAddress-cta-btn">
                      Deliver to this Address
                    </button>
                  </Link>
                </div>
              )}
              {shippingAddress_state === "edit" && (
                <div className="cart-shippingAddress-edit-sec">
                  <form className="cart-shippingAddress-edit-address-form">
                    <p
                      className="cart-shippingAddress-edit-address-default_state"
                      onClick={() => setShippingAddress_state("default")}
                    >
                      Go back to default address
                    </p>
                    <div className="cart-shippingAddress-edit-address-sec">
                      <p className="cart-shippingAddress-edit-address-label">
                        House Name
                      </p>
                      <input
                        type="text"
                        className="cart-shippingAddress-edit-address-input"
                        value={shippingAddress_houseName || " "}
                        onChange={handleChange("shippingAddress_houseName")}
                      />
                    </div>
                    <div className="cart-shippingAddress-edit-address-sec">
                      <p className="cart-shippingAddress-edit-address-label">
                        Street Name
                      </p>
                      <input
                        type="text"
                        className="cart-shippingAddress-edit-address-input"
                        value={shippingAddress_streetName || " "}
                        onChange={handleChange("shippingAddress_streetName")}
                      />
                    </div>
                  </form>
                  <Link
                    to={`/cart/payment/${userId}`}
                    state={{ shippingAddress }}
                  >
                    <button className="cart-shippingAddress-cta-btn">
                      Deliver to this Address
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
