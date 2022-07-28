import { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./contexts/authStore";
import { TodoProvider } from "./contexts/todoStore";

// axios.defaults.baseURL =
// "https://ca-sea-webapp-thai-backend.azurewebsites.net/";
axios.defaults.baseURL = "http://localhost:5001/";

axios.defaults.headers.common.accept = "application/json";

const App = () => {
  const { authContext, setUser, setToken } = useAuthContext();

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get("/user");
      setUser(data.user);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios.defaults.headers.common.authorization = `Bearer ${authContext.token}`;
    if (authContext.token.length > 0) fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.token]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/"
          element={
            <TodoProvider>
              <Home />
            </TodoProvider>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
