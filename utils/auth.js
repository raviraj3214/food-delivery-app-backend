const bcrypt = require('bcrypt');

// Function to hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
  return await bcrypt.hash(password, salt);
};

// Function to compare the provided password with the hashed password
const comparePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
