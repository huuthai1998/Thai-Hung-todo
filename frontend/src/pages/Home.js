import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import NavBar from "../components/NavBar/NavBar";
import Sidebar from "../components/Sidebar/Sidebar";
import TodoCard from "../components/TodoCard/TodoCard";
import { useTodoContext } from "../contexts/todoStore";
import { useAuthContext } from "../contexts/authStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import AddTodoModal from "../components/AddTodoModal";

const fakeTodos = [
  {
    id: "c3d0f392-5df7-44ff-9897-99313e3734a3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    dueTime: moment("2022/07/18 13:30"),
    category: "PERSONAL",
    priority: "HIGH",
    status: "INPROGRESS",
  },
  {
    id: "266738ab-9550-41d6-8f29-8d46e5983c3d",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    dueTime: moment("2022/07/18 13:30"),
    category: "WORK",
    priority: "HIGH",
    status: "INPROGRESS",
  },
  {
    id: "a96b777f-d99f-473c-83b7-9f96b5233b5a",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    dueTime: moment("2022/07/20 13:30"),
    category: "PERSONAL",
    priority: "URGENT",
    status: "INPROGRESS",
  },
  {
    id: "94c4afd9-318a-432e-8833-09ea65993b99",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    dueTime: moment("2022/07/17 13:30"),
    category: "PERSONAL",
    priority: "MEDIUM",
    status: "INPROGRESS",
  },
  {
    id: "3569a003-110a-4fb0-92fa-da5d163aa5d2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    dueTime: moment("2022/07/19 13:30"),
    category: "WORK",
    priority: "HIGH",
    status: "COMPLETED",
  },
  {
    id: "734c8af2-a64d-4b1f-ac25-953555ee10e1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    dueTime: moment("2022/07/18 13:30"),
    category: "PERSONAL",
    priority: "HIGH",
    status: "COMPLETED",
  },
];

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const { authContext } = useAuthContext();
  const [inprogressTodos, setInprogressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [tabStatus, setTabStatus] = useState("");
  const [showAddTodo, setShowAddTodo] = useState(false);
  const { todoContext, setTodos, addTodo, deleteTodo, editTodo } =
    useTodoContext();
  const query = useQuery();

  // const fetchTodos = async () => {
  //   try {
  //     const { data } = await axios.get("/todo");
  //     console.log(data);
  //     setTodos(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // if (authContext.token) fetchTodos();
    setTodos(fakeTodos);
  }, []);

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
    if (todoContext.todos && todoContext.todos.length > 0) {
      setInprogressTodos(
        todoContext.todos.filter((todo) => todo.status === "INPROGRESS")
      );
      setCompletedTodos(
        todoContext.todos.filter((todo) => todo.status === "COMPLETED")
      );
    }
  }, [todoContext.todos]);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <Sidebar status={tabStatus} />
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
                    onClick={() => setShowAddTodo(!showAddTodo)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-3" />
                    Add new
                  </button>
                  {showAddTodo && <AddTodoModal setShowAddTodo={setShowAddTodo}/> }
                </div>
                {inprogressTodos.map((todo) => {
                  return (
                    <div className="mb-5" key={todo.id}>
                      <TodoCard isCompleted={false} />
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
                <button className="font-semibold text-lg rounded-md py-2 px-7 ml-7 bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-700">
                  <FontAwesomeIcon icon={faPlus} className="mr-3" />
                  Add new
                </button>
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
                      <TodoCard isCompleted={true} />
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex self-center">
                <div className="text-4xl font-semibold">
                  You have <span className="text-xred">0</span> completed
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
