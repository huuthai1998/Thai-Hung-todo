var logger = require("../utils/logger");
var db = require("../models");
const Todo = db.todo;
const User = db.user;


exports.todo_get_all = async (req, res, next) => {
  const { email } = res.locals;
  const user = await User.findByPk(email);
  if (!user) {
    res.status(401).send({ message: "User does not exist" });
  } else {
    const { count, rows } = await Todo.findAndCountAll({
      where: { userID: user.id, deletedAt: null },
      order: [["dueDate", "DESC"]],
    });
    if (count === 0) {
      res.status(200).send({ message: "No todos for this user" });
    } else {
      res.status(200).send({ count, data: rows });
    }
  }
};

exports.todo_create_one = async (req, res, next) => {
  const { email } = res.locals;
  const user = await User.findByPk(email);
  if (!user) {
    res.status(401).send({ message: "User does not exist" });
  } else {
    const todoRecord = {
      userID: user.id,
      ...req.body
    };
    try {
      const createdTodo = await Todo.create(todoRecord);
      res.status(201).send({ data: createdTodo, message: "Created successfully" });
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: "An error occurred while creating new todo" });
    }
  }
};

exports.todo_edit_one = async (req, res, next) => {
  const { email } = res.locals;
  const user = await User.findByPk(email);
  if (!user) {
    res.status(401).send({ message: "User does not exist" });
  } else {
    const id = req.params.todoID;
    const dataToUpdate = req.body;
    try {
      await Todo.update(dataToUpdate, { where: { id } });
      res.status(200).send({ message: "Updated successfully" });
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: "An error occurred while updating todo" });
    }
  }
};

exports.todo_delete_one = async function (req, res, next) {
  const { email } = res.locals;
  const user = await User.findByPk(email);
  if (!user) {
    res.status(401).send({ message: "User does not exist" });
  } else {
    const id = req.params.todoID;
    try {
      await Todo.destroy({ where: { id, deletedAt: null } });
      res.status(200).send({ message: "Deleted successfully" });
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: "An error occurred while deleting todo" });
    }
  }
};
