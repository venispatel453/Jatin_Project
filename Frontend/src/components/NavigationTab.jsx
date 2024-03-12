import React, { useState } from "react";
import "../styling/navigation-tab.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const generateTable = (data, navigate) => {
  const columns = ["start_date", "name", "manager", "status"];

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          return (
            <tr key={index}>
              {columns.map((column, index) => {
                if (column === "manager") {
                  return (
                    <td key={index}>
                      {row["associated_members"][column].name}
                    </td>
                  );
                } else if (column === "name") {
                  return (
                    <td
                      key={index}
                      onClick={() => navigate(`/project/${row._id}`)}
                      className="name-cell"
                    >
                      {row[column]}
                    </td>
                  );
                } else {
                  return <td key={index}>{row[column]}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function NavigationTab({ data }) {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

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
        {activeTab === "all" && <>{generateTable(data, navigate)}</>}
        {activeTab === "completed" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "completed"),
              navigate
            )}
          </>
        )}
        {activeTab === "on-going" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "on-going"),
              navigate
            )}
          </>
        )}
        {activeTab === "hold" && (
          <>
            {generateTable(
              data.filter((row) => row.status.toLowerCase() === "hold"),
              navigate
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NavigationTab;
