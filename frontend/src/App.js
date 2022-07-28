/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useAuthContext } from "./contexts/authStore";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import axios from "axios";
import { useEffect } from "react";
import AccountPage from "./pages/AccountPage";
import Cookies from "js-cookie";
import NavBar from "./components/NavBar";

// axios.defaults.baseURL =
// "https://ca-sea-webapp-thai-backend.azurewebsites.net/";
axios.defaults.baseURL = "http://localhost:5001/";

axios.defaults.headers.common.accept = "application/json";

const App = () => {
  const { authContext, setUser, setToken } = useAuthContext();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get("/user");
      setUser(data.user);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setToken("");
    }
  };

  useEffect(() => {
    if (authContext.token.length > 0) {
      axios.defaults.headers.common.authorization = `Bearer ${authContext.token}`;
      fetchUserInfo();
    }
  }, [authContext.token]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/welcome" element={<WelcomePage />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
