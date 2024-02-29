import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHeader,
  TableBody,
  Heading,
  TableCell,
  TableRow,
  TableHeaderCell,
} from "monday-ui-react-core";
import "monday-ui-react-core/tokens";

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];
const Project_Version_History_Section = () => {
  const [versionHistory, setVersionHistory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/version_history"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <Box className="escalation-matrix-table-container">
        <Heading type="h3">Operational Escalation Matrix</Heading>
        <Table columns={operational_column}>
          <TableHeader>
            {operational_column.map((col, index) => (
              <TableHeaderCell key={index} title={col} />
            ))}
          </TableHeader>
          <TableBody>
            {operational_rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default Project_Version_History_Section;
