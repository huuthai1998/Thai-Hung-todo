import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useTodoContext } from "./contexts/store";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:5001/";
axios.defaults.headers.common.accept = "application/json";

const App = () => {
  const { token, setToken } = useTodoContext();
  useEffect(() => {
    console.log(token);
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  }, [token]);

  const fakeSignIn = async () => {
    const { data } = await axios.post("/user/login", {
      email: "dev2f@gmail.com",
      password: "thisisnothash",
    });
    setToken(data.token);
  };
  useEffect(() => {
    fakeSignIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
