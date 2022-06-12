import React, { useState, useEffect } from "react";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";
import AddIcon from "../icons/add.svg";
import { isAuthenticated } from "../auth";
import { deleteProduct, getAllProducts } from "../core/helper/productDetailHelper";
import { API } from "../backend";
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [addProductActive, setAddProductActive] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [product, setProduct] = useState();

  const { user, token } = isAuthenticated();

  const loadProducts = async (category) => {
    try {
      const data = await getAllProducts(category);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setProducts(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = async (product) => {
    return setProductDetail("productDetail"), setProduct(product)
  };
  const handleEdit = async (product) => {
    //
  };
  const handleDelete = async (product) => {
    try {
      const data = await deleteProduct(user._id, token, product._id);
      if(data.error){
        return console.log(data.error);
      }else{
        return loadProducts(category);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    loadProducts(category);
  }, [category]);
  return (
    <section className="adminDashPanel-section product-section">
      <h1 className="adminDashPanel-right-header">Products</h1>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-add-btn-subSection">
        <button className="adminDashPanel-product-add-btn" onClick={() => setAddProductActive("addProduct")} ><img src={AddIcon} className="adminDashPanel-product-add-btn-icon" alt="" />ADD PRODUCT</button>
      </div>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-filter-subSection">
        <button
          className={`adminDashPanel-product-filter-btn ${
            category === "all" ? "active" : ""
          }`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        <button
          className={`adminDashPanel-product-filter-btn ${
            category === "fruit" ? "active" : ""
          }`}
          onClick={() => setCategory("fruit")}
        >
          Fruit
        </button>
        <button
          className={`adminDashPanel-product-filter-btn ${
            category === "vegetable" ? "active" : ""
          }`}
          onClick={() => setCategory("vegetable")}
        >
          Vegetable
        </button>
      </div>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">
                Product Image
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Product Name
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Product ID
              </th>
              <th className="adminDashPanel-right-table-head-value">
                Description
              </th>

              <th className="adminDashPanel-right-table-head-value">
                Category
              </th>

              <th className="adminDashPanel-right-table-head-value">Stock</th>
              <th className="adminDashPanel-right-table-head-value">Price</th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {products &&
              products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      <img
                        className="adminDashPanel-product-img"
                        src={`${API}/product/photo/${product._id}`}
                        alt=""
                      />
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pName}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pDescription}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pCategory}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {product.pStock} Kg
                    </td>

                    <td className="adminDashPanel-right-table-body-value">
                      {product.pPrice}
                    </td>
                    {/* <td className="adminDashPanel-right-table-body-value">
                      {moment(product.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(product.updatedAt).format("DD-MMM-yyyy")}
                    </td> */}
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(product)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleEdit(product)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleDelete(product)}>
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

      {addProductActive === "addProduct" && <AddProduct setAddProductActive={setAddProductActive}/>}
      {productDetail === "productDetail" && <ProductDetail setProductDetail= {setProductDetail} product={product} />}

    </section>
  );
};

export default Product;
