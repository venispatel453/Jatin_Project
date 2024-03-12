const Users = require("../Model/Users");

const addUser = async (req, res) => {
  try {
    const response = await Users.create({ ...req.body });
    console.log(response);
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await Users.find({ designation: "Project Manager" });
    console.log(response);
    res.json({ status: "success", data: response });
  } catch (error) {}
};

module.exports = { addUser, getUsers };
