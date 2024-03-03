import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styling/crud-table.css";

const CrudTable = ({
  data,
  invalidColumns,
  columnType,
  changedTableRows,
  defaultValues = {},
}) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  console.log(defaultValues);

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
    console.log("data= ", newData);
    setRows(newData);
  }, [data]);

  const handleChange = (id, key, value) => {
    //console.log("change", id, key, value);
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, [key]: value } : row
    );
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const handleEdit = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, editable: true, prevState: { ...row } } : row
    );
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const handleSave = (id) => {
    const updatedRows = rows.map((row) => {
      if (row._id === id) {
        let changedRow = { ...row, ...defaultValues };
        delete changedRow["editable"];
        changedTableRows.push(changedRow);
      }
      return row._id === id ? { ...row, editable: false } : row;
    });
    // console.log("saved");
    setRows(updatedRows);
  };

  const handleCancel = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, editable: false, ...row.prevState } : row
    );
    setRows(updatedRows);
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row._id !== id);
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach((column) => (newRow[column] = ""));
    const newId = uuidv4();
    setRows([...rows, { ...newRow, _id: newId, editable: true }]);
  };

  const renderInputField = (column_key, column_value, row) => {
    //console.log("render", row, column_key);
    const {
      type,
      options,
      value = row[column_key],
    } = columnType.find((item) => item.key === column_key) || {};
    // console.log(type, options);
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
                {column}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row._id}>
              {columns.map((column, cellIndex) => (
                <td key={cellIndex}>
                  {row.editable
                    ? renderInputField(column, row[column], row)
                    : row[column]}
                </td>
              ))}
              <td>
                {row.editable ? (
                  <>
                    <button onClick={() => handleSave(row._id)}>
                      <i className="fas fa-save"></i>
                    </button>
                    <button onClick={() => handleCancel(row._id)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row._id)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(row._id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </>
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
