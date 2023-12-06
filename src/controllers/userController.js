const userServices = require("../services/userServices");

const createdUserApi = async (req, res, next) => {
  try {
    const user = await userServices.getCreatedUserCsv(req, res, next);

    return user;
  } catch (error) {
    res.status(406).json({ error });
  }
};

const createdUser = async (req, res, next) => {
  try {
    const user = await userServices.createUser(req, res, next);

    return user;
  } catch (error) {
    res.status(406).json({ error });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userServices.getAllUser(req, res, next);

    return users;
  } catch (error) {
    res.status(406).json({ error });
  }
};

const updateUserData = async (req, res, next) => {
  try {
    const user = await userServices.updateUser(req, res, next);

    return user;
  } catch (error) {
    res.status(406).json({ error });
  }
};

const deleteUserData = async (req, res, next) => {
  try {
    const user = await userServices.deleteUser(req, res, next);

    return user;
  } catch (error) {
    res.status(406).json({ error });
  }
};

const getUserId = async (req, res, next) => {
  try {
    const user = await userServices.getUserById(req, res, next);

    return user;
  } catch (error) {
    res.status(406).json({ error });
  }
};

const getUserName = async (req, res, next) => {
  try {
    const user = await userServices.getUserByName(req, res, next);
    return user;
  } catch (error) {
    res.status(406).json({ error });
  }
};

module.exports = {
  createdUser,
  createdUserApi,
  getAllUsers,
  updateUserData,
  deleteUserData,
  getUserId,
  getUserName
};
