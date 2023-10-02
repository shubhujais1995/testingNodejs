const express = require("express");
const {
  userLogin,
  userRegistration,
  currentUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/registration").post(userRegistration);

router.route("/login").post(userLogin);

router.route("/current").get(currentUser);

module.exports = router;
