import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authStore";
import NavBar from "../components/NavBar/NavBar";
import Sidebar from "../components/Sidebar/Sidebar";
import TodoCard from "../components/TodoCard/TodoCard";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const { authContext } = useAuthContext();

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get("/todo");
      console.log(data);
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authContext.token) fetchTodos();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <Sidebar/>
        <div className="w-full ml-16 py-6">
          <h1>Home</h1>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
          <TodoCard isCompeleted={false}/>
          <br/>
        </div>
      </div>
    </div>
  );
}
