const User = require("../model/user.model");

async function createUser(data) {
  return await User.create(data);
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
}

module.exports = { createUser, getUserById };
