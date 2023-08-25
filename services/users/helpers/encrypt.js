const bcrypt = require("bcryptjs");

const encrypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

// console.log(encrypt("staff"));

module.exports = { encrypt, comparePassword };
