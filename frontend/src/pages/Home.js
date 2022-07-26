/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import Sidebar from "../components/Sidebar";
import TodoCard from "../components/TodoCard";
import { useTodoContext } from "../contexts/todoStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import AddTodoModal from "../components/AddTodoModal";
import { useAuthContext } from "../contexts/authStore";
import Cookies from "js-cookie";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const navigate = useNavigate();
  const [inprogressTodos, setInprogressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [tabStatus, setTabStatus] = useState("");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [error, setError] = useState("");
  const { authContext } = useAuthContext();
  const { todoContext, setTodos } = useTodoContext();
  const query = useQuery();

  useEffect(() => {
    if (!Cookies.get("token")) navigate("/welcome");
  }, [authContext.token]);

  const fetchTodos = async () => {
    try {
      if (authContext.token) {
        const { data } = await axios.get("/todo");
        console.log("Todos count: ", data.count);
        setTodos(data.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [authContext.token]);

  const getTabStatus = () => {
    try {
      let sidebarStatus = query.get("filter");
      if (sidebarStatus) {
        sidebarStatus = sidebarStatus.toUpperCase();
        return sidebarStatus;
      }
      return "INPROGRESS";
    } catch (err) {
      console.log(err);
      return "INPROGRESS";
    }
  };

  useEffect(() => {
    setTabStatus(getTabStatus());
  });

  useEffect(() => {
    console.log("Trigger todos");
    if (todoContext.todos && todoContext.todos.length > 0) {
      todoContext.todos.sort(function (left, right) {
        return -moment.utc(left.dueDate).diff(moment.utc(right.dueDate));
      });
      setInprogressTodos(
        todoContext.todos.filter((todo) => todo.status === "INPROGRESS")
      );
      setCompletedTodos(
        todoContext.todos.filter((todo) => todo.status === "COMPLETED")
      );
    } else {
      setInprogressTodos([]);
      setCompletedTodos([]);
    }
  }, [todoContext.todos]);

  return (
    <div>
      <div className="flex">
        <Sidebar status={tabStatus} />
        {error ? (
          <div className="w-full py-6 text-center">
            <div className="text-3xl font-medium text-gray-500 mt-16">
              An error occurred when fetching your tasks
            </div>
          </div>
        ) : (
          <>
            {tabStatus === "INPROGRESS" ? (
              <div className="w-full ml-16 py-6">
                {inprogressTodos && inprogressTodos.length > 0 ? (
                  <>
                    <div className="mb-6 flex self-center">
                      <div className="text-4xl font-semibold">
                        You've got
                        <span className="text-xred">
                          {" "}
                          {inprogressTodos.length} tasks{" "}
                        </span>
                        to be done
                      </div>
                      <button
                        className="font-semibold text-lg rounded-md py-2 px-7 ml-7 bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-700"
                        onClick={() => {
                          setShowAddTodo(!showAddTodo);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-3" />
                        Add new
                      </button>
                      {showAddTodo && (
                        <AddTodoModal setShowAddTodo={setShowAddTodo} />
                      )}
                    </div>
                    {inprogressTodos.map((todo) => {
                      return (
                        <div className="mb-5" key={todo.id}>
                          <TodoCard isCompleted={false} data={todo} />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex self-center">
                    <div className="text-4xl font-semibold">
                      You have <span className="text-xred">0</span> tasks in
                      progress
                    </div>
                    <button
                      className="font-semibold text-lg rounded-md py-2 px-7 ml-7 bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-700"
                      onClick={() => setShowAddTodo(!showAddTodo)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-3" />
                      Add new
                    </button>
                    {showAddTodo && (
                      <AddTodoModal setShowAddTodo={setShowAddTodo} />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full ml-16 py-6">
                {completedTodos && completedTodos.length > 0 ? (
                  <>
                    <div className="mb-6 flex self-center">
                      <div className="text-4xl font-semibold">
                        You've completed
                        <span className="text-completed-400">
                          {" "}
                          {completedTodos.length} tasks{" "}
                        </span>
                        so far
                      </div>
                    </div>
                    {completedTodos.map((todo) => {
                      return (
                        <div className="mb-5" key={todo.id}>
                          <TodoCard isCompleted={true} data={todo} />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex self-center">
                    <div className="text-4xl font-semibold">
                      You have <span className="text-completed-400">0</span>{" "}
                      completed tasks
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
