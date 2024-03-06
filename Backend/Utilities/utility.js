// Function to reorder the keys of objects in an array based on the keys of a reference object
const reorderArrayOfObject = (arrayOfObjects, referenceObject) => {
  // Map over each object in the array
  let data = arrayOfObjects.map((obj) => {
    // Call reorderObjectKeys function to reorder keys of the current object
    return reorderObjectKeys(obj, referenceObject[0]);
  });
  // Return the reordered array of objects
  return data;
};

// Function to reorder the keys of an object based on the keys of a reference object
function reorderObjectKeys(obj, refObj) {
  // Initialize an empty object to store the reordered keys
  let orderedObj = {};
  // Iterate over each key of the reference object
  Object.keys(refObj).forEach((key) => {
    // Assign the value of the corresponding key in the current object to the reordered object
    orderedObj[key] = obj[key];
  });
  // Return the reordered object
  return orderedObj;
}

// Function to format column names by capitalizing the first letter of each word and replacing underscores with spaces
const formatColumnName = (column_name) => {
  // Split the column name by underscores
  let name_arr = column_name.split("_");
  // Capitalize the first letter of each word
  name_arr = name_arr.map((name) => {
    return `${name[0].toUpperCase() + name.substring(1)}`;
  });
  // Join the words with spaces and return the formatted column name
  return name_arr.join(" ");
};

// Exporting the functions as a module
module.exports = { reorderArrayOfObject, formatColumnName };
