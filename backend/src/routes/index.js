var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ message: "API IS WORKING" });
});

module.exports = router;
