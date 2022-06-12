import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import CrossIcon from "../icons/cross-black.svg";
import { createProduct } from "../user";

const AddProduct = ({ setAddProductActive }) => {
  const [values, setValues] = useState({
    pName: "",
    pDescription: "",
    pStock: "",
    pCategory: "",
    pPrice: "",
    pImg: "",
  });

  const { pName, pDescription, pStock, pCategory, pPrice, pImg } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.file[0],
    };
    setValues({ ...values, pImg: img });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createProduct(user._id, token, {
        pName,
        pDescription,
        pStock,
        pPrice,
        pCategory,
        pImg,
      });

      if (data.error) {
        return console.log(data.error);
      } else {
        return setAddProductActive(null);
      }
    } catch (error) {}
  };

  return (
    <section className="addProduct-section">
      <div className="black-background">
        <div className="popup-big-sec">
          <div className="popup-group">
            <div className="popup-head-sec">
              <h1 className="popup-header">Add Product</h1>
              <div
                className="cross-sec"
                onClick={() => setAddProductActive(null)}
              >
                <img src={CrossIcon} alt="" className="cross-img" />
              </div>
            </div>

            <form className="popup-form" encType="multipart/form-data">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Name</label>
                  <input
                    type="text"
                    className="popup-form-input"
                    value={pName}
                    onChange={handleChange("pName")}
                  />
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">
                    Product Description
                  </label>
                  <textarea
                    className="popup-form-input adminDashPanel-addproduct-textArea"
                    name="popup-form-input"
                    id="popup-form-input"
                    cols="30"
                    rows="10"
                    value={pDescription}
                    onChange={handleChange("pDescription")}
                  ></textarea>
                </div>
              </div>
              <div className="popup-form-triple-group adminDashPanel-addProducts-triple-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Price</label>
                  <input
                    type="number"
                    className="popup-form-input"
                    value={pPrice}
                    onChange={handleChange("pPrice")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Stock</label>
                  <input
                    type="number"
                    className="popup-form-input"
                    value={pStock}
                    onChange={handleChange("pStock")}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Category</label>
                  <select
                    name="category"
                    id="category"
                    className="popup-form-value"
                    onChange={handleChange("pCategory")}
                  >
                    <option value="fruit">Select Category</option>
                    <option value="fruit">Fruit</option>
                    <option value="vegetable">Vegetable</option>
                  </select>
                </div>
              </div>
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">Product Image</label>
                  <div className="popup-form-input-div adminDashPanel-addProducts-input-div">
                    <input
                      type="file"
                      className="popup-form-input"
                      onChange={handleFileChange}
                    />
                    <button className="popup-form-input-btn">
                      Choose File
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <button className="popup-form-btn" onClick={onSubmit}>
              Add Product
            </button>
          </div>
        </div>
      </div>
      {/* {error && errorMessage()} */}
    </section>
  );
};

export default AddProduct;
