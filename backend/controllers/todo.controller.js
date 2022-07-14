var logger = require("../utils/logger");
var db = require("../models");
const Todo = db.todo;
const User = db.user;

// pretend that token is decoded and we have user email
const email = "demo@gmail.com";

exports.todo_get_all = async (req, res, next) => {
  const user = await User.findByPk(email);
  if (user === null) {
    res.status(401).send({ message: "user must authenticate first" });
  } else {
    const { count, rows } = await Todo.findAndCountAll({
      where: { userID: user.id },
      order: [["dueDate", "DESC"]],
    });
    if (count === 0) {
      res.status(200).send({ message: "no todos for this user" });
    } else {
      res.status(200).send({ count, data: rows });
    }
  }
};

exports.todo_create_one = async (req, res, next) => {
  const user = await User.findByPk(email);
  if (user === null) {
    res.status(401).send({ message: "user must authenticate first" });
  } else {
    const todoRecord = {
      userID: user.id,
      content: req.body.content,
      status: req.body.status,
      category: req.body.category,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    };
    try {
      const createdTodo = await Todo.create(todoRecord);
      res
        .status(201)
        .send({ data: createdTodo, message: "successfully created" });
    } catch (err) {
      logger.error(err);
      res.send(500).send({ message: "error when creating new todo" });
    }
  }
};

exports.todo_edit_one = async (req, res, next) => {
  const id = req.params.todoID;
  const dataToUpdate = { };
  if (req.body.content) dataToUpdate["content"] = req.body.content;
  if (req.body.status) dataToUpdate["status"] = req.body.status;
  if (req.body.category) dataToUpdate["category"] = req.body.category;
  if (req.body.priority) dataToUpdate["priority"] = req.body.priority;
  if (req.body.dueDate) dataToUpdate["dueDate"] = req.body.dueDate;
  logger.debug(dataToUpdate);
  try {
    const editedTodo = await Todo.update(dataToUpdate, { where: { id } });
    res.status(200).send({ message: "successfully edited" });
  } catch (err) {
    logger.error(err);
    res.send(500).send({ message: "error when editing todo" });
  }
};

exports.todo_delete_one = async function (req, res, next) {
  const id = req.params.todoID;

  // === Hard Delete
  // const row = await Todo.destroy({ where: { id } });
  // console.log(row);
  // if (row) res.send({ message: "success" });
  // else res.send({ message: "failed" });

  // === Soft delete

  Todo.update({ deletedAt: new Date() }, { where: { id } })
    .then(res.status(200).send({ message: "successfully deleted" }))
    .catch((err) => {
      logger.error(err);
      res.send(500).send({ message: "error when deleting todo" });
    });
};
