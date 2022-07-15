var express = require("express");
const { signUp } = require("../controllers/user.controller");
var router = express.Router();

/* GET user's detail. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
  const { username, password, email } = req.body;

  res.render("index", { title: "Express" });
});

router.post("/signup", async function (req, res, next) {
  const { username, password } = req.body;
  await signUp(username, password);
  res.send("SUCCESS");
});

/* Change user's information. */
router.put("/", function (req, res, next) {
  const { username, avatar } = req.body;

  res.render("index", { title: "Express" });
});

module.exports = router;
