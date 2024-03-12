// Importing required models and utility functions
const project = require("../Model/Project"); // Importing Project model
const audit_history = require("../Model/Audit_History"); // Importing Audit History model
const version_history = require("../Model/Version_History"); // Importing Version History model
const sprint_details = require("../Model/Sprint_Details"); // Importing Sprint Details model
const stakeholders = require("../Model/Stakeholders"); // Importing Stakeholders model
const phases = require("../Model/Phases"); // Importing Phases model
const escalation_matrix = require("../Model/Escalation_Matrix"); // Importing Escalation Matrix model
const risk_profiling = require("../Model/Risk_Profiling"); // Importing Risk Profiling model
const { reorderArrayOfObject } = require("../Utilities/utility.js"); // Importing utility function for reordering arrays of objects

const getUserProjects = async (req, res) => {
  try {
    const { id: user_id, role } = req.query;
    console.log(req.query);
    let response = [];
    if (role === "Admin" || role === "Auditor") {
      response = await project.find({});
    } else {
      console.log(typeof user_id);
      response = await project.find({
        $or: [
          { "associated_members.manager._id": user_id },
          { "associated_members.clients._id": user_id }
        ]
      })
    }
    console.log(response);
    res.json({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

// $or: [
//   { "associated_members.manager._id": user_id },
//   {
//     "associated_members.clients": {
//       $elemMatch: { _id: user_id },
//     },
//   },
// ],

const addProject = async (req, res) => {
  try {
    //const { _id, name, associated_members } = req.body;
    const response = await project.create({ ...req.body });
    console.log(response);
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "success" });
  }
};

// Function to fetch project details
const getProjectDetails = async (req, res) => {
  try {
    let response = await project.find(); // Finding all project details from the database
    res.json({ status: "success", data: response }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch version history
const getVersionHistory = async (req, res) => {
  try {
    // Default structure for version history in case no data is found
    const default_version_history = [
      {
        project_id: "",
        version: "",
        type: "",
        change: "",
        change_reason: "",
        created_by: "",
        revision_date: "",
        approval_date: "",
        approved_by: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await version_history.find(); // Finding version history data from the database

    // Checking if any data is found
    if (data.length === 0) {
      data = default_version_history; // Setting default version history structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_version_history); // Reordering version history data
    }

    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch audit history
const getAuditHistory = async (req, res) => {
  try {
    // Default structure for audit history in case no data is found
    const default_audit_history = [
      {
        project_id: "",
        date_of_audit: "",
        reviewed_by: "",
        status: "",
        reviewed_section: "",
        comment: "",
        action_item: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await audit_history.find(); // Finding audit history data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_audit_history; // Setting default audit history structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_audit_history); // Reordering audit history data
    }

    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch stakeholders data
const getStakeholders = async (req, res) => {
  try {
    // Default structure for stakeholders in case no data is found
    const default_stakeholders = [
      {
        project_id: "",
        title: "",
        name: "",
        contact: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await stakeholders.find(); // Finding stakeholders data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_stakeholders; // Setting default stakeholders structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_stakeholders); // Reordering stakeholders data
    }

    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch escalation matrix data
const getEscalationMatrix = async (req, res) => {
  try {
    // Default structure for escalation matrix in case no data is found
    const default_escalation_matrix = [
      {
        level: "",
        escalation_type: "",
        member: "",
        designation: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await escalation_matrix.find(); // Finding escalation matrix data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_escalation_matrix; // Setting default escalation matrix structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_escalation_matrix); // Reordering escalation matrix data
    }

    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch risk profiling data
const getRiskProfiling = async (req, res) => {
  try {
    // Default structure for risk profiling in case no data is found
    const default_risk_profiling = [
      {
        project_id: "",
        risk_type: "",
        description: "",
        severity: "",
        impact: "",
        remedial_steps: "",
        status: "",
        closure_date: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await risk_profiling.find(); // Finding risk profiling data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_risk_profiling; // Setting default risk profiling structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_risk_profiling); // Reordering risk profiling data
    }
    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch phases data
const getPhases = async (req, res) => {
  try {
    // Default structure for phases in case no data is found
    const defaultPhase = [
      {
        project_id: "",
        title: "",
        start_date: "",
        completion_date: "",
        approval_date: "",
        status: "",
        revised_completion_date: "",
        comments: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await phases.find(); // Finding phases data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = defaultPhase; // Setting default phases structure if no data found
    } else {
      data = reorderArrayOfObject(data, defaultPhase); // Reordering phases data
    }

    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to fetch sprint details
const getSprintDetails = async (req, res) => {
  try {
    // Default structure for sprint details in case no data is found
    const default_sprint_details = [
      {
        project_id: "",
        sprint: "",
        start_date: "",
        end_date: "",
        status: "",
        comments: "",
        _id: "",
        __v: "",
      },
    ];

    let data = await sprint_details.find(); // Finding sprint details data from the database

    // Checking if any data is found
    if (data.length == 0) {
      data = default_sprint_details; // Setting default sprint details structure if no data found
    } else {
      data = reorderArrayOfObject(data, default_sprint_details); // Reordering sprint details data
    }

    res.json({ status: "success", data: data }); // Sending success response with fetched data
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any occurs during fetching
  }
};

// Function to update project details
const alterProjectDetails = async (req, res) => {
  try {
    const { projectDetails } = req.body; // Extracting project details from request body
    let response = await project.updateOne(
      // Updating project details in the database
      { _id: projectDetails._id }, // Finding the project by its ID
      { $set: projectDetails } // Setting the new project details
    );

    res.json({ status: "success", msg: "Details Updated Successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: "Some Error Occurred" }); // Sending error response if any error occurs during updating
  }
};

// Function to handle alterations in version history records
const alterVersionHistory = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await version_history.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await version_history.bulkWrite(
      deleteRecordOperations
    );

    res.json({ status: "success", msg: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in audit history records
const alterAuditHistory = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await audit_history.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await audit_history.bulkWrite(
      deleteRecordOperations
    );

    res.json({ status: "success", msg: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in stakeholders records
const alterStakeholders = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await stakeholders.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await stakeholders.bulkWrite(
      deleteRecordOperations
    );

    res.json({ status: "success", msg: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in escalation matrix records
const alterEscalationMatrix = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await escalation_matrix.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await escalation_matrix.bulkWrite(
      deleteRecordOperations
    );

    res.json({ status: "success", msg: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in risk profiling records
const alterRiskProfiling = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await risk_profiling.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await risk_profiling.bulkWrite(
      deleteRecordOperations
    );

    res.json({ status: "success", msg: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any error occurs
  }
};

// Function to handle alterations in phases records
const alterPhases = async (req, res) => {
  try {
    // Filter records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generate update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => {
      return {
        updateOne: {
          filter: { _id: obj._id }, // Filtering by ID
          update: { $set: obj }, // Setting new values
          upsert: true, // Creating a new document if it doesn't exist
        },
      };
    });

    // Generate delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Perform bulk write operation to update and delete records
    const updateRecordResult = await phases.bulkWrite(updateRecordOperations);
    const deleteRecordResult = await phases.bulkWrite(deleteRecordOperations);

    // Send success response
    res.json({ status: "success", msg: "Data updated successfully" });
  } catch (error) {
    console.log(error); // Log error for debugging
    // Send error response if any error occurs
    res.json({ status: "error", msg: error });
  }
};

// Function to handle alterations in sprint details records
const alterSprintDetails = async (req, res) => {
  try {
    // Filtering records to identify added/updated and deleted records separately
    const updatedRecords = req.body.filter((record) => {
      return record.action === "added/updated";
    });
    const deletedRecords = req.body.filter((record) => {
      return record.action === "delete";
    });

    // Generating update operations for updated records
    const updateRecordOperations = updatedRecords.map((obj) => ({
      updateOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting new values
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Generating delete operations for deleted records
    const deleteRecordOperations = deletedRecords.map((obj) => ({
      deleteOne: {
        filter: { _id: obj._id }, // Filtering by ID
        update: { $set: obj }, // Setting deleted document
        upsert: true, // Creating a new document if it doesn't exist
      },
    }));

    // Performing bulk write operation to update and delete records
    const updateRecordResult = await sprint_details.bulkWrite(
      updateRecordOperations
    );
    const deleteRecordResult = await sprint_details.bulkWrite(
      deleteRecordOperations
    );

    res.json({ status: "success", msg: "Data updated successfully" }); // Sending success response
  } catch (error) {
    res.json({ status: "error", msg: error }); // Sending error response if any error occurs
  }
};

// Exporting the functions to be used in other parts of the application

module.exports = {
  // Functions to retrieve data
  getProjectDetails, // Retrieves project details
  getVersionHistory, // Retrieves version history
  getAuditHistory, // Retrieves audit history
  getSprintDetails, // Retrieves sprint details
  getPhases, // Retrieves phases
  getRiskProfiling, // Retrieves risk profiling data
  getEscalationMatrix, // Retrieves escalation matrix data
  getStakeholders, // Retrieves stakeholders data

  // Functions to alter data
  alterProjectDetails, // Alters project details
  alterVersionHistory, // Alters version history
  alterAuditHistory, // Alters audit history
  alterSprintDetails, // Alters sprint details
  alterPhases, // Alters phases
  alterRiskProfiling, // Alters risk profiling data
  alterEscalationMatrix, // Alters escalation matrix data
  alterStakeholders, // Alters stakeholders data
  getUserProjects,
  addProject,
};
