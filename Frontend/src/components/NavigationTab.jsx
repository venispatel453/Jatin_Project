import React, { useState } from "react";
import "../styling/navigation-tab.css"; // Import CSS file for styling

const generateTable = (data) => {
  const columns = ["name", "manager", "status"];
  console.log(data);
  return (
    <table>
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
                return <td key={index}>{row[column]}</td>;
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
            className={activeTab === "pending" ? "tab-item active" : "tab-item"}
            onClick={() => handleTabClick("pending")}
          >
            Pending
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
        {activeTab === "all" && <>{generateTable(data)}</>}
        {activeTab === "completed" && <div>completed</div>}
        {activeTab === "pending" && <div>pending</div>}
        {activeTab === "hold" && <div>hold</div>}
      </div>
    </div>
  );
}

export default NavigationTab;
