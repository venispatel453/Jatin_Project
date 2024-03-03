import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styling/crud-table.css";

const CrudTable = ({ data, invalid_columns }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    const extractedColumns = Object.keys(data[0]).filter(
      (key) => !invalid_columns.includes(key)
    );
    setColumns(extractedColumns);

    const newData = data.map((record) => ({
      ...record,
      _id: record._id ? record._id : uuidv4(),
      editable: false,
    }));
    setRows(newData);
  }, [data]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const handleEdit = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, editable: true, prevState: { ...row } } : row
    );
    setRows(updatedRows);
  };

  const handleSave = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, editable: false } : row
    );
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
    const newId = uuidv4(); // Generate a random ID
    setRows([...rows, { ...newRow, _id: newId, editable: true }]);
  };

  return (
    <div className="crud-table-container">
      <table className="crud-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id}>
              {columns.map((column, cellIndex) => (
                <td key={cellIndex}>
                  {row.editable ? (
                    <input
                      type="text"
                      value={row[column]}
                      onChange={(e) => {
                        const updatedValue = e.target.value;
                        const updatedRows = rows.map((r) =>
                          r._id === row._id
                            ? { ...r, [column]: updatedValue }
                            : r
                        );
                        setRows(updatedRows);
                      }}
                    />
                  ) : (
                    row[column]
                  )}
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
