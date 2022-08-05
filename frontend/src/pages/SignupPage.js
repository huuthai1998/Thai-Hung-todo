import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import validator from "validator";
import axiosInstance from "../service/axiosInstance";

import { notification } from "antd";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import InputBox from "../components/InputBox";
import { useAuthContext } from "../contexts/authStore";

export default function SignupPage() {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get("/user");
      setUser(data.user);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setInfo({ ...info, [name]: value });
  };

  useEffect(() => {
    if (Cookies.get("token")?.length > 0) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!info.email) throw new Error("Email can't be empty");
      if (!validator.isEmail(info.email)) throw new Error("Invalid email");
      if (!info.password) throw new Error("Password can't be empty");
      if (info.confirmPassword !== info.password)
        throw new Error("Passwords don't match");
      const { data } = await axiosInstance.post("/user/signup", {
        email: info.email,
        password: info.password,
        username: info.username,
      });
      Cookies.set("token", data.token);
      await fetchUserInfo();
      navigate("/");
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || err.message,
        placement: "top",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-32">
        <form action="submit" className="loginBox w-[450px]">
          <h1 className="font-sans font-bold text-center mb-10 text-3xl">
            CREATE AN ACCOUNT
          </h1>
          <InputBox
            name="username"
            placeholder={"Username"}
            icon={faUser}
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            name="email"
            placeholder={"Email"}
            icon={faEnvelope}
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            type="password"
            name="password"
            placeholder={"Password"}
            icon={faLock}
            onChangeHandler={onChangeHandler}
          />
          <InputBox
            type="password"
            name="confirmPassword"
            placeholder={"Confirm password"}
            icon={faLock}
            onChangeHandler={onChangeHandler}
          />
          <button
            onClick={submitHandler}
            className="w-full py-3 px-7 mt-2 rounded-md text-xl font-semibold text-lg bg-xred hover:bg-red-500 text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
