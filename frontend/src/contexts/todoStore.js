import React, { useReducer } from "react";
import { ADD_TODOS, DELETE_TODOS, EDIT_TODOS, SET_TODOS } from "../constant";

const todoReducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case ADD_TODOS:
      return {
        ...state,
        todos: [...action.payload.todo, state.todos],
      };
    case DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case EDIT_TODOS:
      const { todo: updatedTodo } = action.payload.todo;
      let temp = [state.todos];
      const findIdx = temp.findIndex((todo) => (todo.id = updatedTodo.id));
      temp[findIdx] = updatedTodo;
      return {
        ...state,
        todos: temp,
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  isLoading: false,
};
const TodoContext = React.createContext({
  todoContext: initialState,
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
});

export const TodoProvider = (props) => {
  const [todoContext, dispatch] = useReducer(todoReducer, initialState);

  const setTodos = (todos) => {
    dispatch({
      type: SET_TODOS,
      payload: { todos },
    });
  };
  const addTodo = (todo) => {
    dispatch({
      type: ADD_TODOS,
      payload: { todo },
    });
  };
  const deleteTodo = (id) => {
    dispatch({
      type: DELETE_TODOS,
      payload: { id },
    });
  };
  const editTodo = (todo) => {
    dispatch({
      type: EDIT_TODOS,
      payload: { todo },
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoContext,
        setTodos,
        addTodo,
        deleteTodo,
        editTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => React.useContext(TodoContext);
