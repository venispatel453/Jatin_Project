const reorderArrayOfObject = (arrayOfObjects, referenceObject) => {
  let data = arrayOfObjects.map((obj) => {
    return reorderObjectKeys(obj, referenceObject[0]);
  });
  return data;
};

function reorderObjectKeys(obj, refObj) {
  let orderedObj = {};
  Object.keys(refObj).forEach((key) => {
    orderedObj[key] = obj[key];
  });
  return orderedObj;
}

const formatColumnName = (column_name) => {
  let name_arr = column_name.split("_");
  name_arr = name_arr.map((name) => {
    return `${name[0].toUpperCase() + name.substring(1)}`;
  });
  return name_arr.join(" ");
};

module.exports = { reorderArrayOfObject, formatColumnName };
