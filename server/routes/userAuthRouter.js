const express = require("express");
const {
  signup,
  login,
  logout,
  myDetails,
} = require("../controllers/userAuthController");
const { verifyToken } = require("../middlewares/verifyToken");
const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);

UserAuthRouter.get("/my-details", verifyToken, myDetails);

module.exports = UserAuthRouter;
