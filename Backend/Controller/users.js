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

module.exports = { addUser };
