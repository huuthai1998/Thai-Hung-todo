const bcrypt = require("bcrypt");
const saltRounds = 10;

const logIn = async (username, password) => {};
const signUp = async (username, password) => {
  const hashPassword = await bcrypt.hash(password, saltRounds);
  // Store user to db with hashPassword here
  console.log(username, hashPassword);
};

module.exports = { logIn, signUp };
