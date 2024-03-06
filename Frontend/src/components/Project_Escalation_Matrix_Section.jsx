import React, { useState, useEffect } from "react";
import { Box, Flex } from "monday-ui-react-core";
import CrudTable from "./Table.jsx";
import "../styling/project_escalation_matrix_section.css";
import axios from "axios";
import {toast} from 'react-toastify'

const Project_Escalation_Matrix_Section = () => {
  const [escalationMatrix, setEscalationMatrix] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/escalation_matrix",
        [...changedTableRows]
      );
      toast.success("Data Saved Successfully");
      setShowSaveButton(false);
      setChangedTableRows([]);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/escalation_matrix"
      );

      const { data } = await response.json();
      setEscalationMatrix(data);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueTypes = () => {
    const types = new Set();
    escalationMatrix.forEach((element) => {
      types.add(element.escalation_type);
    });
    return types;
  };

  return (
    <>
      {showSaveButton && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
        </div>
      )}
      <Box className="escalation-matrix-table">
        <Flex direction="Column" align="Start" gap={20}>
          {escalationMatrix.length > 0 && (
            <>
              {Array.from(uniqueTypes()).map((type) => {
                const filteredData = escalationMatrix.filter(
                  (item) => item.escalation_type === type
                );
                return (
                  <div key={type} className="table-container">
                    <h2 className="table-heading">{type} Escalation Matrix</h2>
                    <CrudTable
                      sectionTab={"escalation"}
                      changedTableRows={changedTableRows}
                      data={filteredData}
                      invalidColumns={[
                        "_id",
                        "__v",
                        "escalation_type",
                        "project_id",
                      ]}
                      defaultValues={{ escalation_type: type }}
                      columnType={[]}
                      setChangedTableRows={setChangedTableRows}
                      setShowSaveButton={setShowSaveButton}
                    />
                  </div>
                );
              })}
            </>
          )}
          <div className="financial-matrix-table"></div>
        </Flex>
      </Box>
    </>
  );
};

export default Project_Escalation_Matrix_Section;
