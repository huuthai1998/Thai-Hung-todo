var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/user.controller");
const { isAuthenticate } = require("../utils/jwt");

/* GET user's detail. */
router.get("/", isAuthenticate, user_controller.get_user);

router.post("/login", user_controller.sign_in);

router.post("/signUp", user_controller.sign_up);

/* Change user's information. */
router.put("/", isAuthenticate, user_controller.edit_user);

module.exports = router;
