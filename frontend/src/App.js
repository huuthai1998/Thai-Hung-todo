import { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "./service/axiosInstance";

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

const App = () => {
  const { setUser } = useAuthContext();

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get("/user");
      setUser(data.user);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")?.length > 0) fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
