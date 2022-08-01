var logger = require("../utils/logger");
var db = require("../../database/models");
const { getUserByEmail: getUserByEmail } = require("../services/user.service");
const {
  findAndCountTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todo.service");

exports.todoGetAll = async (req, res, next) => {
  try {
    logger.info("Executing get all todo all controller");
    const { email } = res.locals;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).send({ message: "User does not exist" });
    logger.info(`Fetching todo for user ${email}`);
    const { count, rows } = await findAndCountTodos(user.id);
    if (count === 0) {
      logger.info("No todos for this user");
      res.status(200).send({ message: "No todos for this user", data: [] });
    } else {
      logger.info(`Successfully get all todos for user ${email}`);
      res.status(200).send({ count, data: rows });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "An error occurred while getting todo" });
  }
};

exports.todoCreateOne = async (req, res, next) => {
  try {
    logger.info("Executing create todo controller");
    const { email } = res.locals;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).send({ message: "User does not exist" });
    const todoRecord = {
      userID: user.id,
      ...req.body,
    };
    const createdTodo = await createTodo(todoRecord);
    logger.info(`Successfully created todo for user ${email}`);
    res
      .status(201)
      .send({ data: createdTodo, message: "Created successfully" });
  } catch (err) {
    logger.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while creating new todo" });
  }
};

exports.todoEditOne = async (req, res, next) => {
  try {
    const { email } = res.locals;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).send({ message: "User does not exist" });
    const id = req.params.todoID;
    const dataToUpdate = req.body;

    await updateTodo(dataToUpdate, id);
    res.status(200).send({ message: "Updated successfully" });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "An error occurred while updating todo" });
  }
};

exports.todoDeleteOne = async function (req, res, next) {
  try {
    const { email } = res.locals;
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).send({ message: "User does not exist" });
    const id = req.params.todoID;
    await deleteTodo(id);
    res.status(200).send({ message: "Deleted successfully" });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "An error occurred while deleting todo" });
  }
};
