const express = require("express");

const userRouter = require("./userRouter");
const swaggerRouter = require("./swaggerRouter");

const router = express.Router();

router.use("/swagger", swaggerRouter);

router.use(
  "/user",
  userRouter
);


module.exports = router;
