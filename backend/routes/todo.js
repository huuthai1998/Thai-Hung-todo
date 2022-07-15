var express = require("express");
var router = express.Router();
var todo_controller = require("../controllers/todo.controller");


router.get("/", todo_controller.todo_get_all);

router.post("/", todo_controller.todo_create_one);

router.patch("/:todoID", todo_controller.todo_edit_one);

router.delete("/:todoID", todo_controller.todo_delete_one);

module.exports = router;
