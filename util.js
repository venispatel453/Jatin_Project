// Sample reference object with desired key order
const referenceObject = { name: null, age: null, city: null };

// Sample array of objects
let arrayOfObjects = [
  { city: "New York", name: "John", age: 30 },
  { age: 25, name: "Alice", city: "Los Angeles" },
  { city: "Chicago", name: "Bob", age: 35 },
];

// Function to reorder keys of an object based on the order specified by the reference object
function reorderObjectKeys(obj, refObj) {
  return Object.keys(refObj).reduce((orderedObj, key) => {
    if (obj.hasOwnProperty(key)) {
      orderedObj[key] = obj[key];
    }
    return orderedObj;
  }, {});
}

// Reordering keys of each object in the array
arrayOfObjects = arrayOfObjects.map((obj) =>
  reorderObjectKeys(obj, referenceObject)
);

// Displaying the reordered array of objects
console.log(arrayOfObjects);

//for generating pdf from json data
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

const doc = new jsPDF();
doc.autoTable({
  head: [["ID", "Name", "Email", "Country", "IP-address"]],
  body: [
    ["1", "HelloäöüßÄÖÜ", "dmoore0@furl.net", "China", "211.56.242.221"],
    ["2", "Janice", "jhenry1@theatlantic.com", "Ukraine", "38.36.7.199"],
    ["3", "Ruth", "rwells2@example.com", "Trinidad", "19.162.133.184"],
    ["4", "Jason", "jray3@psu.edu", "Brazil", "10.68.11.42"],
    ["5", "Jane", "jstephens4@go.com", "United States", "47.32.129.71"],
    ["6", "Adam", "anichols5@com.com", "Canada", "18.186.38.37"],
  ],
});

doc.autoTable({
  head: [["ID", "Name", "Email", "Country", "IP-address"]],
  body: [
    ["1", "HelloäöüßÄÖÜ", "dmoore0@furl.net", "China", "211.56.242.221"],
    ["2", "Janice", "jhenry1@theatlantic.com", "Ukraine", "38.36.7.199"],
    ["3", "Ruth", "rwells2@example.com", "Trinidad", "19.162.133.184"],
    ["4", "Jason", "jray3@psu.edu", "Brazil", "10.68.11.42"],
    ["5", "Jane", "jstephens4@go.com", "United States", "47.32.129.71"],
    ["6", "Adam", "anichols5@com.com", "Canada", "18.186.38.37"],
  ],
});

doc.save("table.pdf");
console.log("./table.pdf generated");
