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
      order: [['dueDate', 'DESC']]
    });
    if (count === 0) {
      res.status(204).send({ count: 0, message: "no todos for this user" });
    } else {
      res.status(200).send({ count, data: rows });
    }
  }
};

exports.todo_create_one = async (req, res, next) => {
  const user = await User.findByPk(email);
  const userID = user.id;
  const todoRecord = {
    userID,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "INPROGRESS",
    category: "WORK",
    priority: "HIGH",
    dueDate: new Date(),
  };
  const data = await Todo.create(todoRecord);
  res.send(data);
};

exports.todo_edit_one = function (req, res, next) {
  res.status(200).send({ message: "Todo: " + req.params.todoID });
};

exports.todo_delete_one = async function (req, res, next) {
  const id = req.params.todoID;
  const row = await Todo.destroy({ where: { id } });
  console.log(row);
  if (row) res.send({ message: "success" });
  else res.send({ message: "failed" });
};
