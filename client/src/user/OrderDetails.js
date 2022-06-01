import React, { useState, useEffect, useContext } from "react";
import { getProduct } from "../core/helper/productDetailHelper";

const OrderDetails = ({ orderActive, setOrderActive, order }) => {
  const [productDetails, setProductDetails] = useState([]);
  console.log("productDetails", productDetails);
  const loadProductDetails = async (order) => {
    order.Oproducts.map((product) => {
      return loadProduct(product);
    });
  };

  const loadProduct = async (product) => {
    try {
      const data = await getProduct(product.product);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setProductDetails([...productDetails, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProductDetails(order);
  }, []);

  return (
    <section className="orderDetails-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Order #{order._id}</h1>
              <div className="cross-sec" onClick={() => setOrderActive(null)}>
                <div className="cross-one"></div>
                <div className="cross-two"></div>
              </div>
            </div>
            <table className="popup-table">
              <thead className="popup-table-head-sec">
                <tr>
                  <th className="popup-table-head-value">Products</th>
                  <th className="popup-table-head-value">Category</th>
                  <th className="popup-table-head-value">Quantity</th>
                  <th className="popup-table-head-value">Price</th>
                  <th className="popup-table-head-value">Amount</th>
                </tr>
              </thead>
              <tbody className="popup-table-body-sec">
                {productDetails &&
                  order.Oproducts.map((product) => {
                    return productDetails.map((productDetail, index) => {
                      if (productDetail._id === product.product) {
                        console.log("got it");
                        return (
                          <tr key={index}>
                            <td className="popup-table-body-value">
                              {productDetail.pName}
                            </td>
                            <td className="popup-table-body-value">
                              {productDetail.pCategory}
                            </td>
                            <td className="popup-table-body-value">
                              {product.quantity}
                            </td>
                            <td className="popup-table-body-value">
                              {productDetail.pPrice}
                            </td>
                            <td className="popup-table-body-value">
                              {productDetail.pPrice * product.quantity}
                            </td>
                          </tr>
                        );
                      } else {
                        return "";
                      }
                    });
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
