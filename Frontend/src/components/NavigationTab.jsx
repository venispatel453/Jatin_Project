import React, { useEffect, useState, useContext } from "react";
import "../styling/navigation-tab.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";
import { fetchUsersByRole } from "../util/users";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

const generateTable = (
  data,
  navigate,
  editIndex,
  setEditIndex,
  managers,
  handleChange,
  handleSave,
  auth
) => {
  const columns = [
    { key: "start_date", type: "date" },
    { key: "name", type: "text" },
    { key: "manager", options: managers, type: "dropdown" },
    {
      key: "status",
      options: ["On-Going", "Completed", "Hold", "In-Progress"],
      type: "dropdown",
    },
    ,
  ];
  console.log("data", data);

  const handleColumnName = (column_name) => {
    return column_name.split("_").join(" "); // Replaces underscores with spaces
  };

  const handleDelete = () => {};
  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{handleColumnName(column.key)}</th>
          ))}
          {auth.role !== "Client" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} className="table-row">
              {columns.map((column, colIndex) => {
                if (column.key === "manager") {
                  return (
                    <td
                      key={colIndex}
                      onClick={() =>
                        editIndex === rowIndex
                          ? null
                          : navigate(`/project/${row._id}`)
                      }
                    >
                      {editIndex === rowIndex ? (
                        <select
                          value={JSON.stringify(row[column.key])}
                          onChange={(e) => {
                            handleChange("manager", e.target.value, rowIndex);
                          }}
                        >
                          {column.options.map((option, index) => {
                            console.log(option);
                            return (
                              <option
                                value={JSON.stringify(option)}
                                key={index}
                              >
                                {option.name}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        row["associated_members"][column.key].name
                      )}
                    </td>
                  );
                } else if (column.key === "status") {
                  return (
                    <td
                      key={colIndex}
                      onClick={() =>
                        editIndex === rowIndex
                          ? null
                          : navigate(`/project/${row._id}`)
                      }
                    >
                      {editIndex === rowIndex ? (
                        <select
                          name=""
                          id=""
                          value={row[column.key]}
                          onChange={(e) => {
                            handleChange("status", e.target.value, rowIndex);
                          }}
                        >
                          {column.options.map((option, index) => {
                            return (
                              <option value={option} key={index}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={colIndex}
                      onClick={() =>
                        editIndex === rowIndex
                          ? null
                          : navigate(`/project/${row._id}`)
                      }
                    >
                      {editIndex === rowIndex ? (
                        <input
                          type={column.type}
                          value={row[column.key]}
                          onChange={(e) => {
                            handleChange(column.key, e.target.value, rowIndex);
                          }}
                        />
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  );
                }
              })}
              {auth.role !== "Client" && (
                <td className="action-cell">
                  {editIndex === rowIndex ? (
                    <>
                      <button onClick={() => handleSave(row)}>
                        <i className="fas fa-save"></i>
                      </button>
                      <button onClick={() => handleCancel()}>
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(rowIndex)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(rowIndex)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function NavigationTab({ data }) {
  const [activeTab, setActiveTab] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [managers, setManagers] = useState([]);
  const [rows, setRows] = useState(data);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { auth } = useContext(AuthContext);

  const handleChange = (attribute, value, rowIndex) => {
    let newRows = [...rows];
    console.log(attribute, value);
    newRows = rows.map((row, index) => {
      if (index === rowIndex) {
        if (attribute === "manager") {
          row["associated_members"][attribute] = JSON.parse(value);
        } else if (attribute === "status") {
          row[attribute] = value;
        } else {
          row[attribute] = value;
        }
      }
      return row;
    });
    setRows(newRows);
  };
  const handleSave = async (row) => {
    try {
      console.log(row);
      console.log(`${BASE_URL}/${row._id}/project_details`);
      const response = await axios.post(
        `${BASE_URL}/project/${row._id}/project_details`,
        {
          projectDetails: row,
        }
      );
      setEditIndex(null);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchManagers = async () => {
    try {
      let response = await fetchUsersByRole("Manager");
      response = response.map((manager) => {
        return {
          _id: manager.user_id,
          name: manager.name,
          designation: "Manager",
        };
      });
      setManagers(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <div className="navigation-tab">
      <nav>
        <ul className="tab-list">
          <li
            className={activeTab === "all" ? "tab-item active" : "tab-item"}
            onClick={() => handleTabClick("all")}
          >
            All
          </li>
          <li
            className={
              activeTab === "completed" ? "tab-item active" : "tab-item"
            }
            onClick={() => handleTabClick("completed")}
          >
            Completed
          </li>
          <li
            className={
              activeTab === "on-going" ? "tab-item active" : "tab-item"
            }
            onClick={() => handleTabClick("on-going")}
          >
            On-Going
          </li>
          <li
            className={activeTab === "hold" ? "tab-item active" : "tab-item"}
            onClick={() => handleTabClick("hold")}
          >
            Hold
          </li>
        </ul>
      </nav>
      <div className="tab-content">
        {/* Content corresponding to the active tab */}
        {activeTab === "all" && (
          <>
            {generateTable(
              data,
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth
            )}
          </>
        )}
        {activeTab === "completed" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "completed"),
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth
            )}
          </>
        )}
        {activeTab === "on-going" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "on-going"),
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth
            )}
          </>
        )}
        {activeTab === "hold" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "hold"),
              navigate,
              editIndex,
              setEditIndex,
              managers,
              handleChange,
              handleSave,
              auth
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NavigationTab;
