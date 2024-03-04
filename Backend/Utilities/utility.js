const reorderArrayOfObject = (arrayOfObjects, referenceObject) => {
  let data = arrayOfObjects.map((obj) => {
    //console.log("array obj", obj);
    return reorderObjectKeys(obj, referenceObject[0]);
  });

  //console.log("Ordered array:", data);
  return data;
};

function reorderObjectKeys(obj, refObj) {
  let orderedObj = {};
  //console.log("here", obj);
  Object.keys(refObj).forEach((key) => {
    orderedObj[key] = obj[key];
  });
  // console.log("obj", orderedObj);
  return orderedObj;
}

module.exports = { reorderArrayOfObject };
