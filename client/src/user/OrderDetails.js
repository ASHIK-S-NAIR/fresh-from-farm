import React, { useState, useContext } from "react";
import { getProduct } from "../core/helper/productDetailHelper";

const OrderDetails = ({ orderActive, setOrderActive, order }) => {
  const loadProduct = async (productId) => {
    try {
      const data = await getProduct(productId);
      if (data.error) {
        return console.log(data.error);
      } else {
        console.log(data);
        return data;
      }
    } catch (error) {
      return console.log(error);
    }
  };

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
                {order.Oproducts.map((product, index) => {
                  console.log("productId", product.product);
                  loadProduct(product.product).then((productDetail) => {
                    return (
                      <tr key={index}>
                          {console.log("productName",productDetail.pName)}
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
