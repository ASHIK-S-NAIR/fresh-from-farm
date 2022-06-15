import React, { useState, useEffect } from "react";
import ViewIcon from "../icons/view.svg";
import EditIcon from "../icons/Edit.svg";
import AddIcon from "../icons/add.svg";
import { isAuthenticated } from "../auth";
import { deleteEmployee, getEmployees } from "../user";
import moment from "moment";
import AddEmployee from "./AddEmployee";
import EmployeeDetail from "./EmployeeDetail";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("all");
  const [employee, setEmployee] = useState();
  const [addEmployeeActive, setAddEmployeeActive] = useState("");
  const [employeeDetail, setEmployeeDetail] = useState("");

  const { user, token } = isAuthenticated();

  const loadEmployees = async (userId, token, status) => {
    try {
      const data = await getEmployees(userId, token, status);
      if (data.error) {
        return console.log(data.error);
      } else {
        return setEmployees(data);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handlePreview = (employee) => {
    return setEmployeeDetail("employeeDetail"), setEmployee(employee);
  };

  const handleDelete = async (employee) => {
    try {
      const data = await deleteEmployee(user._id, token, employee._id);
      if (data.error) {
        return console.log(data.error);
      } else {
        return loadEmployees(user._id, token, status);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    loadEmployees(user._id, token, status);
  }, [status, addEmployeeActive]);

  return (
    <section className="adminDashPanel-section employee-section">
      <h1 className="adminDashPanel-right-header">Employees</h1>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-add-btn-subSection">
        <button
          className="adminDashPanel-product-add-btn"
          onClick={() => setAddEmployeeActive("addEmployee")}
        >
          <img
            src={AddIcon}
            className="adminDashPanel-product-add-btn-icon"
            alt=""
          />
          ADD EMPLOYEE
        </button>
      </div>
      <div className="adminDashPanel-right-subsection adminDashPanel-product-filter-subSection">
        <button
          className={`adminDashPanel-product-filter-btn ${
            status === "all" ? "active" : ""
          }`}
          onClick={() => setStatus("all")}
        >
          All
        </button>
        <button
          className={`adminDashPanel-product-filter-btn ${
            status === "Available" ? "active" : ""
          }`}
          onClick={() => setStatus("Available")}
        >
          Available
        </button>
        <button
          className={`adminDashPanel-product-filter-btn ${
            status === "NotAvailable" ? "active" : ""
          }`}
          onClick={() => setStatus("NotAvailable")}
        >
          Not-Available
        </button>
      </div>
      <div className="adminDashPanel-right-subsection">
        <table className="adminDashPanel-right-table">
          <thead className="adminDashPanel-right-table-head-sec">
            <tr>
              <th className="adminDashPanel-right-table-head-value">Name</th>
              <th className="adminDashPanel-right-table-head-value">Employee ID</th>
              <th className="adminDashPanel-right-table-head-value">Email</th>
              <th className="adminDashPanel-right-table-head-value">Status</th>
              <th className="adminDashPanel-right-table-head-value">
                Phone Number
              </th>
              <th className="adminDashPanel-right-table-head-value">Address</th>
              <th className="adminDashPanel-right-table-head-value">
                Created At
              </th>
              <th className="adminDashPanel-right-table-head-value">Action</th>
            </tr>
          </thead>
          <tbody className="adminDashPanel-right-table-body-sec">
            {employees &&
              employees.map((employee, index) => {
                return (
                  <tr
                    key={index}
                    className="adminDashPanel-right-table-body-tr"
                  >
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.name}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee._id}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.email}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Estatus}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.phoneNumber}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {employee.Euser.address.houseName}
                      <br />
                      {employee.Euser.address.streetName}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      {moment(employee.createdAt).format("DD-MMM-yyyy")}
                    </td>
                    <td className="adminDashPanel-right-table-body-value">
                      <button onClick={() => handlePreview(employee)}>
                        <img
                          src={ViewIcon}
                          alt=""
                          className="adminDashPanel-right-table-icon "
                        />
                      </button>
                      <button onClick={() => handleDelete(employee)}>
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
      {addEmployeeActive === "addEmployee" && (
        <AddEmployee setAddEmployeeActive={setAddEmployeeActive} />
      )}
      {employeeDetail === "employeeDetail" && (
        <EmployeeDetail
          employee={employee}
          setEmployeeDetail={setEmployeeDetail}
        />
      )}
    </section>
  );
};

export default Employee;
