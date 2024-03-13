import { v4 as uuidv4 } from "uuid"; // Importing UUID library for generating unique IDs
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MGMT_TOKEN = process.env.REACT_APP_MGMT_TOKEN;
const available_roles = {
  Admin: "rol_z4VmtqeS9aPAMfmE",
  Auditor: "rol_LAk32QMvUbyTIiBO",
  Client: "rol_8lxEoAVYa4EGgizG",
  Manager: "rol_qLO42FIvSNsdZEO4",
};

function generatePassword() {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const specialChars = "!@#$&*";

  let password = "";

  // Add at least one lowercase character
  password += lowercaseChars.charAt(
    Math.floor(Math.random() * lowercaseChars.length)
  );

  // Add at least one uppercase character
  password += uppercaseChars.charAt(
    Math.floor(Math.random() * uppercaseChars.length)
  );

  // Add at least one number
  password += numericChars.charAt(
    Math.floor(Math.random() * numericChars.length)
  );

  // Add at least one special character
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  // Fill the rest of the password with random characters from all sets
  for (let i = 0; i < 6; i++) {
    const charSet =
      lowercaseChars + uppercaseChars + numericChars + specialChars;
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  // Shuffle the password characters to make it more random
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

const sendInviteMail = async (user_details) => {
  try {
    const data = await axios.post(`${BASE_URL}/sendEmail/invite`, {
      ...user_details,
    });
    console.log(data);
  } catch (error) {
    console.log("in send invite", error);
  }
};

export const fetchUsersByRole = async (role) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/roles/${available_roles[role]}/users`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRoleOfUser = async (user_id) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users/${user_id}/roles`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const assignRoleToUser = async (user_id, user_role) => {
  try {
    const available_roles = {
      Admin: "rol_z4VmtqeS9aPAMfmE",
      Auditor: "rol_LAk32QMvUbyTIiBO",
      Client: "rol_8lxEoAVYa4EGgizG",
      Manager: "rol_qLO42FIvSNsdZEO4",
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var raw = JSON.stringify({
      roles: [`${available_roles[user_role]}`],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users/${user_id}/roles`,
      requestOptions
    );
    //const assigned_role = await response.json();

    console.log(response);
  } catch (error) {
    console.log("in assign Role to user", error);
    alert(error.message);
  }
};

export const createNewUser = async (user, role) => {
  try {
    const user_password = generatePassword();
    console.log(user_password);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${MGMT_TOKEN}`);

    var raw = JSON.stringify({
      email: user.email,
      user_metadata: {},
      blocked: false,
      email_verified: false,
      app_metadata: {},
      given_name: "string",
      family_name: "string",
      name: user.name,
      nickname: "string",
      user_id: `${uuidv4()}`,
      connection: "Username-Password-Authentication",
      password: user_password,
      verify_email: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/users",
      requestOptions
    );
    if (response.status == 409) {
      alert("email already present");
      return;
    }
    const created_user = await response.json();
    //console.log("user created", created_user, created_user.user_id);
    assignRoleToUser(created_user.user_id, role);
    sendInviteMail({ email: user.email, password: user_password });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
