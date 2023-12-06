const express = require("express");

const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post(
  "/create/ext/api",
  userController.createdUserApi
);

userRouter.post(
  "/create",
  userController.createdUser
);

userRouter.get("/list",  userController.getAllUsers);

userRouter.put(
  "/update/:id",
  userController.updateUserData
);

userRouter.delete("/delete/:id", userController.deleteUserData);

userRouter.get("/codigo/:id", userController.getUserId);

userRouter.get("/name/:nome", userController.getUserName);

module.exports = userRouter;
