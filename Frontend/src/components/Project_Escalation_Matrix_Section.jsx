import React, { useState, useEffect } from "react";
import { Box, Flex } from "monday-ui-react-core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "monday-ui-react-core/tokens";
import "../styling/project_escalation_matrix_section.css";
import { DataGrid } from "@mui/x-data-grid";
import Editable_Table from "./Editable_Table";

let dummy_data = {
  Heading_1: [
    { level: "Level-1", name: "Ajay", designation: "project manager" },
    { level: "Level-1", name: "Ajay", designation: "project manager" },
    { level: "Level-1", name: "Ajay", designation: "project manager" },
  ],
  Heading_2: [
    { name: "ajey", designation: "pm" },
    { name: "ajey", designation: "pm" },
    { name: "ajey", designation: "pm" },
  ],
  Heading_3: [
    { name: "ajey", designation: "pm" },
    { name: "ajey", designation: "pm" },
    { name: "ajey", designation: "pm" },
  ],
};

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];

const Project_Escalation_Matrix_Section = () => {
  const [escalationMatrix, setEscalationMatrix] = useState(dummy_data);
  const [changesMade, setChangesMade] = useState(false);

  const handleSubmit = () => {};

  const handleInputChange = () => {};

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/escalation_matrix"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateTable = () => {
    const tableArray = [];
    for (const key in escalationMatrix) {
      let headers = Object.keys(escalationMatrix[key][0]);
      let table = (
        <div
          key={tableArray.length}
          className="escalation-matrix-table-container"
        >
          <h3>{key}</h3>
          <TableContainer sx={{ maxHeight: 250 }}>
            <Table
              columns={escalationMatrix[key].heading}
              stickyHeader
              size="small"
            >
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index}>{header.toUpperCase()}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {escalationMatrix[key].map((row) => {
                  return (
                    <TableRow>
                      {headers.map((item, index) => {
                        return <TableCell key={index}>{row[item]}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
      tableArray.push(table);
    }

    return tableArray;
  };
  let columns = [];
  const generateColumn = () => {
    let headings = Object.keys(dummy_data["Heading_1"][0]);
    columns = headings.map((head) => {
      return { field: head, width: 200 };
    });
    console.log(columns);
  };
  generateColumn();
  return (
    <>
      {changesMade && (
        <div className="save-button-container">
          <button onClick={handleSubmit}>save</button>
        </div>
      )}
      <Box className="escalation-matrix-table">
        <Flex direction="Column" align="Start" gap={20}>
          <div className="escalation-matrix-table-container">
            <Editable_Table />
          </div>
        </Flex>
      </Box>
    </>
  );
};

export default Project_Escalation_Matrix_Section;
