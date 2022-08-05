import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";
import axiosInstance from "../service/axiosInstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { TAB_STATUS } from "../constant";

import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";
import TodoCard from "../components/TodoCard";
import AddTodoModal from "../components/AddTodoModal";
import { useTodoContext } from "../contexts/todoStore";

const getTabStatus = (search) => {
  const sidebarStatus =
    new URLSearchParams(search).get("filter") ?? TAB_STATUS.IN_PROGRESS;
  return sidebarStatus.toUpperCase();
};

export default function Home() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [inprogressTodos, setInprogressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [tabStatus, setTabStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { todoContext, setTodos } = useTodoContext();

  const fetchTodos = async () => {
    try {
      if (Cookies.get("token")) {
        const { data } = await axiosInstance.get("/todo");
        console.log("Todos count: ", data.count);
        setTodos(data.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    setTabStatus(getTabStatus(search));
  }, [search]);

  useEffect(() => {
    // handle situation when refresh home page, context token is reset,
    if (!Cookies.get("token")) navigate("/welcome");
    else {
      // setTimeout(() => {
      fetchTodos();
      setLoading(false);
      // }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Trigger todos");
    if (todoContext.todos?.length <= 0) {
      setInprogressTodos([]);
      setCompletedTodos([]);
    } else {
      // sort todos by dueDate, latest first
      todoContext.todos.sort(
        (left, right) =>
          -moment.utc(left.dueDate).diff(moment.utc(right.dueDate))
      );
      setInprogressTodos(
        todoContext.todos.filter(
          (todo) => todo.status === TAB_STATUS.IN_PROGRESS
        )
      );
      setCompletedTodos(
        todoContext.todos.filter((todo) => todo.status === TAB_STATUS.COMPLETED)
      );
    }
  }, [todoContext.todos]);

  return (
    <div>
      {loading && <Spinner />}
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
            {tabStatus === TAB_STATUS.IN_PROGRESS ? (
              <div className="w-full ml-11 mr-5 py-6">
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
                        className="hidden md:block font-semibold text-lg rounded-md py-2 px-7 ml-7 bg-indigo-700 text-white hover:bg-indigo-800"
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
                      className="hidden md:block font-semibold text-lg rounded-md py-2 px-7 ml-7 bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-700"
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
              <div className="w-full ml-11 mr-5 py-6">
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
