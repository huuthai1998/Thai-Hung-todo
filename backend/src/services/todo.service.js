var db = require("../../database/models");
const Todo = db.todo;

exports.findAndCountTodos = async (userID) => {
  const { count, rows } = await Todo.findAndCountAll({
    where: { userID, deletedAt: null },
    order: [["dueDate", "DESC"]],
  });
  return { count, rows };
};

exports.createTodo = async (todoRecord) => {
  return await Todo.create(todoRecord);
};

exports.updateTodo = async (dataToUpdate, id) => {
  await Todo.update(dataToUpdate, { where: { id } });
};

exports.deleteTodo = async (id) => {
  await Todo.destroy({ where: { id, deletedAt: null } });
};
