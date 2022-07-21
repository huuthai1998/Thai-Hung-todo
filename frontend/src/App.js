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
import { SET_TOKEN } from "./constant";

axios.defaults.baseURL = "http://localhost:5001/";
axios.defaults.headers.common.accept = "application/json";

const App = () => {
  const { authContext, setUser, setToken } = useAuthContext();

  useEffect(() => {
    axios.defaults.headers.common.authorization = `Bearer ${authContext.token}`;
    if (authContext.token.length > 0) fetchUserInfo();
  }, [authContext.token]);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get("/user");
      setUser(data.user);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
  }, []);

  return (
    <BrowserRouter>
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
