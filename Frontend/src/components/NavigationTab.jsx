import React, { useEffect, useState } from "react";
import "../styling/navigation-tab.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";
import { fetchUsersByRole } from "../util/users";

const generateTable = (data, navigate, editIndex, setEditIndex, managers) => {
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
  console.log(data);
  const handleDelete = () => {};
  const handleCancel = () => {
    setEditIndex(null);
  };
  const handleSave = () => {};
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.key}</th>
          ))}
          <th>Actions</th>
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
                          name=""
                          id=""
                          value={JSON.stringify(row[column.key])}
                        >
                          {column.options.map((option) => {
                            console.log(option);
                            return (
                              <option value={JSON.stringify(option)}>
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
                } else if (column.key === "name") {
                  return (
                    <td
                      key={colIndex}
                      className="name-cell"
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
                            // Implement change functionality here if needed
                          }}
                        />
                      ) : (
                        row[column.key]
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
                        <select name="" id="" value={row[column.key]}>
                          {column.options.map((option) => {
                            return <option value={option}>{option}</option>;
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
                            // Implement change functionality here if needed
                          }}
                        />
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  );
                }
              })}
              <td>
                {editIndex === rowIndex ? (
                  <>
                    <button onClick={() => handleSave()}>
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

  const fetchManagers = async () => {
    try {
      const data = await fetchUsersByRole("Manager");
      setManagers(data);
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
            {generateTable(data, navigate, editIndex, setEditIndex, managers)}
          </>
        )}
        {activeTab === "completed" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "completed"),
              navigate,
              editIndex,
              setEditIndex,
              managers
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
              managers
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
              managers
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NavigationTab;
