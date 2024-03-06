import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styling/crud-table.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrudTable = ({
  data,
  invalidColumns,
  columnType,
  setChangedTableRows,
  defaultValues = {},
  setShowSaveButton,
  sectionTab,
}) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const extractedColumns = Object.keys(data[0]).filter(
      (key) => !invalidColumns.includes(key)
    );
    setColumns(extractedColumns);

    const newData = data.map((record) => ({
      ...record,
      _id: record._id ? record._id : uuidv4(),
      editable: false,
    }));
    setRows(newData);
  }, [sectionTab]);

  const handleInputValidation = (id) => {
    const requiredRow = rows.filter((row) => row._id === id)[0];
    for (let key in requiredRow) {
      if (requiredRow[key] === "") {
        return true;
      }
    }
    return false;
  };

  const handleChange = (id, key, value) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, [key]: value } : row
    );
    setRows(updatedRows);
  };

  const handleEdit = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, editable: true, prevState: { ...row } } : row
    );
    setRows(updatedRows);
  };

  const handleColumnName = (column_name) => {
    return column_name.split("_").join(" ");
  };

  const handleSave = (id) => {
    if (handleInputValidation(id)) {
      toast.error("Please Fill All Fields");
      return;
    }
    const updatedRows = rows.map((row) => {
      if (row._id === id) {
        let changedRow = { ...row, ...defaultValues, action: "added/updated" };
        delete changedRow["editable"];
        delete changedRow["prevState"];
        setChangedTableRows((prevChangedRows) => [
          ...prevChangedRows,
          changedRow,
        ]);
      }
      return row._id === id ? { ...row, editable: false } : row;
    });

    setShowSaveButton(true);
    setRows(updatedRows);
  };

  const handleCancel = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, editable: false, ...row.prevState } : row
    );
    setRows(updatedRows);
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => {
      if (row._id === id) {
        let changedRow = { ...row, action: "delete" };
        setChangedTableRows((prevChangedRows) => [
          ...prevChangedRows,
          changedRow,
        ]);
      }

      return row._id !== id;
    });
    setShowSaveButton(true);
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach((column) => (newRow[column] = ""));
    const newId = uuidv4();
    setRows([...rows, { ...newRow, _id: newId, editable: true }]);
  };

  const renderInputField = (column_key, row) => {
    const {
      type,
      options,
      value = row[column_key],
    } = columnType.find((item) => item.key === column_key) || {};
    switch (type) {
      case "date":
        return (
          <input
            type="date"
            value={row[column_key]}
            onChange={(e) => handleChange(row._id, column_key, e.target.value)}
          />
        );
      case "dropdown":
        return (
          <select
            value={row[column_key]}
            onChange={(e) => handleChange(row._id, column_key, e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(row._id, column_key, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="crud-table-container">
      <table className="crud-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} rowSpan={2}>
                {handleColumnName(column)}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              {columns.map((column, cellIndex) => (
                <td key={cellIndex}>
                  {row.editable ? renderInputField(column, row) : row[column]}
                </td>
              ))}
              <td>
                {row.editable ? (
                  <div className="action-cell">
                    <button onClick={() => handleSave(row._id)}>
                      <i className="fas fa-save"></i>
                    </button>
                    <button onClick={() => handleCancel(row._id)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="action-cell">
                    <button onClick={() => handleEdit(row._id)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(row._id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length + 1}>
              <button onClick={handleAddRow}>
                <i className="fas fa-plus"></i> Add Row
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CrudTable;
