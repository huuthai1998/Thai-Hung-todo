var express = require("express");
var router = express.Router();
var todo_controller = require("../controllers/todo.controller");
const { isAuthenticate } = require("../utils/jwt");

router.get("/", isAuthenticate, todo_controller.todo_get_all);

router.post("/", isAuthenticate, todo_controller.todo_create_one);

router.patch("/:todoID", isAuthenticate, todo_controller.todo_edit_one);

router.delete("/:todoID", isAuthenticate, todo_controller.todo_delete_one);

module.exports = router;
