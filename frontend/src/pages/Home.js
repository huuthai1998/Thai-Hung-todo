import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuthContext } from "../contexts/authStore";
import NavBar from "../components/NavBar/NavBar";

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
      <FontAwesomeIcon icon={faCoffee} />
      Home
    </div>
  );
}
