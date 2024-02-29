import React from "react";
import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableHeaderCell,
  TableCell,
  TableRow,
  Flex,
} from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import "monday-ui-react-core/tokens";
import "../styling/project_escalation_matrix_section.css";

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];

const Project_Escalation_Matrix_Section = () => {
  return (
    <Box className="escalation-matrix-table">
      <Flex direction="Column" align="Start" gap={20}>
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
      </Flex>
    </Box>
  );
};

export default Project_Escalation_Matrix_Section;
