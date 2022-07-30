var express = require("express");
var router = express.Router();
var todoController = require("../controllers/todo.controller");
const { isAuthenticate } = require("../utils/jwt");

router.get("/", isAuthenticate, todoController.todoGetAll);

router.post("/", isAuthenticate, todoController.todoCreateOne);

router.patch("/:todoID", isAuthenticate, todoController.todoEditOne);

router.delete("/:todoID", isAuthenticate, todoController.todoDeleteOne);

module.exports = router;
