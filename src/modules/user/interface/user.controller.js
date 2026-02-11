const userService = require("../service/user.service");

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: "Name and email required" });

    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, getUser };
