import React from 'react';
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";

const Product = () => {
  return (
    <section className="adminDashPanel-section product-section">
    <h1 className="adminDashPanel-right-header">Products</h1>
    <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">
                Product
              </th>
              <th className="adminDashPanel-right-table-head-value">Description</th>
              <th className="adminDashPanel-right-table-head-value">Image</th>
              <th className="adminDashPanel-right-table-head-value">
                Stock
              </th>
              <th className="adminDashPanel-right-table-head-value">
               Category
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Price
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Created On
              </th>
              <th className="adminDashPanel-right-table-head-value">Updated On</th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      {order._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <div
                        className={`adminDashPanel-right-table-body-div ${order.Ostatus}`}
                      >
                        {order.Ostatus}
                      </div>
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OtotalPrice}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(order.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OpaymentMode}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <div
                        className={`adminDashPanel-right-table-body-div ${order.OpaymentStatus}`}
                      >
                        {order.OpaymentStatus}
                      </div>
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {order.OemployeeId ? order.OemployeeId : "Not Assigned"}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(order)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleEdit(order)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Product